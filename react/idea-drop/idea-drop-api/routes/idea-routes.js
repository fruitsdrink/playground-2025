import express from "express";
import Idea from "../models/idea.js";
import mongoose from "mongoose";
import { protect } from "../middlewares/auth-middleware.js";

const router = express.Router();

// @route         GET /api/ideas
// @description   Get all ideas
// @access        Public
// @query         _limit (optional limit for ideas returned)
router.get("/", async (req, res, next) => {
  try {
    const { _limit } = req.query || {};
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
    const { id } = req.params || {};
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
router.post("/", protect, async (req, res, next) => {
  try {
    const { title, summary, description, tags } = req.body || {};

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
      user: req.user.id,
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
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      res.status(404);
      throw new Error("Idea not found");
    }

    if (idea.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("User not authorized");
    }

    const { title, summary, description, tags } = req.body || {};

    if (!title.trim() || !summary.trim() || !description.trim()) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    idea.title = title;
    idea.summary = summary;
    idea.description = description;
    idea.tags =
      typeof tags === "string"
        ? tags
            .split(", ")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
        : Array.isArray(tags)
        ? tags
        : [];

    const updatedIdea = await idea.save();

    // const updatedIdea = await Idea.findByIdAndUpdate(
    //   id,
    //   {
    //     title,
    //     summary,
    //     description,
    //     tags:
    //       typeof tags === "string"
    //         ? tags
    //             .split(", ")
    //             .map((tag) => tag.trim())
    //             .filter((tag) => tag !== "")
    //         : Array.isArray(tags)
    //         ? tags
    //         : [],
    //   },
    //   { new: true, runValidators: true }
    // );

    res.status(200).json(updatedIdea);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// @route         DELETE /api/ideas/:id
// @description   delete single idea
// @access        Public
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const { id } = req.params || {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error("Invalid ID");
    }

    const idea = await Idea.findById(id);
    if (!idea) {
      res.status(404);
      throw new Error("Idea not found");
    }
    if (idea.user && idea.user.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error("User not authorized");
    }

    await idea.deleteOne();

    res.status(200).json({
      message: "Idea deleted successfully",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

export default router;
