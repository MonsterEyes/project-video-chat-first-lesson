import { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
    const [me, setMe] = useState("");
    const [socketClient, setSocketClient] = useState(null);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomId, setRoomId] = useState("");
    const [usersInfo, setUsersInfo] = useState({});

    useEffect(() => {
        const clientSocket = io("http://localhost:3000");
        setSocketClient(clientSocket);

        clientSocket.on("me", (id) => setMe(id));

        clientSocket.on("user_data", (data) => {
            setUsersInfo((prev) => ({ ...prev, ...data }));
        });

        return () => {
            if (clientSocket) {
                clientSocket.disconnect();
            }
        };
    }, []);

    const createRoom = (roomId) => {
        console.log("Creating room:", roomId);
        if (socketClient) {
            socketClient.emit("create_room", roomId);
            joinRoom(roomId);
        }
    };

    const joinRoom = (roomId) => {
        console.log("Joining room:", roomId);
        setCurrentRoom(roomId);

        if (socketClient) {
            socketClient.emit("join_room", roomId);
        }
    };

    return (
        <SocketContext.Provider
            value={{
                me,
                socketClient,
                setSocketClient,
                joinRoom,
                createRoom,
                roomId,
                setRoomId,
                currentRoom,
                setCurrentRoom,
                usersInfo,
                setUsersInfo,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export { ContextProvider, SocketContext };
