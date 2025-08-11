import express from "express";
import Idea from "../models/idea.js";
import mongoose from "mongoose";

const router = express.Router();

// @route         GET /api/ideas
// @description   Get all ideas
// @access        Public
// @query         _limit (optional limit for ideas returned)
router.get("/", async (req, res, next) => {
  try {
    const { _limit } = req.query;
    const limit = parseInt(_limit, 10);
    const query = Idea.find().sort({ createdAt: -1 });

    if (!isNaN(limit) && limit > 0) {
      query.limit(limit);
    }

    const ideas = await query.exec();

    res.json(ideas);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route         GET /api/ideas/:id
// @description   Get single idea
// @access        Public
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      res.status(404);
      throw new Error("Idea not found");
    }
    res.json(idea);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route         POST /api/ideas
// @description   Create new idea
// @access        Public
router.post("/", async (req, res, next) => {
  try {
    const { title, summary, description, tags } = req.body;

    if (!title.trim() || !summary.trim() || !description.trim()) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const newIdea = new Idea({
      title,
      summary,
      description,
      tags:
        typeof tags === "string"
          ? tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== "")
          : Array.isArray(tags)
          ? tags
          : [],
    });

    const savedIdea = await newIdea.save();
    res.status(201).json(savedIdea);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// @route         PUT /api/ideas/:id
// @description   update single idea
// @access        Public
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }

    const { title, summary, description, tags } = req.body;

    if (!title.trim() || !summary.trim() || !description.trim()) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const idea = await Idea.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        description,
        tags:
          typeof tags === "string"
            ? tags
                .split(", ")
                .map((tag) => tag.trim())
                .filter((tag) => tag !== "")
            : Array.isArray(tags)
            ? tags
            : [],
      },
      { new: true, runValidators: true }
    );

    if (!idea) {
      res.status(404);
      throw new Error("Idea not found");
    }

    res.status(200).json(idea);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// @route         DELETE /api/ideas/:id
// @description   delete single idea
// @access        Public
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log({ id });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }

    const idea = await Idea.findByIdAndDelete(id);
    console.log({ idea });
    if (!idea) {
      res.status(404);
      throw new Error("Idea not found");
    }

    res.status(200).json({
      message: "Idea deleted successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
