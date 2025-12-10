import express from "express";
import {
  parentLogin,
  registerParent,
  getParentProfile,
} from "../../controllers/parent/parentAuthController.js";

const parentAuthRouter = express.Router();

parentAuthRouter.post("/login", parentLogin);
parentAuthRouter.post("/register", registerParent);
parentAuthRouter.get("/profile/:parentId", getParentProfile);

export default parentAuthRouter;
