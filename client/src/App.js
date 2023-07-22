import React, { useContext } from "react";
import { SocketContext } from "./Context";

import Peers from "./components/peers";
import Chat from "./components/chat";
import RoomForm from "./components/roomForm";

const App = () => {
    const { joinRoom, socket, currentRoom, socketClient, roomId, setRoomId } =
        useContext(SocketContext);

    const handleJoinRoom = () => {
        joinRoom(roomId, socketClient);
    };

    const createRoom = (roomId) => {
        if (socket) {
            socket.emit("create_room", roomId, (created) => {
                if (created) {
                    setRoomId(roomId);
                    joinRoom(roomId, socketClient);
                } else {
                    console.error("Room creation failed");
                }
            });
        }
    };

    return (
        <>
            {!currentRoom ? (
                <RoomForm
                    roomId={roomId}
                    setRoomId={setRoomId}
                    handleJoinRoom={handleJoinRoom}
                    createRoom={createRoom}
                />
            ) : (
                <>
                    <Peers />
                    <Chat roomId={currentRoom} id="chat" />
                </>
            )}
        </>
    );
};

export default App;
