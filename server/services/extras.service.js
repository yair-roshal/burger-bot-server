const mysql = require("mysql2/promise");
 
 const cloudinary = require("cloudinary").v2;
 const { isPhotoUrl } = require("../helpers/isPhotoUrl");

const {
  sqlConfig,
  cloudinaryConfig,
  optionsCloudinary,
} = require("../../constants/constants")

 cloudinary.config(cloudinaryConfig)

class extrasService {
  constructor() {
    this.pool = mysql.createPool(sqlConfig); // Создаем пул соединений
  }

  // Метод для выполнения запросов к базе данных
  async executeQuery(sqlQuery, values) {
    const connection = await this.pool.getConnection();

    try {
      const [results] = await connection.execute(sqlQuery, values);
      return results;
    } catch (error) {
      console.error("Error executing SQL query:", error);
      throw error;
    } finally {
      connection.release(); // Вернуть соединение в пул после использования
    }
  }

  // getExtras ================================================
  async getExtras(req, res) {
    const restaurant_id = req.params.restaurant_id;

    console.log("getExtras_restaurant_id", restaurant_id);
    const sqlQuery = `
      SELECT
        t.id,
        t.title,
        t.type_id,
        t.image,
        t.restaurant_id
      FROM extras t
      WHERE t.restaurant_id = ?
    `;
    return this.executeQuery(sqlQuery, [restaurant_id]);
  }

  // createExtra ================================================

  async createExtra(req, res) {
    console.log("req.body :>> ", req.body);
    const { title, image, restaurant_id, type_id } = req.body;
    const sqlQuery = `
        INSERT INTO extras (title,  image, restaurant_id, type_id)
        VALUES (?, ?, ?, ?)
      `;

    try {
      let values = [title, image, restaurant_id, type_id];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );
        console.log("uploadedResponse", uploadedResponse);

        if (uploadedResponse) {
          values = [title, uploadedResponse.secure_url, restaurant_id, type_id];
        }
      }

      const result = await this.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error creating extra:", error);
      throw error;
    }
  }

  // updateExtra ================================================

  async updateExtra(req, res) {
    const { id, title, image, restaurant_id, type_id } = req.body;
    console.log("updateExtra_req.body", req.body);

    const sqlQuery = `
      UPDATE extras
      SET title = ?, image = ?, restaurant_id= ?, type_id = ?
      WHERE id = ?
    `;

    try {
      let values = [title, image, restaurant_id, type_id, id];

      if (image && isPhotoUrl(image)) {
        const uploadedResponse = await cloudinary.uploader.upload(
          image,
          optionsCloudinary
        );
        console.log("uploadedResponse", uploadedResponse);

        if (uploadedResponse) {
          values = [
            title,
            uploadedResponse.secure_url,
            restaurant_id,
            type_id,
            id,
          ];
        }
      }

      const result = await this.executeQuery(sqlQuery, values);

      return result;
    } catch (error) {
      console.error("Error updating extra:", error);
      throw error;
    }
  }

  // deleteExtra ================================================

  async deleteExtra(req, res) {
    const id = req.params.extra_id;

    console.log("id", id);
    console.log("req.params", req.params);

    const sqlQuery = `
      DELETE FROM extras
      WHERE id = ?
    `;

    try {
      const result = await this.executeQuery(sqlQuery, [id]);

      return result;
    } catch (error) {
      console.error("Error deleting extra:", error);
      throw error;
    }
  }
}

module.exports = new extrasService();
