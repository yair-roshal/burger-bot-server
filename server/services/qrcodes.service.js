const mysql = require("mysql2/promise");
const { sqlConfig } = require("../../constants/sqlConfig");

console.log('sqlConfig :>> ', sqlConfig);

class QRCodesService {
  constructor() {
    this.pool = mysql.createPool(sqlConfig);
  }

  async executeQuery(sqlQuery, values) {
    const connection = await this.pool.getConnection();

    try {
      const [results] = await connection.execute(sqlQuery, values);
      return results;
    } catch (error) {
      console.error("Error executing SQL query:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  async getQRCodes(restaurantId) {
    console.log('getQRCodes_restaurantId :>> ', restaurantId);

    if (restaurantId === undefined) {
      throw new Error("restaurantId is undefined");
    }

    const sqlQuery = `
      SELECT id, code_name, code_value, created_at
      FROM qr_codes
      WHERE restaurant_id = ?
    `;
    return this.executeQuery(sqlQuery, [restaurantId]);
  }

  async saveQRCode(restaurantId, codeName, codeValue) {
    console.log('saveQRCode params :>> ', { restaurantId, codeName, codeValue });

    if (restaurantId === undefined) restaurantId = null;
    if (codeName === undefined) codeName = null;
    if (codeValue === undefined) codeValue = "";
    // if (codeValue === undefined) codeValue = null;

    const sqlQuery = `
      INSERT INTO qr_codes (restaurant_id, code_name, code_value, created_at)
      VALUES (?, ?, ?, NOW())
    `;
    const result = await this.executeQuery(sqlQuery, [restaurantId, codeName, codeValue]);
    return { id: result.insertId };
  }

  async deleteQRCode(codeId) {
    console.log('deleteQRCode codeId :>> ', codeId);

    if (codeId === undefined) {
      throw new Error("codeId is undefined");
    }

    const sqlQuery = `DELETE FROM qr_codes WHERE id = ?`;
    await this.executeQuery(sqlQuery, [codeId]);
  }
}

module.exports = new QRCodesService();