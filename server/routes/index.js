const express = require("express")
const router = express.Router()
const ordersRoutes = require("./orders.routes")
const dishesRoutes = require("./dishes.routes")
const settingsRoutes = require("./settings.routes")
const toppingsRoutes = require("./toppings.routes")
const extrasRoutes = require("./extras.routes")
const typesRoutes = require("./types.routes")
const groupsRoutes = require("./groups.routes")
const restaurantsRoutes = require("./restaurants.routes")
const qrcodesRoutes = require("./qrcodes.routes")
const authRoutes = require("./auth.routes")
const authMiddleware = require("../middleware/auth.middleware")

router.get("/", (req, res) => {
  return res.status(200).send("Server success started 🔋")
})

// Public routes
router.use("/auth", authRoutes)

// Protected routes
router.use(authMiddleware)
router.use("/", ordersRoutes)
router.use("/", dishesRoutes)
router.use("/", settingsRoutes)
router.use("/", toppingsRoutes)
router.use("/", extrasRoutes)
router.use("/", typesRoutes)
router.use("/", groupsRoutes)
router.use("/", restaurantsRoutes)
router.use("/", qrcodesRoutes)

module.exports = router