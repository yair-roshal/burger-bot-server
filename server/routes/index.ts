import express, { Response, Router } from "express";
import ordersRoutes from "./orders.routes";
import dishesRoutes from "./dishes.routes";
import settingsRoutes from "./settings.routes";
import toppingsRoutes from "./toppings.routes";
import extrasRoutes from "./extras.routes";
import typesRoutes from "./types.routes";
import groupsRoutes from "./groups.routes";
import restaurantsRoutes from "./restaurants.routes";
import qrcodesRoutes from "./qrcodes.routes";
import translations from "./translations.routes";
import othersRoutes from "./others.routes"; // Импорт маршрутов others

const createRouter = (bot: any): Router => {
  const router = Router();

  router.get("/", (_, res: Response) => {
    return res.status(200).send("Server success started 🔋");
  });

  router.use("/", ordersRoutes);
  router.use("/", dishesRoutes);
  router.use("/", settingsRoutes);
  router.use("/", toppingsRoutes);
  router.use("/", extrasRoutes);
  router.use("/", typesRoutes);
  router.use("/", groupsRoutes);
  router.use("/", restaurantsRoutes);
  router.use("/", qrcodesRoutes);
  router.use("/", translations);
  router.use("/", othersRoutes(bot)); // Передаем bot в маршруты others

  return router;
};

export default createRouter;