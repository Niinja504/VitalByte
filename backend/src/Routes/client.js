import express from "express";
import ClientController from "../Controllers/clientController.js";
import { validateAuthToken } from "../middlewares/validateAuthToken.js";

const router = express.Router();

router
  .route("/")
  .get(ClientController.getClient)
  .post(ClientController.insertClient);

// Ruta para obtener el usuario autenticado
router.get("/me", validateAuthToken(["client"]), ClientController.getClientMe);

router
  .route("/:id")
  .get(ClientController.getClientById)
  .put(ClientController.updateClient)
  .delete(ClientController.deleteClient);

export default router;
