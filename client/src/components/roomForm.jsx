import React from "react";

const RoomForm = ({ roomId, setRoomId, handleJoinRoom, createRoom }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        handleJoinRoom();
    };

    return (
        <form onSubmit={handleSubmit} id="room-form">
            <h2>Join the Room or Create a New One</h2>
            <input
                type="text"
                placeholder="Enter room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
            />
            <button type="submit">Join Room</button>
            <button type="button" onClick={() => createRoom(roomId)}>
                Create Room
            </button>
        </form>
    );
};

export default RoomForm;
