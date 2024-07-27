const db = require("../helpers/db")

const {
  cloudinaryConfig,
  optionsCloudinary,
} = require("../../constants/constants")

const cloudinary = require("cloudinary").v2
cloudinary.config(cloudinaryConfig)

class SettingsService {
  // getSettings ================================================
  async getSettings(req, res) {
    const restaurant_id = req.params.restaurant_id
    console.log("getSettings_restaurant_id", restaurant_id)

    const sqlQuery = "SELECT * FROM settings WHERE restaurant_id = ?"

    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  // updateSettings ================================================

  async updateSettings(req, res) {
    const restaurant_id = req.params.restaurant_id
    console.log("updateSettings_restaurant_id :>> ", restaurant_id)
    console.log("req.body :>> ", req.body)
    const {
      link,
      logoImage,
      showCreditCardButton,
      showApplePayButton,
      showGooglePayButton,
      showOrderButton,
      textToOrder,
      adminNumberTelegram,
    } = req.body

    const sqlQuery = `
    UPDATE settings 
    SET link = ?,   logoImage = ?, showCreditCardButton = ?, showApplePayButton = ? , showGooglePayButton = ? , showOrderButton = ? , textToOrder = ?  , adminNumberTelegram = ? 
    WHERE restaurant_id = ?
  `

    try {
      let values = [
        link,
        logoImage,
        showCreditCardButton,
        showApplePayButton,
        showGooglePayButton,
        showOrderButton,
        textToOrder,
        adminNumberTelegram,
        restaurant_id,
      ]

      if (logoImage) {
        const uploadedResponse = await cloudinary.uploader.upload(
          logoImage,
          optionsCloudinary
        )
        // console.log("uploadedResponse", uploadedResponse)

        if (uploadedResponse) {
          values = [
            link,
            uploadedResponse.secure_url,
            showCreditCardButton,
            showApplePayButton,
            showGooglePayButton,
            showOrderButton,
            textToOrder,
            adminNumberTelegram,
            restaurant_id,
          ]
        }
      }

      const result = await db.executeQuery(sqlQuery, values)

      return result
    } catch (error) {
      console.error("Error updating settings:", error)
      throw error
    }
  }
}

module.exports = new SettingsService()
