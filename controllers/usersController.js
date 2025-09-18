const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

const User = require("../models/user");
const Achievement = require("../models/achievement");
const UserAchievement = require("../models/userAchievement");
const Badge = require("../models/badge");
const UserBadge = require("../models/userBadge");
const ShopItem = require("../models/shopItem");
const UserItem = require("../models/userItem");

// Get current user
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    })
    .catch((err) => res.status(500).send({ err, message: "Server error" }));
};

// Create a new User (register)
const createUser = async (req, res) => {
  try {
    const { username, avatar, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      avatar,
      email,
      password: hash,
    });

    const achievements = await Achievement.find();

    const userAchievements = achievements.map((achievement) => ({
      userId: user._id,
      achievementId: achievement._id,
      progress: 0,
      completed: false,
    }));

    await UserAchievement.insertMany(userAchievements);

    const badges = await Badge.find();

    const userBadges = badges.map((badge) => ({
      userId: user._id,
      badgeId: badge._id,
      unlocked: false,
    }));

    await UserBadge.insertMany(userBadges);

    const shopItems = await ShopItem.find();
    const userItems = shopItems.map((item) => ({
      userId: user._id,
      itemId: item._id,
      quantity: 0,
      acquiredAt: null,
    }));
    await UserItem.insertMany(userItems);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(201).send({
      token,
      user: userWithoutPassword,
      // Mainly for visualization, can be taken out when everything works
      achievements: userAchievements.map((ua) => ({
        _id: ua._id,
        achievement: ua.achievementId,
        progress: ua.progress,
        completed: ua.completed,
      })),
      badges: userBadges.map((ub) => ({
        _id: ub._id,
        badge: ub.badgeId,
        unlocked: ub.unlocked,
      })),
      items: userItems.map((ui) => ({
        _id: ui._id,
        item: ui.shopItemId,
        quantity: ui.quantity,
        acquiredAt: ui.acquiredAt,
      })),
    });
  } catch (err) {
    console.error("Error in createUser:", err);
    if (err.code === 11000)
      return res.status(409).send({ message: "Email already exists" });
    res.status(400).send({ message: "Invalid data" });
  }
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      const userWithoutPassword = user.toObject();
      delete userWithoutPassword.password;

      res.send({ token, user: userWithoutPassword });
    })
    .catch(() => {
      res.status(401).send({ message: "Incorrect email or password" });
    });
};

// Update current user
const updateCurrentUser = (req, res) => {
  const { avatar, username } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { avatar, username },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    })
    .catch((err) => res.status(400).send({ err, message: "Invalid data" }));
};

const updateUserStats = (req, res) => {
  const userId = req.user._id;
  const { xp, level, gems, streak } = req.body;

  User.findByIdAndUpdate(
    userId,
    { xp, level, gems, streak },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) return res.status(404).send({ message: "User not found" });
      res.send(user);
    })
    .catch((err) => res.status(400).send({ message: "Invalid data" }));
};

module.exports = {
  getCurrentUser,
  createUser,
  loginUser,
  updateCurrentUser,
  updateUserStats,
};
