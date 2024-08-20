import { Request, Response } from 'express';
import db from '../helpers/db';
import { v2 as cloudinary } from 'cloudinary';
import {
  cloudinaryConfig,
  optionsCloudinary,
} from '../../constants/constants';

cloudinary.config(cloudinaryConfig);

interface Settings {
  link: string;
  logoImage: string;
  showCreditCardButton: boolean;
  showApplePayButton: boolean;
  showGooglePayButton: boolean;
  showOrderButton: boolean;
  textToOrder: string;
  adminNumberTelegram: string;
}

class SettingsService {
  // @ts-ignore
  async getSettings(req: Request, res: Response) {
    const restaurant_id = req.params.restaurant_id;
    console.log("getSettings_restaurant_id", restaurant_id);

    const sqlQuery = "SELECT * FROM settings WHERE restaurant_id = ?";

    return db.executeQuery(sqlQuery, [restaurant_id]);
  }
// @ts-ignore
  async updateSettings(req: Request, res: Response) {
    const restaurant_id = req.params.restaurant_id;
    // console.log("updateSettings_restaurant_id :>> ", restaurant_id);
    // console.log("req.body :>> ", req.body);
    const {
      link,
      logoImage,
      showCreditCardButton,
      showApplePayButton,
      showGooglePayButton,
      showOrderButton,
      textToOrder,
      adminNumberTelegram,
    }: Settings = req.body;

    const sqlQuery = `
    UPDATE settings 
    SET link = ?, logoImage = ?, showCreditCardButton = ?, showApplePayButton = ?, showGooglePayButton = ?, showOrderButton = ?, textToOrder = ?, adminNumberTelegram = ? 
    WHERE restaurant_id = ?
  `;

    try {
      let values: (string | boolean | number)[] = [
        link,
        logoImage,
        showCreditCardButton,
        showApplePayButton,
        showGooglePayButton,
        showOrderButton,
        textToOrder,
        adminNumberTelegram,
        restaurant_id,
      ];

      if (logoImage) {
        const uploadedResponse = await cloudinary.uploader.upload(
          logoImage,
          optionsCloudinary
        );

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
          ];
        }
      }

      const result = await db.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error updating settings:", error);
      throw error;
    }
  }
}

export default new SettingsService();