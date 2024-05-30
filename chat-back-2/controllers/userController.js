const AudioCall = require("../models/audioCall");
const FriendRequest = require("../models/friendRequest");
const User = require("../models/user");
const VideoCall = require("../models/videoCall");
const Conversation = require("../models/conversation");
const catchAsync = require("../utils/catchAsync");
const sanitizeObject = require("../utils/sanitizeObject");

/*
const { generateToken04 } = require("./zegoServerAssistant");

// Please change appID to your appId, appid is a number
// Example: 1234567890
const appID = process.env.ZEGO_APP_ID; // type: number

// Please change serverSecret to your serverSecret, serverSecret is string
// Example：'sdfsdfsd323sdfsdf'
const serverSecret = process.env.ZEGO_SERVER_SECRET; // type: 32 byte length string

exports.getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const sanitizedObject = sanitizeObject(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );

  const userDoc = await User.findByIdAndUpdate(req.user._id, sanitizedObject);

  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "User Updated successfully",
  });
});

exports.getUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find({
    verified: true,
  }).select("firstName lastName _id");

  const thisUser = req.user;

  const remainingUsers = allUsers.filter(
    (user) =>
      !thisUser.friends.includes(user._id) &&
      user._id.toString() !== thisUser._id.toString()
  );

  res.status(200).json({
    status: "success",
    data: remainingUsers,
    message: "Users found successfully!",
  });
});

exports.getAllVerifiedUsers = catchAsync(async (req, res, next) => {
  const allUsers = await User.find({
    verified: true,
  }).select("firstName lastName _id");

  const remainingUsers = allUsers.filter(
    (user) => user._id.toString() !== req.user._id.toString()
  );

  res.status(200).json({
    status: "success",
    data: remainingUsers,
    message: "Users found successfully!",
  });
});

exports.getAllFriendRequests = catchAsync(async (req, res, next) => {
  const friendRequests = await FriendRequest.find({ recipient: req.user._id })
    .populate("sender")
    .select("_id firstName lastName");

  res.status(200).json({
    status: "success",
    data: friendRequests,
    message: "Requests found successfully!",
  });
});


/!**
 * Authorization authentication token generation
 *!/

exports.generateZegoToken = catchAsync(async (req, res, next) => {
  try {
    const { userId, roomId } = req.body;

    const effectiveTimeInSeconds = 3600; //type: number; unit: s; token expiration time, unit: second
    const payloadObject = {
      roomId, // Please modify to the user's roomID
      // The token generated allows loginRoom (login room) action
      // The token generated in this example allows publishStream (push stream) action
      privilege: {
        1: 1, // loginRoom: 1 pass , 0 not pass
        2: 1, // publishStream: 1 pass , 0 not pass
      },
      streamIdList: null,
    }; //
    const payload = JSON.stringify(payloadObject);
    // Build token
    const token = generateToken04(
      appID * 1, // APP ID NEEDS TO BE A NUMBER
      userId,
      serverSecret,
      effectiveTimeInSeconds,
      payload
    );
    res.status(200).json({
      status: "success",
      message: "Token generated successfully",
      token,
    });
  } catch (err) {
    console.log(err);
  }
});

exports.startAudioCall = catchAsync(async (req, res, next) => {
  const from = req.user._id;
  const to = req.body.id;

  const fromUser = await User.findById(from);
  const toUser = await User.findById(to);

  // create a new call audioCall Doc and send required data to client
  const newAudioCall = await AudioCall.create({
    participants: [from, to],
    from,
    to,
    status: "Ongoing",
  });

  res.status(200).json({
    data: {
      from: toUser,
      roomID: newAudioCall._id,
      streamID: to,
      userID: from,
      userName: from,
    },
  });
});

exports.startVideoCall = catchAsync(async (req, res, next) => {
  const from = req.user._id;
  const to = req.body.id;

  const fromUser = await User.findById(from);
  const toUser = await User.findById(to);

  // create a new call videoCall Doc and send required data to client
  const newVideoCll = await VideoCall.create({
    participants: [from, to],
    from,
    to,
    status: "Ongoing",
  });

  res.status(200).json({
    data: {
      from: toUser,
      roomID: newVideoCll._id,
      streamID: to,
      userID: from,
      userName: from,
    },
  });
});

exports.getCallLogs = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const callLogs = [];

  const audioCalls = await AudioCall.find({
    participants: { $all: [userId] },
  }).populate("from to");

  const videoCalls = await VideoCall.find({
    participants: { $all: [userId] },
  }).populate("from to");

  for (let elm of audioCalls) {
    const missed = elm.verdict !== "Accepted";
    if (elm.from._id.toString() === userId.toString()) {
      const otherUser = elm.to;

      // outgoing
      callLogs.push({
        id: elm._id,
        img: otherUser.avatar,
        name: otherUser.firstName,
        online: true,
        incoming: false,
        missed,
      });
    } else {
      // incoming
      const otherUser = elm.from;

      // outgoing
      callLogs.push({
        id: elm._id,
        img: otherUser.avatar,
        name: otherUser.firstName,
        online: true,
        incoming: false,
        missed,
      });
    }
  }

  for (let element of videoCalls) {
    const missed = element.verdict !== "Accepted";
    if (element.from._id.toString() === userId.toString()) {
      const otherUser = element.to;

      // outgoing
      callLogs.push({
        id: element._id,
        img: otherUser.avatar,
        name: otherUser.firstName,
        online: true,
        incoming: false,
        missed,
      });
    } else {
      // incoming
      const otherUser = element.from;

      // outgoing
      callLogs.push({
        id: element._id,
        img: otherUser.avatar,
        name: otherUser.firstName,
        online: true,
        incoming: false,
        missed,
      });
    }
  }

  res.status(200).json({
    status: "success",
    message: "Call Logs Found successfully!",
    data: callLogs,
  });
});


*/





