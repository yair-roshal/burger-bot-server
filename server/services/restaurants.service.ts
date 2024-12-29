import { Request, Response } from 'express';
import db from '../helpers/db';

export interface Restaurant {
  id: number;
  name: string;
  user_sub?: string;
  subscription_start_date?: Date;
  subscription_end_date?: Date;
  is_subscription_active?: number;
}

class RestaurantsService {
  async getRestaurant(req: Request, res: Response): Promise<Restaurant[]> {
    const restaurant_id = req.params.restaurant_id;

    const sqlQuery = `
      SELECT
        id,
        name,
        subscription_start_date, 
        subscription_end_date, 
        is_subscription_active
       FROM restaurants
      WHERE id = ?
    `;
    
    return db.executeQuery(sqlQuery, [restaurant_id]);
  }

  async getRestaurants(req: Request, res: Response): Promise<Restaurant[]> {
    const sqlQuery = `
      SELECT
        id,
        name
       FROM restaurants
     `;
    return db.executeQuery(sqlQuery);
  }

  async getUserRestaurant(req: Request, res: Response): Promise<Restaurant[]> {
    console.log("req.params.user_sub ", req.params.user_sub);
    console.log(
      "decodeURIComponent(req.params.user_sub) :>> ",
      decodeURIComponent(req.params.user_sub)
    );

    const user_sub = decodeURIComponent(req.params.user_sub);

    const sqlQuery = `
      SELECT * FROM restaurants WHERE user_sub = ?
    `;

    return db.executeQuery(sqlQuery, [user_sub]);
  }

  async createRestaurant(userSub: string): Promise<{ id: number }> {
    try {
      let sqlQuery = `
        INSERT INTO restaurants (user_sub, subscription_start_date, subscription_end_date, is_subscription_active) VALUES (?, ?, ?, ?)
      `;

      const subscription_start_date = new Date();
      const subscription_end_date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 14);
      const is_subscription_active = 1;

      const results = await db.executeQuery(sqlQuery, [userSub, subscription_start_date, subscription_end_date, is_subscription_active]);

      const restaurant_id = results.insertId;

      sqlQuery = `
        INSERT INTO settings (restaurant_id) VALUES (?)
      `;
      await db.executeQuery(sqlQuery, [restaurant_id]);

      return { id: restaurant_id };
    } catch (error) {
      console.error("Error creating restaurant:", error);
      throw new Error("Internal Server Error");
    }
  }

  async updateSubscriptionStatus(id: number, status: number) {
    try {
      const sqlUpdatingQuery = `
        UPDATE restaurants
        SET is_subscription_active = ?
        WHERE id = ?
      `;

      await db.executeQuery(sqlUpdatingQuery, [status, id]);
    } catch (error) {
      console.error("Error update subscription status:", error);
      throw new Error("Internal Server Error");
    }
  }

  async updateSubscriptionDatesAndStatus(id: number, status: number, date_start: Date, date_end: Date) {
    try {
      const sqlUpdatingQuery = `
        UPDATE restaurants
        SET is_subscription_active = ?, subscription_start_date = ?, subscription_end_date = ?
        WHERE id = ?
      `;

      return await db.executeQuery(sqlUpdatingQuery, [status, date_start, date_end, id]);
    } catch (error) {
      console.error("Error update subscription dates and status:", error);
      throw new Error("Internal Server Error");
    }
  }
}

export default new RestaurantsService();