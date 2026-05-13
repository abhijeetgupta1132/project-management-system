const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /projects - Create project
router.post("/", (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  db.query(
    "INSERT INTO projects (name, description) VALUES (?, ?)",
    [name, description],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, name, description });
    },
  );
});

// GET /projects - Get all projects with pagination
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  db.query(
    "SELECT * FROM projects LIMIT ? OFFSET ?",
    [limit, offset],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ page, limit, data: results });
    },
  );
});

// GET /projects/:id - Get single project
router.get("/:id", (req, res) => {
  db.query(
    "SELECT * FROM projects WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0)
        return res.status(404).json({ error: "Project not found" });
      res.json(results[0]);
    },
  );
});

// DELETE /projects/:id - Delete project
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM projects WHERE id = ?",
    [req.params.id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "Project not found" });
      res.json({ message: "Project deleted successfully" });
    },
  );
});

module.exports = router;
