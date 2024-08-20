import { Request, Response } from 'express';
import db from '../helpers/db';
import { v2 as cloudinary } from 'cloudinary';
import { isPhotoUrl } from '../helpers/isPhotoUrl';
import {
  cloudinaryConfig,
  optionsCloudinary,
} from '../../constants/constants';

cloudinary.config(cloudinaryConfig);

interface Topping {
  id: number;
  title: string;
  price: number;
  image: string;
  restaurant_id: number;
  translations: string;
}

class ToppingsService {
  // @ts-ignore
  async getToppings(req: Request, res: Response): Promise<Topping[]> {
    const restaurant_id = req.params.restaurant_id;

    console.log("getToppings_restaurant_id", restaurant_id);
    const sqlQuery = `
      SELECT
        t.id, 
        t.title,
        t.price,
        t.image,
        t.restaurant_id,
        t.translations
      FROM toppings t
      WHERE t.restaurant_id = ?
    `;
    return db.executeQuery(sqlQuery, [restaurant_id]);
  }
// @ts-ignore
  async createTopping(req: Request, res: Response) {
    // console.log("req.body :>> ", req.body);
    const { title, price, image, restaurant_id, translations } = req.body;
    const sqlQuery = `
          INSERT INTO toppings (title, price, image, restaurant_id, translations)
          VALUES (?, ?, ?, ?, ?)
        `;

    try {
      let values: (string | number)[] = [title, price, image, restaurant_id, JSON.stringify(translations)];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );

        if (uploadedResponse) {
          values = [title, price, uploadedResponse.secure_url, restaurant_id, JSON.stringify(translations)];
        }
      }

      const result = await db.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error creating topping:", error);
      throw error;
    }
  }
// @ts-ignore
  async updateTopping(req: Request, res: Response) {
    const { id, title, price, image, restaurant_id, translations } = req.body;
    const sqlQuery = `
        UPDATE toppings
        SET title = ?, price = ?, image = ?, restaurant_id = ?, translations = ?
        WHERE id = ?
    `;

    try {
      let values: (string | number)[] = [title, price, image, restaurant_id, JSON.stringify(translations), id];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );

        if (uploadedResponse) {
          values = [
            title,
            price,
            uploadedResponse.secure_url,
            restaurant_id,
            JSON.stringify(translations),
            id,
          ];
        }
      }

      const result = await db.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error updating topping:", error);
      throw error;
    }
  }
// @ts-ignore
  async deleteTopping(req: Request, res: Response) {
    const id = req.params.topping_id;

    console.log("id", id);
    console.log("req.params", req.params);

    const sqlQuery = `
        DELETE FROM toppings
        WHERE id = ?
    `;

    try {
      const result = await db.executeQuery(sqlQuery, [id]);

      return result;
    } catch (error) {
      console.error("Error deleting topping:", error);
      throw error;
    }
  }
}

export default new ToppingsService();