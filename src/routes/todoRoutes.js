import express from "express";
import { updateTodo, getTodo, deleteTodo, addTodo } from "../controllers/todoController.js";

const router = express.Router();

router.post("/", addTodo);
router.get("/", getTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
