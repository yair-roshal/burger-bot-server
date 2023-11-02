// const jwt = require('express-jwt');
const { secret } = require("config.json")
const db = require("helpers/db")
const { expressjwt: jwt } = require("express-jwt")

module.exports = authorize

function authorize() {
  console.log("secret------------->>>", secret)
  return [
    // authenticate JWT token and attach decoded token to request as req.user
    // jwt({ secret, algorithms: ['HS256'] }),

    jwt({
      secret,
      algorithms: ["HS256"],
    }),

    // attach full user record to request object
    async (req, res, next) => {
      // get user with id from token 'sub' (subject) property
      console.log('req--->>>', req)

      console.log('req.user___>>>>>', req.user)
      
      
      const user = await db.User.findByPk(req.auth.sub)
      // const user = await db.User.findByPk(req.user.sub)

      // check user still exists
      if (!user) return res.status(401).json({ message: "Unauthorized" })

      // authorization successful
      req.user = user.get()
      next()
    },
  ]
}
