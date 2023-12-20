const mysql = require("mysql2/promise");
const { sqlConfig } = require("../../constants/sqlConfig");

class TypesService {
  constructor() {
    this.pool = mysql.createPool(sqlConfig);
  }

  async executeQuery(sqlQuery, values) {
    const connection = await this.pool.getConnection();

    try {
      const [results] = await connection.execute(sqlQuery, values);
      console.error("Executing SQL query was success - results :", results);

      return results;
    } catch (error) {
      console.error("Error executing SQL query:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async getTypes(req, res) {
    const restaurant_id = req.params.restaurant_id;

    console.log("getTypes_restaurant_id", restaurant_id);
    const sqlQuery = `
      SELECT
        id,
        type
      FROM types
      WHERE restaurant_id = ?
    `;
    return this.executeQuery(sqlQuery, [restaurant_id]);
  }

  async createType(req, res) {
    const { type, restaurant_id } = req.body;
    const sqlQuery = `
        INSERT INTO types (type, restaurant_id)
        VALUES (?, ?)
      `;

    try {
      const result = await this.executeQuery(sqlQuery, [type, restaurant_id]);
      return result;
    } catch (error) {
      console.error("Error creating type:", error);
      throw error;
    }
  }

  async updateType(req, res) {
    const { id, type, restaurant_id } = req.body;
    const sqlQuery = `
      UPDATE types
      SET type = ?
      WHERE id = ? AND restaurant_id = ?
    `;

    try {
      const result = await this.executeQuery(sqlQuery, [
        type,
        id,
        restaurant_id,
      ]);
      return result;
    } catch (error) {
      console.error("Error updating type:", error);
      throw error;
    }
  }

  async deleteType(req, res) {
    const id = req.params.type_id;
    console.log("type_id", id);

    const sqlQuery = `
      DELETE FROM types
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

module.exports = new TypesService();
