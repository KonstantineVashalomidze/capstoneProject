import { faker } from "@faker-js/faker";
import {
  Chats,
  Gear,
  GearSix,
  Phone,
  SignOut,
  User,
  Users,
} from "phosphor-react";

const Profile_Menu = [
  {
    index: 5,
    title: "Profile",
    icon: <User />,
  },
  {
    index: 6,
    title: "Settings",
    icon: <Gear />,
  },
  {
    index: 7,
    title: "Sign Out",
    icon: <SignOut />,
  },
];

const Nav_Buttons = [
  {
    index: 0,
    icon: <Chats />,
    selectedIcon: "individual",
  },
  {
    index: 1,
    icon: <Users />,
    selectedIcon: "group",
  },
  {
    index: 2,
    icon: <Phone />,
    selectedIcon: "calls",
  },
];

const Nav_Setting = [
  {
    index: 3,
    icon: <GearSix />,
    selectedIcon: "settings",
  },
];

const ChatList = [
  {
    id: 0,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "9:36",
    unread: 0,
    pinned: true,
    online: true,
  },
  {
    id: 1,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "12:02",
    unread: 2,
    pinned: true,
    online: false,
  },
  {
    id: 2,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "10:35",
    unread: 3,
    pinned: false,
    online: true,
  },
  {
    id: 3,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "04:00",
    unread: 0,
    pinned: false,
    online: true,
  },
  {
    id: 4,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 5,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 6,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
  {
    id: 7,
    img: faker.image.avatar(),
    name: faker.name.firstName(),
    msg: faker.music.songName(),
    time: "08:42",
    unread: 0,
    pinned: false,
    online: false,
  },
];

const Chat_History = [
  {
    type: "msg",
    message: "Hi 👋🏻, How are ya ?",
    incoming: true,
    outgoing: false,
  },
  {
    type: "divider",
    text: "Today",
  },
  {
    type: "msg",
    message: "Hi 👋 Panda, not bad, u ?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Can you send me an abstarct image?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    message: "Ya sure, sending you a pic",
    incoming: true,
    outgoing: false,
  },

  {
    type: "msg",
    subtype: "img",
    message: "Here You Go",
    img: faker.image.abstract(),
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    message: "Can you please send this in file format?",
    incoming: false,
    outgoing: true,
  },
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },
  {
    type: "msg",
    subtype: "reply",
    reply: "This is a reply",
    message: "Yep, I can also do that",
    incoming: false,
    outgoing: true,
  },
];

const Message_options = [
  {
    title: "Reply",
  },
  {
    title: "React to message",
  },
  {
    title: "Forward message",
  },
  {
    title: "Star message",
  },
  {
    title: "Report",
  },
  {
    title: "Delete Message",
  },
];


const Shared_links = [

  {
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "link",
    preview: faker.image.cats(),
    message: "Yep, I can also do that",
    incoming: true,
    outgoing: false,
  },

];


const Shared_documents = [
  {
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },{
    type: "msg",
    subtype: "doc",
    message: "Yes sure, here you go.",
    incoming: true,
    outgoing: false,
  },

];

// Dummy data for autocomplete options
const User_options = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Williams",
  "David Brown",
  "Sarah Davis",
  "Robert Miller",
  "Jessica Wilson",
  "Christopher Moore",
  "Ashley Taylor",
];


const Call_history = [

    { id: 0, name: 'John Doe', img: faker.image.avatar(), callTime: new Date().getTime() - (2 * 60 * 60 * 1000), incoming: true, missed: false, online: true },
    { id: 1, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: true, missed: false, online: false },
    { id: 2, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: false, missed: true, online: true },
    { id: 3, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: true, missed: true, online: false },
    { id: 4, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: false, missed: false, online: false },
    { id: 5, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: true, missed: true, online: true },
    { id: 6, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: true, missed: true, online: false },
    { id: 7, name: 'Jane Smith', img: faker.image.avatar(), callTime: new Date().getTime() - (24 * 60 * 60 * 1000), incoming: false, missed: true, online: false },
    { id: 8, name: 'Bob Johnson', img: faker.image.avatar(), callTime: new Date().getTime() - (5 * 24 * 60 * 60 * 1000), incoming: true, missed: false, online: true },


]





export {
  Profile_Menu,
  Nav_Setting,
  Nav_Buttons,
  ChatList,
  Chat_History,
  Message_options,
  Shared_links,
  Shared_documents,
  User_options,
  Call_history,
};