/* starting new code */


exports.getIndividualConversations = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Fetch all individual conversations where the current user is a participant
  const conversations = await Conversation.find({
    participants: { $all: [userId] },
    $expr: { $eq: [{ $size: "$participants" }, 2] } // Ensure exactly 2 participants
  })
      .populate('participants', 'firstName lastName avatar status') // Populate participants' details
      .populate('messages.sender', 'firstName lastName avatar status') // Populate messages' sender details
      .sort({ 'messages.createdAt': -1 }); // Sort by the most recent message


  // Respond with the fetched conversations
  res.status(200).json({
    status: 'success',
    data: conversations
  });
});


exports.getGroupConversations = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Fetch all group conversations where the current user is a participant
  const conversations = await Conversation.find({
    participants: { $all: [userId] },
    $expr: { $gt: [{ $size: "$participants" }, 2] } // Ensure more than 2 participants
  })
      .populate('participants', 'firstName lastName avatar status') // Populate participants' details
      .populate('messages.sender', 'firstName lastName avatar status') // Populate messages' sender details
      .sort({ 'messages.createdAt': -1 }); // Sort by the most recent message


  // Respond with the fetched conversations
  res.status(200).json({
    status: 'success',
    data: conversations
  });
});


exports.getCalls = catchAsync(async (req, res, next) => {

});

exports.getFriendRequests = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Fetch all friend requests where the current user is either the sender or the recipient
  const friendRequests = await FriendRequest.find({
    $or: [{ sender: userId }, { recipient: userId }]
  })
      .populate('sender', 'firstName lastName avatar') // Populate sender's details
      .populate('recipient', 'firstName lastName avatar') // Populate recipient's details
      .sort({ createdAt: -1 }); // Sort by the most recent request


  // Respond with the fetched friend requests
  res.status(200).json({
    status: 'success',
    data: friendRequests
  });
});

exports.getFriends = catchAsync(async (req, res, next) => {
  const thisUser = await User.findById(req.user._id).populate(
      "friends",
      "_id avatar firstName lastName status"
  );
  res.status(200).json({
    status: "success",
    data: thisUser.friends,
    message: "Friends found successfully!",
  });
});

exports.getCurrentConversationMessages = catchAsync(async (req, res, next) => {
  const conversationId = req.params.conversationId; // Get the conversationId from the URL parameters

// Fetch the conversation from the database using the conversationId and populate the sender field
  const conversation = await Conversation.findById(conversationId).populate('messages.sender', '_id');

  if (!conversation) {
    return;
  }


  // Send the conversation messages as the response
  res.status(200).json({
    status: 'success',
    message: 'Conversation messages retrieved',
    data: conversation.messages
  });

});


exports.getMutualFriends = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  // Find the user's friends
  const user = await User.findById(userId).populate('friends');

  if (!user) {
    res.status(404).json({
      status: 'error',
      message: 'User not found',
    });
    return;
  }

  const userFriends = user.friends.map(friend => friend._id);

  // Find mutual friends
  const mutualFriends = await User.aggregate([
    { $match: { _id: { $in: userFriends } } },
    { $unwind: '$friends' },
    { $match: { friends: { $in: userFriends, $ne: userId } } },
    { $group: { _id: '$friends' } },
    { $match: { _id: { $nin: userFriends } } }, // Ensure no already-friends are included
    { $limit: 10 }
  ]);

  let mutualFriendsIds = mutualFriends.map(friend => friend._id);

  // If there aren't enough mutual friends, fill with random users
  if (mutualFriendsIds.length < 10) {
    const additionalUsers = await User.aggregate([
      { $match: { _id: { $nin: [...userFriends, userId] } } },
      { $sample: { size: 10 - mutualFriendsIds.length } }
    ]);

    mutualFriendsIds = [...mutualFriendsIds, ...additionalUsers.map(user => user._id)];
  }

  // Fetch the user details of the selected user IDs
  const finalUsers = await User.find({ _id: { $in: mutualFriendsIds } });

  console.log(finalUsers);
  res.status(200).json({
    status: 'success',
    data: finalUsers,
    message: 'Friends found successfully!',
  });
});







