const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../helpers/db');
// const bcrypt = require('bcrypt');

class AuthService {

  // В AuthService.register
  async register(username, password) {
    try {
      // Проверяем, существует ли пользователь с таким именем
      const existingUser = await db.executeQuery('SELECT * FROM users WHERE username = ?', [username]);
  
      if (!Array.isArray(existingUser) || existingUser.length === 0) {
        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Вставляем нового пользователя с захешированным паролем
        await db.executeQuery('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
        return { success: true };
      } else {
        // Имя пользователя уже занято
        return { success: false, error: 'Username already exists' };
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      throw error;
    }
  }
  async login(username, password) {
    try {
      console.log('username :>> ', username);
      console.log('password :>> ', password);
  
      const users = await db.executeQuery('SELECT * FROM users WHERE username = ?', [username]);
      const user = users[0];
      console.log('user from DB :>> ', user);
  
      if (!user) {
        throw new Error('User not found');
      }
  
      console.log('Comparing passwords...');
      console.log('Input password :>> ', password);
      console.log('Hashed password from DB :>> ', user.password);
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log('isPasswordValid :>> ', isPasswordValid);
  
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
  
      const token = this.generateToken(user.id);
      return { user: { id: user.id, username: user.username }, token };
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }
  
  async refreshToken(userId) {
    try {
      const [users] = await db.executeQuery('SELECT * FROM users WHERE id = ?', [userId]);
      const user = users[0];
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return this.generateToken(user.id);
    } catch (error) {
      console.error('Error during token refresh:', error);
      throw error;
    }
  }

  generateToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }
}

module.exports = new AuthService();