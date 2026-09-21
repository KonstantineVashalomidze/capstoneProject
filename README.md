# capstoneProject

A full-stack real-time chat application with text messaging, file/link sharing, friend requests, and audio/video calling.

The project has two parts:

- **chat-front** - React client (Redux Toolkit, MUI, Emoji Mart, VideoSDK for calls)
- **chat-back-2** - Node/Express backend (MongoDB via Mongoose, Socket.IO for real-time events, JWT auth)

## Features

Real-time messaging (text, links with previews, files) over Socket.IO, friend request flow (send/accept/reject), one-to-one audio and video calls, and JWT-based authentication with OTP email verification.

## Project structure

```
chat-back-2/   Express + Socket.IO backend
chat-front/    React frontend
```

## Setup

### Backend (chat-back-2)

```bash
cd chat-back-2
npm install
```

Create a `config.env` file in `chat-back-2/` (this is gitignored - never commit it) with:

```
PORT=3001
DATABASE=<your MongoDB connection string>
DATABASE_PASSWORD=<your MongoDB password>
JWT_SECRET=<a random secret string>
NODE_ENV=development
SENDER_EMAIL=<email used to send OTP/notification mail>
```

Then run:

```bash
npm start
```

### Frontend (chat-front)

```bash
cd chat-front
npm install
npm start
```

Opens on [http://localhost:3000](http://localhost:3000) by default; the backend listens on the port set in `config.env` (3001 by default).

## License

See [LICENSE](LICENSE).
