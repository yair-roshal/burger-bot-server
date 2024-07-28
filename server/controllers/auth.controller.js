const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthService = require('../services/auth.service');

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await AuthService.register(username, password);
      res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const { user, token } = await AuthService.login(username, password);
      res.json({ message: 'Login successful', token, userId: user.id });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const { userId } = req.user;
      const newToken = await AuthService.refreshToken(userId);
      res.json({ token: newToken });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = new AuthController();