import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useGetMessagesQuery, useSendMessageMutation } from "../../app/services/DZJobsApi";

interface ChatProps {
  jobId: number;
  senderId: string;
  receiverId: string;
}

const Chat: React.FC<ChatProps> = ({ jobId, senderId, receiverId }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const { data: initialMessages } = useGetMessagesQuery({ jobId, userId: senderId });
  const [sendMessage] = useSendMessageMutation();

  const connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5173/chatHub")
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    connection.start().then(() => console.log("Connected to SignalR"));

    connection.on("ReceiveMessage", (_jobId, senderId, content) => {
      setMessages((prev) => [...prev, { senderId, content }]);
    });

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    if (initialMessages) setMessages(initialMessages);
  }, [initialMessages]);

  const handleSendMessage = async () => {
    await connection.invoke("SendMessage", jobId, senderId, receiverId, message);
    await sendMessage({ sendMessageCommand :{jobId, senderId , receiverId, content: message } });
    setMessage("");
  };

  return (
    <Box>
      {messages.map((msg, index) => (
        <Typography key={index}>{msg.senderId}: {msg.content}</Typography>
      ))}
      <TextField value={message} onChange={(e) => setMessage(e.target.value)} fullWidth />
      <Button onClick={handleSendMessage}>Send</Button>
    </Box>
  );
};

export default Chat;
