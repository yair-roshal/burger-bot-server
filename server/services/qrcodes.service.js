const db = require("../helpers/db")

class QRCodesService {
  async getQRCodes(restaurant_id) {
    console.log("getQRCodes_restaurant_id :>> ", restaurant_id)

    if (restaurant_id === undefined) {
      throw new Error("restaurant_id is undefined")
    }

    const sqlQuery = `
      SELECT id, code_name, code_value, created_at
      FROM qr_codes
      WHERE restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  async saveQRCode(restaurant_id, codeName, codeValue) {
    console.log("saveQRCode params :>> ", { restaurant_id, codeName, codeValue })

    if (restaurant_id === undefined) restaurant_id = null
    if (codeName === undefined) codeName = null
    if (codeValue === undefined) codeValue = ""

    const sqlQuery = `
      INSERT INTO qr_codes (restaurant_id, code_name, code_value, created_at)
      VALUES (?, ?, ?, NOW())
    `
    const result = await db.executeQuery(sqlQuery, [
      restaurant_id,
      codeName,
      codeValue,
    ])
    return { id: result.insertId }
  }

  async deleteQRCode(codeId) {
    console.log("deleteQRCode codeId :>> ", codeId)

    if (codeId === undefined) {
      throw new Error("codeId is undefined")
    }

    const sqlQuery = `DELETE FROM qr_codes WHERE id = ?`
    await db.executeQuery(sqlQuery, [codeId])
  }
}

module.exports = new QRCodesService()
