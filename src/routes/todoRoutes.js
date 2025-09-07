import express from "express";
import { tambahTodo, getTodos, updateTodo, hapusTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post("/", tambahTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", hapusTodo);

export default router;
