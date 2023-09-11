const constants = require("../../constants/constants");
const mysql = require("mysql");

// Create a connection pool for better performance
const pool = mysql.createPool(constants.sqlConfig);

class OrdersService {
  async createOrder(req, res) {
    const order = {
      queryId: req.body.queryId,
      comment: req.body.comment,
      totalPrice: req.body.totalPrice,
      optionDelivery: req.body.optionDelivery,
      paymentMethod: req.body.paymentMethod,
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      order_date: req.body.order_date,
    };

    // Use a parameterized query to prevent SQL injection
    const sqlQuery = "INSERT INTO orders SET ?";
    
    // Use the pool to get a connection and release it when done
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Error getting database connection:", err);
        return res.status(500).json({ error: "Database error" });
      }
      
      connection.query(sqlQuery, order, (err, results) => {
        connection.release(); // Release the connection
        
        if (err) {
          console.error("Error executing SQL query:", err);
          return res.status(500).json({ error: "Database error" });
        }
        
        res.status(201).json({ message: "Order created successfully" });
      });
    });
  }
}

module.exports = new OrdersService();
