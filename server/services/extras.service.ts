import { Request, Response } from 'express';
import db from '../helpers/db';
import { v2 as cloudinary } from 'cloudinary';
import { isPhotoUrl } from '../helpers/isPhotoUrl';
import {
  cloudinaryConfig,
  optionsCloudinary,
} from '../../constants/constants';

cloudinary.config(cloudinaryConfig);

interface Extra {
  id: number;
  title: string;
  type_id: number;
  image: string;
  restaurant_id: number;
  translations: string;
}

class ExtrasService {
  async getExtras(req: Request, res: Response): Promise<Extra[]> {
    const restaurant_id = req.params.restaurant_id;

    console.log("getExtras_restaurant_id", restaurant_id);
    const sqlQuery = `
      SELECT
        t.id,
        t.title,
        t.type_id,
        t.image,
        t.restaurant_id,
        t.translations
      FROM extras t
      WHERE t.restaurant_id = ?
    `;
    return db.executeQuery(sqlQuery, [restaurant_id]);
  }

  async createExtra(req: Request, res: Response) {
    const { title, image, restaurantId, type_id, translations } = req.body;
    
    console.log('req.body :>> ', req.body);

    const sqlQuery = `
        INSERT INTO extras (title, image, restaurant_id, type_id, translations)
        VALUES (?, ?, ?, ?, ?)
      `;

    try {
      let values: (string | number | null)[] = [
        title || null,
        image || null,
        restaurantId || null,
        type_id || null,
        JSON.stringify(translations) || null
      ];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );

        if (uploadedResponse) {
          values = [
            title,
            uploadedResponse.secure_url,
            restaurantId,
            type_id,
            JSON.stringify(translations) || null
          ];
          console.log("uploadedResponse_values :>> ", values);
        }
      }

      const result = await db.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error creating extra:", error);
      throw error;
    }
  }

  async updateExtra(req: Request, res: Response) {
    const { id, title, image, restaurant_id, type_id, translations } = req.body;
    console.log("updateExtra_req.body", req.body);

    const sqlQuery = `
      UPDATE extras
      SET title = ?, image = ?, restaurant_id = ?, type_id = ?, translations = ?
      WHERE id = ?
    `;

    try {
      let values: (string | number | null)[] = [
        title,
        image,
        restaurant_id,
        type_id,
        JSON.stringify(translations) || null,
        id
      ];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );

        if (uploadedResponse) {
          values = [
            title,
            uploadedResponse.secure_url,
            restaurant_id,
            type_id,
            JSON.stringify(translations) || null,
            id
          ];
        }
      }

      const result = await db.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error updating extra:", error);
      throw error;
    }
  }

  async deleteExtra(req: Request, res: Response) {
    const id = req.params.extra_id;

    console.log("id", id);
    console.log("req.params", req.params);

    const sqlQuery = `
      DELETE FROM extras
      WHERE id = ?
    `;

    try {
      const result = await db.executeQuery(sqlQuery, [id]);

      return result;
    } catch (error) {
      console.error("Error deleting extra:", error);
      throw error;
    }
  }
}

export default new ExtrasService();