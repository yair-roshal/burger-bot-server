import { Request, Response } from "express"
import db from '../helpers/db';

interface Type {
  id: number
  type: string
  translations: string
  restaurant_id: number
}

class TypesService {
  async getTypes(req: Request, res: Response): Promise<Type[]> {
    const restaurant_id = req.params.restaurant_id

    console.log("getTypes_restaurant_id", restaurant_id)
    const sqlQuery = `
      SELECT
        id,
        type,
        translations
      FROM types
      WHERE restaurant_id = ?
    `
    return db.executeQuery(sqlQuery, [restaurant_id])
  }

  async createType(req: Request, res: Response) {
    const { type, restaurant_id, translations } = req.body
    const sqlQuery = `
        INSERT INTO types (type, restaurant_id, translations)
        VALUES (?, ?, ?)
      `

    try {
      const result = await db.executeQuery(sqlQuery, [
        type,
        restaurant_id,
        JSON.stringify(translations),
      ])
      return result
    } catch (error) {
      console.error("Error creating type:", error)
      throw error
    }
  }

  async updateType(req: Request, res: Response) {
    // console.log("req.body :>> ", req.body)
    const { id, type, restaurant_id, translations } = req.body
    const sqlQuery = `
      UPDATE types
      SET type = ?, translations = ?
      WHERE id = ? AND restaurant_id = ?
    `

    try {
      const result = await db.executeQuery(sqlQuery, [
        type,
        JSON.stringify(translations),
        id,
        restaurant_id,
      ])
      return result
    } catch (error) {
      console.error("Error updating type:", error)
      throw error
    }
  }

  async deleteType(req: Request, res: Response) {
    const id = req.params.type_id
    console.log("type_id", id)

    const sqlQuery = `
      DELETE FROM types
      WHERE id = ? 
    `

    try {
      const result = await db.executeQuery(sqlQuery, [id])
      return result
    } catch (error) {
      console.error("Error deleting type:", error)
      throw error
    }
  }}

 
export default new TypesService();
