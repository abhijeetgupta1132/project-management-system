const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /projects/:project_id/tasks - Create task
router.post("/:project_id/tasks", (req, res) => {
  const { title, description, status, priority, due_date } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  db.query(
    "INSERT INTO tasks (project_id, title, description, status, priority, due_date) VALUES (?, ?, ?, ?, ?, ?)",
    [
      req.params.project_id,
      title,
      description,
      status || "todo",
      priority || "low",
      due_date,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, title, status, priority });
    },
  );
});

// GET /projects/:project_id/tasks - Get all tasks with filter and sort
router.get("/:project_id/tasks", (req, res) => {
  const { status, sort } = req.query;

  let query = "SELECT * FROM tasks WHERE project_id = ?";
  let params = [req.params.project_id];

  // filter by status
  if (status) {
    query += " AND status = ?";
    params.push(status);
  }

  // sort by due_date
  if (sort === "due_date") {
    query += " ORDER BY due_date ASC";
  }

  db.query(query, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// PUT /tasks/:id - Update task
router.put("/:id/tasks/update", (req, res) => {
  const { title, description, status, priority, due_date } = req.body;

  db.query(
    "UPDATE tasks SET title=?, description=?, status=?, priority=?, due_date=? WHERE id=?",
    [title, description, status, priority, due_date, req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Task not found" });
      res.json({ message: "Task updated successfully" });
    },
  );
});

// DELETE /tasks/:id - Delete task
router.delete("/:id/tasks/delete", (req, res) => {
  db.query("DELETE FROM tasks WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  });
});

module.exports = router;
