const db = require("../helpers/db")
const cloudinary = require("cloudinary").v2
const { isPhotoUrl } = require("../helpers/isPhotoUrl")

const {
  cloudinaryConfig,
  optionsCloudinary,
} = require("../../constants/constants")

cloudinary.config(cloudinaryConfig)

class ToppingsService {
  // getToppings ================================================
  async getToppings(req, res) {
    const restaurant_id = req.params.restaurant_id

    console.log("getToppings_restaurant_id", restaurant_id)
    const sqlQuery = `
      SELECT
        t.id, 
        t.title,
        t.price,
        t.image,
        t.restaurant_id,
        t.translations  -- Add translations column here
      FROM toppings t
      WHERE t.restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  // createTopping ================================================

  async createTopping(req, res) {
    console.log("req.body :>> ", req.body)
    const { title, price, image, restaurant_id, translations } = req.body  // Add translations to destructuring
    const sqlQuery = `
          INSERT INTO toppings (title, price, image, restaurant_id, translations)  -- Add translations column
          VALUES (?, ?, ?, ?, ?)
        `

    try {
      let values = [title, price, image, restaurant_id, JSON.stringify(translations)]  // Add translations to values

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        )
        // console.log("uploadedResponse", uploadedResponse)

        if (uploadedResponse) {
          values = [title, price, uploadedResponse.secure_url, restaurant_id, JSON.stringify(translations)]  // Add translations to values
        }
      }

      const result = await db.executeQuery(sqlQuery, values)

      return result
    } catch (error) {
      console.error("Error creating topping:", error)
      throw error
    }
  }

  // updateTopping ================================================

  async updateTopping(req, res) {
    const { id, title, price, image, restaurant_id, translations } = req.body  // Add translations to destructuring
    const sqlQuery = `
        UPDATE toppings
        SET title = ?, price = ?, image = ?, restaurant_id = ?, translations = ?  -- Add translations to update query
        WHERE id = ?
    `

    try {
      let values = [title, price, image, restaurant_id, JSON.stringify(translations), id]  // Add translations to values

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        )
        // console.log("uploadedResponse", uploadedResponse)

        if (uploadedResponse) {
          values = [
            title,
            price,
            uploadedResponse.secure_url,
            restaurant_id,
            JSON.stringify(translations),  // Add translations to values
            id,
          ]
        }
      }

      const result = await db.executeQuery(sqlQuery, values)

      return result
    } catch (error) {
      console.error("Error updating topping:", error)
      throw error
    }
  }

  // deleteTopping ================================================

  async deleteTopping(req, res) {
    // const { id } = req.params;
    const id = req.params.topping_id

    // console.log('req.body222', req.body)
    // console.log('topping_id', topping_id)
    console.log("id", id)
    console.log("req.params", req.params)

    const sqlQuery = `
        DELETE FROM toppings
        WHERE id = ?
    `

    try {
      const result = await db.executeQuery(sqlQuery, [id])

      return result
    } catch (error) {
      console.error("Error deleting topping:", error)
      throw error
    }
  }
}

module.exports = new ToppingsService()