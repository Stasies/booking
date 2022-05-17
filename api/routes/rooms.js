import express from "express";
import {
  createRoom,
  deleteRoom,
  getAllRoom,
  updateRoom,
  updateRoomAvailability,
} from "../controllers/room.js";
import Room from "../models/Room.js";
import { createError } from "../utils/error.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create
router.post("/:hotelid", verifyAdmin, createRoom);

//update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

//delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//get
router.get("/:id", getAllRoom);

//get all
router.get("/", getAllRoom);

export default router;
