import React, { useContext } from "react";

import { SocketContext } from "../Context";

function UsersInfo({ userId }) {
    const { usersInfo } = useContext(SocketContext);

    const user = usersInfo[userId];

    if (!user) {
        return null;
    }

    const { name, color } = user;

    return <div style={{ color: color }}>{name}</div>;
}

export default UsersInfo;
