import { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import {
  optionsCloudinary,
  cloudinaryConfig,
} from "../../constants/constants";
import { isPhotoUrl } from "../helpers/isPhotoUrl";
import db from "../helpers/db";

cloudinary.config(cloudinaryConfig);

interface Dish {
  id: number;
  group_obj: any;
  title: string;
  price: number;
  description: string;
  image: string;
  translations: any;
  translations_descriptions: any;
  restaurant_id: number;
  toppings?: Topping[];
  extras?: Extra[];
}

interface Topping {
  id: number;
  title: string;
  price: number;
  translations: any;
  image: string;
}

interface Extra {
  id: number;
  title: string;
  image: string;
  restaurant_id: number;
  translations: any;
  type_id: number;
}

class DishesService {
  // @ts-ignore
  async getDishes(req: Request, res: Response): Promise<Dish[]> {
    const restaurant_id = req.params.restaurant_id;
    console.log("getDishes_restaurant_id", restaurant_id);

    const dishesQuery = `
        SELECT
            d.id AS id,
            d.group_obj,
            d.title AS title,
            d.price AS price,
            d.description AS description,
            d.image AS image,
            d.translations AS translations,
            d.translations_descriptions AS translations_descriptions,
            d.restaurant_id AS restaurant_id
        FROM dishes d
        WHERE d.restaurant_id = ?;
    `;

    const dishesResult = await db.executeQuery(dishesQuery, [restaurant_id]);

    const toppingsQuery = `
        SELECT
            d.id AS id,
            CASE
                WHEN COUNT(t.id) = 0 THEN JSON_ARRAY()
                ELSE JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', t.id,
                        'title', t.title,
                        'price', t.price,
                        'translations', t.translations,
                        'image', t.image
                    )
                )
            END AS toppings
        FROM dishes d
        LEFT JOIN dishes_toppings dt ON d.id = dt.dish_id
        LEFT JOIN toppings t ON dt.topping_id = t.id
        WHERE d.restaurant_id = ?
        GROUP BY d.id;
    `;

    const toppingsResult = await db.executeQuery(toppingsQuery, [restaurant_id]);

    const extrasQuery = `
    SELECT
        d.id AS id,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', e.id,
                'title', e.title,
                'image', e.image,
                'restaurant_id', e.restaurant_id,
                'translations', e.translations,
                'type_id', e.type_id
            )
        ) AS extras
    FROM dishes d
    LEFT JOIN dishes_extras de ON d.id = de.dish_id
    LEFT JOIN extras e ON de.extra_id = e.id
    WHERE d.restaurant_id = ? AND e.id IS NOT NULL
    GROUP BY d.id;
`;

    const extrasResult = await db.executeQuery(extrasQuery, [restaurant_id]);

    const combinedData: Dish[] = dishesResult.map((dish: any) => {
      const toppings = toppingsResult.find((item: any) => item.id === dish.id);
      const extras = extrasResult.find((item: any) => item.id === dish.id);

      return {
        id: dish.id,
        title: dish.title,
        group_obj: dish.group_obj,
        price: parseFloat(dish.price),
        description: dish.description,
        image: dish.image,
        restaurant_id: dish.restaurant_id,
        toppings: toppings?.toppings || [],
        extras: extras?.extras || [],
        translations: dish.translations,
        translations_descriptions: dish.translations_descriptions,
      };
    });
    // console.log("getDishes_combinedData :>> ", combinedData);
    return combinedData;
  }
// @ts-ignore
  async createDish(req: Request, res: Response) {
    console.log("req.body :>> ", req.body);
    const {
      title,
      price,
      image,
      description,
      toppings,
      extras,
      restaurant_id,
      group_obj
    } = req.body;

    const sqlQuery = `
        INSERT INTO dishes (title, group_obj, price, image, description, restaurant_id)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    try {
      let values: any[] = [title, group_obj, price, image, description, restaurant_id];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );

        if (uploadedResponse) {
          values = [
            title,
            group_obj,
            price,
            uploadedResponse.secure_url,
            description,
            restaurant_id,
          ];
        }
      }

      const result = await db.executeQuery(sqlQuery, values);

      if (toppings && toppings.length > 0) {
        const dishId = result.insertId;
        await DishesService.insertToppings(dishId, toppings);
      }

      if (extras && extras.length > 0) {
        const dishId = result.insertId;
        await DishesService.insertExtras(dishId, extras);
      }

      return result;
    } catch (error) {
      console.error("Error creating dish:", error);
      throw error;
    }
  }

  static async insertExtras(dishId: number, extras: Extra[]) {
    const sqlQuery = `
      INSERT INTO dishes_extras (dish_id, extra_id)
      VALUES (?, ?)
    `;

    extras.forEach(async (extra) => {
      const values = [dishId, extra.id];
      try {
        await db.executeQuery(sqlQuery, values);
      } catch (error) {
        console.error("Error inserting extras:", error);
        throw error;
      }
    });
  }

  static async insertToppings(dishId: number, toppings: Topping[]) {
    const sqlQuery = `
      INSERT INTO dishes_toppings (dish_id, topping_id)
      VALUES (?, ?)
    `;

    toppings.forEach(async (topping) => {
      const values = [dishId, topping.id];
      try {
        await db.executeQuery(sqlQuery, values);
      } catch (error) {
        console.error("Error inserting toppings:", error);
        throw error;
      }
    });
  }

  async getCategories() {
    const sqlQuery = "SELECT * FROM categories";
    return db.executeQuery(sqlQuery, []);
  }
// @ts-ignore
  async updateDish(req: Request, res: Response) : Promise<any> {
    const dish_id = req.params.dish_id;
    console.log("updateDish_dish_id :>> ", dish_id);
    console.log("updateDish_req.body :>> ", req.body);
    const {
      id,
      title,
      price,
      image,
      description,
      toppings,
      extras,
      restaurant_id,
      translations,
      translations_descriptions,
      group_obj,
    } = req.body;

    const sqlQuery = `
    UPDATE dishes 
    SET title = ?, group_obj = ?, price = ?, image = ?, description = ?, translations = ?, translations_descriptions = ? 
    WHERE id = ? AND restaurant_id = ?
    `;

    try {
      let values: any[] = [
        title,
        group_obj,
        price,
        image,
        description,
        translations,
        translations_descriptions,
        id,
        restaurant_id,
     ].map(param => param === undefined ? null : param);

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );
        if (uploadedResponse) {
          values = [
            title,
            group_obj,
            price,
            uploadedResponse.secure_url,
            description,
            translations,
            translations_descriptions,
            id,
            restaurant_id,
          ];
        }
      }

      console.log("Values before executing query:", values);

      const result = await db.executeQuery(sqlQuery, values);
      console.log("Update result:", result);

      if (toppings.length > 0) {
        await DishesService.updateToppings(id, toppings);
      }

      if (extras.length > 0) {
        await DishesService.updateExtras(id, extras);
      }

      return result;
    } catch (error) {
      console.error("Error updating dish:", error);
      throw error;
    }
  }

  static async updateToppings(dishId: number, toppings: Topping[]) {
    const deleteQuery = `DELETE FROM dishes_toppings WHERE dish_id = ?`;
    const insertQuery = `INSERT INTO dishes_toppings (dish_id, topping_id) VALUES (?, ?)`;

    const connection = await db.pool.getConnection();

    try {
      await connection.beginTransaction();

      await connection.execute(deleteQuery, [dishId]);

      for (const topping of toppings) {
        const values = [dishId, topping.id];
        await connection.execute(insertQuery, values);
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error updating toppings:", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  static async updateExtras(dishId: number, extras: Extra[]) {
    const deleteQuery = `DELETE FROM dishes_extras WHERE dish_id = ?`;
    const insertQuery = `INSERT INTO dishes_extras (dish_id, extra_id) VALUES (?, ?)`;

    const connection = await db.pool.getConnection();

    try {
      await connection.beginTransaction();

      await connection.execute(deleteQuery, [dishId]);

      if (extras && extras.length > 0) {
        for (const extra of extras) {
          const values = [dishId, extra.id];
          await connection.execute(insertQuery, values);
        }
      }

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      console.error("Error updating extras:", error);
      throw error;
    } finally {
      connection.release();
    }
  }
// @ts-ignore
  async deleteDish(req: Request, res: Response) : Promise<any> {
    const dishId = req.params.dish_id;

    const deleteDishQuery = "DELETE FROM dishes WHERE id = ?";

    try {
      const result = await db.executeQuery(deleteDishQuery, [dishId]);
      return result;
    } catch (error) {
      console.error("Error deleting dish:", error);
      throw error;
    }
  }
}

export default new DishesService();