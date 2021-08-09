import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = ({ location }) => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const ENDPOINT = "localhost:8080";

  useEffect(() => {
    const { room, name } = queryString.parse(location.search);

    setRoom(room);
    setName(name);

    socket = io(ENDPOINT);
    socket.emit("join", { name, room }, (error) => {
      alert(error.error);
    });

    return () => {
      socket.disconnect({ name, room });
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <div>Chat</div>;
};

export default Chat;
