import Todo from "../models/todoModel.js";

export const tambahTodo = async (req, res) => {
    try {
        const todo = new Todo(req.body);
        await todo.save();
        res.status(201).json({ message: "To-do berhasil ditambahkan", data: todo });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah to-do", error: error.message });
    }
};

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil to-do", error: error.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) return res.status(404).json({ message: "To-do tidak ditemukan" });
        res.json({ message: "To-do berhasil diperbarui", data: todo });
    } catch (error) {
        res.status(500).json({ message: "Gagal memperbarui to-do", error: error.message });
    }
};

export const hapusTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: "To-do tidak ditemukan" });
        res.json({ message: "To-do berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus to-do", error: error.message });
    }
};
