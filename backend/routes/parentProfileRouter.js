import express from "express";
import {
    createParentProfile,
    deleteParentProfile,
    getParentProfileById,
    getParentProfiles,
    updateParentProfile,
} from "../controllers/parentProfileController.js";

const parentProfileRouter = express.Router();

parentProfileRouter.get("/", getParentProfiles);
parentProfileRouter.get("/:id", getParentProfileById);
parentProfileRouter.post("/", createParentProfile);
parentProfileRouter.put("/:id", updateParentProfile);
parentProfileRouter.delete("/:id", deleteParentProfile);

export default parentProfileRouter;
