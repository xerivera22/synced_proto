
import express from "express";
import {
  registerAdmin,
  authAdmin,
} from "../../controllers/adminAuthController.js";

const adminRouter = express.Router();

adminRouter.post("/register", registerAdmin);
adminRouter.post("/login", authAdmin);

export default adminRouter;
