const db = require("../helpers/db")

class QRCodesService {
  async getQRCodes(restaurantId) {
    console.log('getQRCodes_restaurantId :>> ', restaurantId)

    if (restaurantId === undefined) {
      throw new Error("restaurantId is undefined")
    }

    const sqlQuery = `
      SELECT id, code_name, code_value, created_at
      FROM qr_codes
      WHERE restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurantId])
  }

  async saveQRCode(restaurantId, codeName, codeValue) {
    console.log('saveQRCode params :>> ', { restaurantId, codeName, codeValue })

    if (restaurantId === undefined) restaurantId = null
    if (codeName === undefined) codeName = null
    if (codeValue === undefined) codeValue = ""

    const sqlQuery = `
      INSERT INTO qr_codes (restaurant_id, code_name, code_value, created_at)
      VALUES (?, ?, ?, NOW())
    `
    const result = await db.executeQuery(sqlQuery, [restaurantId, codeName, codeValue])
    return { id: result.insertId }
  }

  async deleteQRCode(codeId) {
    console.log('deleteQRCode codeId :>> ', codeId)

    if (codeId === undefined) {
      throw new Error("codeId is undefined")
    }

    const sqlQuery = `DELETE FROM qr_codes WHERE id = ?`
    await db.executeQuery(sqlQuery, [codeId])
  }
}

module.exports = new QRCodesService()