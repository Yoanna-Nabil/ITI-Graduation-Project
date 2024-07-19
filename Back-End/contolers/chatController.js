const converstion = require("../models/converstionModel");
const message = require("../models/messageModel");
const User = require("../models/UserModel");

// const createConvertion = async (req, res) => {

//   const { idUser } = req.params;
//   const { text } = req.body;
//   try {
//     let findAllAdmin = await User.find({ role: "Admin" });
//     let AdminOnly = new Set();
//     findAllAdmin.map((e) => AdminOnly.add(e?._id.toString()));
//     let findConversition = await converstion.findOne({
//       participations: { $in: [idUser, req.id] },
//     });
//     if (!findConversition) {
//       if (req.role !== "Admin") {
//         findConversition = await converstion.create({
//           participations: [req.id, ...Array.from(AdminOnly)],
//           lastMessages: {
//             text: text,
//             sender: req.id,
//           },
//         });
//       } else {
//         findConversition = await converstion.create({
//           participations: [req.id, idUser],
//           lastMessages: {
//             text: text,
//             sender: req.id,
//           },
//           startWithAdmin: true,
//         });
//       }

//       return res.status(201).json({
//         message: "create converstion successfully",
//         data: findConversition,
//       });
//     }
//     const newMessage = await message.create({
//       converstionId: findConversition._id,
//       sender: req.id,
//       text: text,
//     });
//     if (findConversition.startWithAdmin === false) {
//       if (req.role === "Admin") {
//         await findConversition.updateOne({
//           participations: [req.id, idUser],
//           lastMessages: {
//             text: text,
//             sender: req.id,
//             checkEnd: false,
//           },
//           startWithAdmin: true,
//           again: false,
//         });
//       } else {
//         if (findConversition.lastMessages.checkEnd === true) {
//           await findConversition.updateOne({
//             lastMessages: {
//               text: text,
//               sender: req.id,
//               checkEnd: false,
//             },
//             again: true,
//           });
//         }
//       }
//     } else {
//       await findConversition.updateOne({
//         lastMessages: {
//           text: text,
//           sender: req.id,
//         },
//       });
//     }

//     return res.status(201).json({ message: "success", data: newMessage });
//   } catch (error) {
//     return res.status(400).json({ error: error.messages });
//   }
// };

/******
 *  @desc createConvertionWithAdmins
 *  @method post
 */

const createConvertionWithAdmins = async (req, res) => {
  const { text } = req.body;

  try {
    let findAllAdmin = await User.find({ role: "Admin" });
    let adminIds = findAllAdmin.map((admin) => admin._id.toString());

    let findConversition = await converstion.findOne({
      participations: { $in: [req.id] },
    });

    if (!findConversition) {
      findConversition = await converstion.create({
        participations: [req.id, ...adminIds],
        lastMessages: { text: text, sender: req.id },
        startWithAdmin: false,
        checkEnd: false,
      });
      await message.create({
        converstionId: findConversition._id,
        sender: req.id,
        receiver: null,
        text: text,
      });

      return res.status(201).json({
        message: "create converstion successfully",
        data: findConversition,
      });
    }

    await message.create({
      converstionId: findConversition._id,
      sender: req.id,
      receiver: null,
      text: text,
    });

    findConversition = await converstion.findOneAndUpdate(
      { _id: findConversition._id },
      { $set: { "lastMessages.text": text, "lastMessages.sender": req.id } },
      { new: true }
    );

    return res.status(201).json({ message: "success", data: findConversition });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
/******
 *  @desc createConvertionWithUser
 *  @method post
 */
const createConvertionWithUser = async (req, res) => {
  const { idUser } = req.params;
  const { text } = req.body;

  try {
    let findConversition = await converstion.findOne({
      $and: [
        { participations: { $in: [idUser] } },
        { $expr: { $gt: [{ $size: "$participations" }, 2] } },
      ],
    });
    let findConversitionAll = await converstion.findOne({
      participations: { $all: [req.id, idUser] },
    });
    if (findConversition || findConversitionAll) {
      const newMessage = await message.create({
        converstionId: findConversition
          ? findConversition._id
          : findConversitionAll._id,
        sender: req.id,
        receiver: idUser,
        text: text,
      });

      findConversition = await converstion.findOneAndUpdate(
        {
          _id: findConversition
            ? findConversition._id
            : findConversitionAll._id,
        },
        {
          $set: {
            participations: [req.id, idUser],
            "lastMessages.text": text,
            "lastMessages.sender": req.id,
            startWithAdmin: true,
          },
        },
        { new: true }
      );
      return res.status(201).json({
        message: "success",
        data: newMessage,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
/******
 *  @desc endConversation
 *  @method delete
 */
const endConversation = async (req, res) => {
  const { id } = req.params;

  try {
   
    let conversationFind = await converstion.findOne({ _id: id });

    if (!conversationFind) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    await converstion.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ message: "Conversation Deleted successfully" });
  } catch (error) {
    return res.status(400).json(error);
  }
};

/******
 *  @desc getConversinsForEveryAdmin
 *  @method get
 */
const getConversinsForEveryAdmin = async (req, res) => {
  try {
    const conversations = await converstion
      .find({
        $or: [
          {
            $and: [
              { $expr: { $gt: [{ $size: "$participations" }, 2] } },
              { startWithAdmin: false },
              { checkEnd: false },
            ],
          },
          {
            $and: [
              { $expr: { $eq: [{ $size: "$participations" }, 2] } },
              { participations: { $in: [req.id] } },
            ],
          },
        ],
      })
      .populate({ path: "lastMessages.sender", select: "name" });
    return res.status(200).json({
      message: "success",
      data: conversations,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Bad Request",
      error: error.message,
    });
  }
};
/******
 *  @desc getUserMessages
 *  @method get
 */
const getUserMessages = async (req, res) => {
  try {
    const findAllAdmin = await User.find({ role: "Admin" });
    const adminIds = findAllAdmin.map((admin) => admin._id.toString());

    const findMessages = await message
      .find({
        $or: [
          { sender: req.id, receiver: { $in: adminIds } },
          { sender: { $in: adminIds }, receiver: req.id },
          { sender: req.id, receiver: null },
        ],
      })
      .populate({ path: "sender", select: "name" });

    if (findMessages.length === 0) {
      return res.status(200).json({ message: "No messages yet" });
    }

    return res.status(200).json({ data: findMessages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
/******
 *  @desc getAdminMessages
 *  @method get
 */
const getAdminMessages = async (req, res) => {
  const { id } = req.params;
  try {
    const findMessages = await message
      .find({
        $or: [
          { sender: req.id, receiver: id },
          { sender: id, receiver: req.id },
          { sender: id, receiver: null },
        ],
      })
      .populate({ path: "sender", select: "name" });

    if (findMessages.length === 0) {
      return res.status(200).json({ message: "No messages yet" });
    }
    return res.status(200).json({ data: findMessages });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createConvertionWithAdmins,
  createConvertionWithUser,
  getConversinsForEveryAdmin,
  getUserMessages,
  endConversation,
  getAdminMessages,
};
