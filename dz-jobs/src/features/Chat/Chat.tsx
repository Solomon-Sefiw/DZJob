import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // For dynamic navigation support
import * as signalR from "@microsoft/signalr";
import { TextField, Box, Typography, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send"; // Send icon for the button
import { useGetMessagesQuery } from "../../app/services/DZJobsApi";

const Chat: React.FC = () => {
  const { jobId, senderId, receiverId } = useParams<{ jobId: string; senderId: string; receiverId: string }>();

  // State hooks for messages and input field
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  // Query to fetch initial messages from the API
  const { data: initialMessages } = useGetMessagesQuery({ jobId: Number(jobId), userId: senderId ?? "" ,receiverId: receiverId ?? ""});

  // SignalR connection state
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  // Setting up SignalR connection on mount
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7078/chatHub") // Ensure this is correct based on your backend URL
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    // Function to start the SignalR connection
    const startConnection = async () => {
      try {
        await newConnection.start();
        console.log("Connected to SignalR");
      } catch (error) {
        console.error("Error connecting to SignalR:", error);
        setTimeout(startConnection, 5000); // Retry connection after 5 seconds
      }
    };

    startConnection();

    // Listen for incoming messages from SignalR
    newConnection.on("ReceiveMessage", (_jobId, sender, content) => {
      setMessages((prev) => [...prev, { senderId: sender, content }]);
    });

    // Cleanup: stop the connection when the component unmounts
    return () => {
      newConnection.stop();
    };
  }, []);

  // Update messages when initial messages are loaded
  useEffect(() => {
    if (initialMessages) setMessages(initialMessages);
  }, [initialMessages]);

  // Function to handle sending the message
  const handleSendMessage = async () => {
    if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
      console.error("SignalR connection is not established. Retrying...");
      return;
    }

    try {
      // First, update the UI with the new message (for instant display)
      const newMessage = { senderId, content: message };
      setMessages((prev) => [...prev, newMessage]);

      // Send the message via SignalR (this updates the other user instantly)
      await connection.invoke("SendMessage", Number(jobId), senderId, receiverId, message);

      // Clear the input field after sending the message
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box sx={{ p: 2, maxWidth: "600px", margin: "auto", display: "flex", flexDirection: "column" }}>
      {/* Display the messages */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.senderId === senderId ? "flex-end" : "flex-start",
            }}
          >
            <Typography
              sx={{
                backgroundColor: msg.senderId === senderId ? "#d1e7dd" : "#f8d7da",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "75%",
                color:"black",
                wordBreak: "break-word",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)", // Added shadow for more depth
                transition: "background-color 0.3s ease", // Smooth background color transition on hover
                "&:hover": {
                  backgroundColor: msg.senderId === senderId ? "#b8d6b3" : "#f1c2b5",
                },
              }}
            >
              {msg.content}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Message input field */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          fullWidth
          variant="outlined"
          margin="normal"
          label="Type a message"
          sx={{
            borderRadius: "25px", // Rounded input
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
            },
          }}
        />

        {/* Send button with icon */}
        <IconButton
          onClick={handleSendMessage}
          color="primary"
          sx={{
            backgroundColor: "#00796b", // Attractive send button color
            borderRadius: "50%",
            padding: "10px",
            "&:hover": {
              backgroundColor: "#004d40", // Darken color on hover
            },
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
