const express = require("express");
const router = express.Router();
const {
  SignUP,
  SignIn,
  forgetPassword,
  resetpassword,
} = require("../middleware/authintaction");

const {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
  countUser,
} = require("../contolers/users");
const { protect } = require("../middleware/protecte");
router.get("/", getAllUsers);

router.get("/single/:userId", protect, getUser);
router.post("/", SignUP);
router.delete("/:id", deleteUser);
router.patch("/:id", updateUser);
router.post("/signIn", SignIn);
router.get("/count", countUser);

router.post("/forgetPasword", forgetPassword);
router.post("/resetPasswrod/:token", resetpassword);

module.exports = router;
