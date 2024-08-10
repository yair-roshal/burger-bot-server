const db = require("../helpers/db")
const cloudinary = require("cloudinary").v2
const { isPhotoUrl } = require("../helpers/isPhotoUrl")

const {
  cloudinaryConfig,
  optionsCloudinary,
} = require("../../constants/constants")

cloudinary.config(cloudinaryConfig)

class extrasService {
  // getExtras ================================================
  async getExtras(req, res) {
    const restaurant_id = req.params.restaurant_id

    console.log("getExtras_restaurant_id", restaurant_id)
    const sqlQuery = `
      SELECT
        t.id,
        t.title,
        t.type_id,
        t.image,
        t.restaurant_id,
        t.translations  -- Добавлено: столбец translations
      FROM extras t
      WHERE t.restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  // createExtra ================================================

  async createExtra(req, res) {
    const { title, image, restaurantId, type_id, translations } = req.body  // Добавлено: translations
    
    console.log('req.body :>> ', req.body);

    const sqlQuery = `
        INSERT INTO extras (title, image, restaurant_id, type_id, translations)  -- Добавлено: столбец translations
        VALUES (?, ?, ?, ?, ?)
      `

    try {
      let values = [
        title || null,
        image || null,
        restaurantId || null,
        type_id || null,
        JSON.stringify(translations) || null  // Добавлено: translations
      ]

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        )

        if (uploadedResponse) {
          values = [
            title,
            uploadedResponse.secure_url,
            restaurantId,
            type_id,
            JSON.stringify(translations) || null  // Добавлено: translations
          ]
          console.log("uploadedResponse_values :>> ", values)
        }
      }

      const result = await db.executeQuery(sqlQuery, values)

      return result
    } catch (error) {
      console.error("Error creating extra:", error)
      throw error
    }
  }

  // updateExtra ================================================

  async updateExtra(req, res) {
    const { id, title, image, restaurant_id, type_id, translations } = req.body  // Добавлено: translations
    console.log("updateExtra_req.body", req.body)

    const sqlQuery = `
      UPDATE extras
      SET title = ?, image = ?, restaurant_id= ?, type_id = ?, translations = ?  -- Добавлено: столбец translations
      WHERE id = ?
    `

    try {
      let values = [
        title,
        image,
        restaurant_id,
        type_id,
        JSON.stringify(translations) || null,  // Добавлено: translations
        id
      ]

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        )

        if (uploadedResponse) {
          values = [
            title,
            uploadedResponse.secure_url,
            restaurant_id,
            type_id,
            JSON.stringify(translations) || null,  // Добавлено: translations
            id
          ]
        }
      }

      const result = await db.executeQuery(sqlQuery, values)

      return result
    } catch (error) {
      console.error("Error updating extra:", error)
      throw error
    }
  }

  // deleteExtra ================================================

  async deleteExtra(req, res) {
    const id = req.params.extra_id

    console.log("id", id)
    console.log("req.params", req.params)

    const sqlQuery = `
      DELETE FROM extras
      WHERE id = ?
    `

    try {
      const result = await db.executeQuery(sqlQuery, [id])

      return result
    } catch (error) {
      console.error("Error deleting extra:", error)
      throw error
    }
  }
}

module.exports = new extrasService()