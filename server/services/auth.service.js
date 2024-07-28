const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');

class AuthService {
  async register(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return { id: user.insertId, username };
  }

  async login(username, password) {
    const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    const user = users[0];

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = this.generateToken(user.id);
    return { user: { id: user.id, username: user.username }, token };
  }

  async refreshToken(userId) {
    const [users] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    const user = users[0];

    if (!user) {
      throw new Error('User not found');
    }

    return this.generateToken(user.id);
  }

  generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

module.exports = new AuthService();