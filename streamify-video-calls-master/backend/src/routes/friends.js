import express from "express";
import User from "../models/User.js";
import {protectRoute} from "../middleware/auth.middleware.js"; // make sure this exists and exports default

const router = express.Router();

router.get("/:userId", protectRoute, async (req, res) => {
  console.log("🔥 Friends route hit for user:", req.params.userId);

  try {
    const user = await User.findById(req.params.userId).populate("friends", "name email");
    console.log("✅ User found:", user?.name);

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (!user.friends.length)
      return res.status(200).json({ friends: [], message: "You have no friends yet." });

    res.status(200).json({ friends: user.friends });
  } catch (err) {
    console.error("❌ Error fetching friends:", err);
    res.status(500).json({ message: "Server error fetching friends" });
  }
});

// GET friends
router.get("/:userId", protectRoute, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate("friends", "name email");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Always return friends array, even if empty
    res.status(200).json({ friends: user.friends || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching friends" });
  }
});

// DELETE friend
router.delete("/:friendId", protectRoute, async (req, res) => {
  try {
    const userId = req.user._id; // comes from authMiddleware
    const friendId = req.params.friendId;

    await User.findByIdAndUpdate(userId, { $pull: { friends: friendId } });
    await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } });

    res.status(200).json({ message: "Friend removed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error removing friend" });
  }
});

export default router;
