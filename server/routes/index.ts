import express, {   Response, Router } from "express"
import ordersRoutes from "./orders.routes"
import dishesRoutes from "./dishes.routes"
import settingsRoutes from "./settings.routes"
import toppingsRoutes from "./toppings.routes"
import extrasRoutes from "./extras.routes"
import typesRoutes from "./types.routes"
import groupsRoutes from "./groups.routes"
import restaurantsRoutes from "./restaurants.routes"
import qrcodesRoutes from "./qrcodes.routes"
import translations from "./translations.routes"

const router: Router = express.Router()

router.get("/", (res: Response) => {
  return res.status(200).send("Server success started 🔋")
})

router.use("/", ordersRoutes)
router.use("/", dishesRoutes)
router.use("/", settingsRoutes)
router.use("/", toppingsRoutes)
router.use("/", extrasRoutes)
router.use("/", typesRoutes)
router.use("/", groupsRoutes)
router.use("/", restaurantsRoutes)
router.use("/", qrcodesRoutes)
router.use("/", translations)

export default router
