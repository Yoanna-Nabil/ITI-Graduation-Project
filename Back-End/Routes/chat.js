const express = require("express");
const { protectedChat } = require("../middleware/protectedChat");
const {
  createConvertionWithAdmins,
  createConvertionWithUser,
  getConversinsForEveryAdmin,
  endConversation,
  getUserMessages,
  getAdminMessages,
} = require("../contolers/chatController");
const router = express.Router();
router.post("/", protectedChat, createConvertionWithAdmins);
router.post("/:idUser", protectedChat, createConvertionWithUser);
router.delete("/endConversation/:id", protectedChat, endConversation);
router.get("/getSelfAdmin", protectedChat, getConversinsForEveryAdmin);
router.get("/getMessages", protectedChat, getUserMessages);
router.get("/getMessages/:id", protectedChat, getAdminMessages);

module.exports = router;
