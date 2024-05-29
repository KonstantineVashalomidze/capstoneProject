import io from "socket.io-client";


let socket;


const connectSocket = (userId) => {
    socket = io("http://localhost:3001", {
        query: `userId=${userId}`
    });
};

export {socket, connectSocket };












