// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import * as signalR from "@microsoft/signalr";
// import { Box, Typography, IconButton, useTheme, CircularProgress } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useGetMessagesQuery } from "../../app/services/DZJobsApi";

// const Chat: React.FC = () => {
//   const { jobId, senderId, receiverId } = useParams<{ jobId: string; senderId: string; receiverId: string }>();
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === "dark";
//   const messagesEndRef = useRef<HTMLDivElement>(null); 

//   const [messages, setMessages] = useState<any[]>([]);
//   const [message, setMessage] = useState("");
//   const { data: initialMessages, isLoading } = useGetMessagesQuery({
//     jobId: Number(jobId),
//     userId: senderId ?? "",
//     receiverId: receiverId ?? "",
//   });

//   const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

//   useEffect(() => {
//     const newConnection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7078/chatHub")
//       .withAutomaticReconnect()
//       .build();

//     setConnection(newConnection);

//     const startConnection = async () => {
//       try {
//         await newConnection.start();
//         console.log("Connected to SignalR");
//       } catch (error) {
//         console.error("Error connecting to SignalR:", error);
//         setTimeout(startConnection, 5000);
//       }
//     };

//     startConnection();

//     newConnection.on("ReceiveMessage", (_jobId, sender, content) => {
//       setMessages((prev) => [...prev, { senderId: sender, content }]);
//       scrollToBottom();
//     });

//     return () => {
//       newConnection.stop();
//     };
//   }, []);

//   useEffect(() => {
//     if (initialMessages) setMessages(initialMessages);
//   }, [initialMessages]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async () => {
//     if (!connection || connection.state !== signalR.HubConnectionState.Connected) {
//       console.error("SignalR connection is not established. Retrying...");
//       return;
//     }

//     try {
//       const newMessage = { senderId, content: message };
//       setMessages((prev) => [...prev, newMessage]);

//       await connection.invoke("SendMessage", Number(jobId), senderId, receiverId, message);

//       setMessage(""); 
//       scrollToBottom();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const scrollToBottom = () => {
//     setTimeout(() => {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }, 100);
//   };

//   return (
//     <Box
//       sx={{
//         p: 2,
//         maxWidth: "700px",
//         margin: "auto",
//         display: "flex",
//         flexDirection: "column",
//         height: "80vh",
//         bgcolor: isDarkMode ? "#121212" : "#fff",
//         borderRadius: "12px",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//       }}
//     >


//       {/* Message List */}
//       <Box
//         sx={{
//           flexGrow: 1,
//           overflowY: "auto",
//           display: "flex",
//           flexDirection: "column",
//           gap: 1,
//           p: 1,
//           "::-webkit-scrollbar": { width: "5px" },
//           "::-webkit-scrollbar-thumb": { background: "#888", borderRadius: "10px" },
//         }}
//       >
//         {isLoading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           messages.map((msg, index) => (
//             <Box
//               key={index}
//               sx={{
//                 display: "flex",
//                 justifyContent: msg.senderId === senderId ? "flex-end" : "flex-start",
//                 animation: "fadeIn 0.3s ease-in-out",
//               }}
//             >
//               <Typography
//                 sx={{
//                   backgroundColor: msg.senderId === senderId
//                     ? isDarkMode
//                       ? "#005f56"
//                       : "#d1e7dd"
//                     : isDarkMode
//                     ? "#3b3b3b"
//                     : "#f8d7da",
//                   padding: "10px 15px",
//                   borderRadius: "20px",
//                   maxWidth: "75%",
//                   color: isDarkMode ? "#fff" : "black",
//                   wordBreak: "break-word",
//                   boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
//                   transition: "background-color 0.3s ease",
//                   "&:hover": {
//                     backgroundColor: msg.senderId === senderId
//                       ? isDarkMode
//                         ? "#00897b"
//                         : "#b8d6b3"
//                       : isDarkMode
//                       ? "#5c5c5c"
//                       : "#f1c2b5",
//                   },
//                 }}
//                 dangerouslySetInnerHTML={{ __html: msg.content }} 
//               />
//             </Box>
//           ))
//         )}
//         <div ref={messagesEndRef} />
//       </Box>

//       {/* Input Section */}
//       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}>
//         <Box sx={{ flexGrow: 1 }}>
//           <ReactQuill
//             value={message}
//             onChange={setMessage}
//             theme="snow"
//             placeholder="Type a message..."
//             style={{
//               backgroundColor: isDarkMode ? "#1e1e1e" : "#fff",
//               color: isDarkMode ? "#fff" : "#000",
//               borderRadius: "8px",
//               minHeight: "100px",
//             }}
//             modules={{
//               toolbar: [
//                 ["bold", "italic", "underline"],
//                 [{ list: "ordered" }, { list: "bullet" }],
//                 ["link", "image"],
//               ],
//             }}
//           />
//         </Box>

//         {/* Send Button */}
//         <IconButton
//           onClick={handleSendMessage}
//           color="primary"
//           sx={{
//             backgroundColor: isDarkMode ? "#00897b" : "#00796b",
//             borderRadius: "50%",
//             padding: "10px",
//             "&:hover": { backgroundColor: isDarkMode ? "#00695c" : "#004d40" },
//           }}
//         >
//           <SendIcon sx={{ color: "#fff" }} />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// };

// export default Chat;
