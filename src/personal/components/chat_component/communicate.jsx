import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  Component,
} from "react";
import Navbar from "../styling/Navbar";
import axios from "axios";
import FormData from "form-data";

function ChatRoomEntry() {
  const [usersRooms, setUsersRooms] = useState([]);

  const fetchRooms = async () => {
    const response = await axios
      .get(
        "https://single-orca-f1izhs.ziska44n.traefikhub.io/chat/users/rooms",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )

      .then((response) => {
        if (response.data.rooms) {
          setUsersRooms(response.data.rooms);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div>
      <h1>fea</h1>
      <div>
        <h1>rooms</h1>
      </div>
    </div>
  );
}

// function EnteredChatRoom({ RoomID: child }) {
//   let socket = new WebSocket("ws://localhost:8000/chat/chat/ws");

//   const [sendingData, setSendingData] = useState("");

//   socket.onopen = function (e) {
//     console.log("[open] Connection established");
//     console.log("Sending to server");
//   };

//   socket.onmessage = function (event) {
//     console.log(`[message] Data received from server: ${event.data}`);
//   };

//   return (
//     <div>
//       <h1>Chat</h1>
//       <input type="text" id="msg"></input>
//       <input
//         onClick={(e) => {
//           console.log(document.getElementById("msg").value);
//           socket.send(document.getElementById("msg").value);
//         }}
//         type="button"
//       ></input>
//     </div>
//   );
// }

export default ChatRoomEntry;
