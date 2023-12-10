const express = require("express");
const router = express.Router();
const ordersRoutes = require("./orders.routes");
const dishesRoutes = require("./dishes.routes");
const settingsRoutes = require("./settings.routes");
const toppingsRoutes = require("./toppings.routes");
const extrasRoutes = require("./extras.routes");
const typesRoutes = require("./types.routes");
const restaurantsRoutes = require("./restaurants.routes");

router.use("/", ordersRoutes);
router.use("/", dishesRoutes);
router.use("/", settingsRoutes);
router.use("/", toppingsRoutes);
router.use("/", extrasRoutes);
router.use("/", typesRoutes);
router.use("/", restaurantsRoutes);

module.exports = router;
