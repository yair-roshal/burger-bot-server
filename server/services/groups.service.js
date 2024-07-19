const mysql = require("mysql2/promise");
const { sqlConfig } = require("../../constants/sqlConfig");

class GroupsService {
  constructor() {
    this.pool = mysql.createPool(sqlConfig);
  }

  async executeQuery(sqlQuery, values) {
    let connection;
    try {
      connection = await this.pool.getConnection();
      const [results] = await connection.execute(sqlQuery, values);
      console.error("Executing SQL query was success - results :", results);
      return results;
    } catch (error) {
      console.log('error.code :>> ', error.code);
      if (error.code === 'EHOSTUNREACH') {
        console.error("Error: Host unreachable. Please check your internet connection.");
      } else {
        console.error("Error executing SQL query:", error);
      }
      throw error;
    } finally {
      if (connection) connection.release();
    }
  }

  async getGroups(req, res) {
    const restaurant_id = req.params.restaurant_id;

    console.log("getGroups_restaurant_id", restaurant_id);
    const sqlQuery = `
      SELECT
        id,
        name
      FROM \`groups\`
      WHERE restaurant_id = ?
    `;
    return this.executeQuery(sqlQuery, [restaurant_id]);
  }

  async createGroup(req, res) {
    const { name, restaurant_id } = req.body;
    const sqlQuery = `
        INSERT INTO \`groups\` (name, restaurant_id)
        VALUES (?, ?)
      `;

    try {
      const result = await this.executeQuery(sqlQuery, [name, restaurant_id]);
      return result;
    } catch (error) {
      console.error("Error creating group:", error);
      throw error;
    }
  }

  async updateGroup(req, res) {
    const { id, name, restaurant_id } = req.body;
    const sqlQuery = `
      UPDATE \`groups\`
      SET name = ?
      WHERE id = ? AND restaurant_id = ?
    `;

    try {
      const result = await this.executeQuery(sqlQuery, [
        name,
        id,
        restaurant_id,
      ]);
      return result;
    } catch (error) {
      console.error("Error updating type:", error);
      throw error;
    }
  }

  async deleteGroup(req, res) {
    const id = req.params.id;
    console.log("group_id", id);

    const sqlQuery = `
      DELETE FROM \`groups\`
      WHERE id = ? 
    `;

    try {
      const result = await this.executeQuery(sqlQuery, [id]);
      return result;
    } catch (error) {
      console.error("Error deleting type:", error);
      throw error;
    }
  }
}

module.exports = new GroupsService();
