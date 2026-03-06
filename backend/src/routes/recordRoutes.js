import express from "express";
import {
  getRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
  addPanel
} from "../controllers/recordController.js";

const router = express.Router();

/* ---------- GET ALL COMICS ---------- */
router.get("/", getRecords);

/* ---------- GET COMIC BY ID ---------- */
router.get("/:id", getRecordById);

/* ---------- CREATE COMIC ---------- */
router.post("/", createRecord);

/* ---------- UPDATE COMIC (INCLUDING PANELS) ---------- */
router.put("/:id", updateRecord);

/* ---------- DELETE COMIC ---------- */
router.delete("/:id", deleteRecord);

/* ---------- ADD PANEL ---------- */
router.put("/:id/add-panel", addPanel);

export default router;