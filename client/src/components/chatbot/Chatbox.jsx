// import { useState } from "react";

// export default function Chatbot() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { type: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");
//     const response = await fetch("http://localhost:5000/api/chatbot", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ query: input }),
//     });


//     const data = await response.json();
//     setMessages((prev) => [...prev, { type: "bot", text: data.reply }]);
//   };

//   return (
//     <>
//       <div
//         className="fixed bottom-20 right-5 z-50"
//         style={{ display: isOpen ? "block" : "none" }}
//       >
//         <div className="bg-white shadow-xl rounded-xl w-80 h-96 p-4 flex flex-col">
//           <div className="flex-grow overflow-y-auto space-y-2">
//             {messages.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`p-2 rounded ${
//                   msg.type === "user" ? "bg-blue-200 self-end" : "bg-gray-200"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>
//           <div className="mt-2 flex">
//             <input
//               className="flex-grow p-2 border rounded-l"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask me anything..."
//               onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             />
//             <button
//               className= "bg-red-600 text-white px-4 rounded-r"
//               onClick={handleSend}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>

//       <button
//         className="fixed bottom-5 right-5 bg-red-600 text-white rounded-full w-14 h-14 text-2xl shadow-lg"
//         onClick={() => setIsOpen(!isOpen)}
//         title="Chatbot"
//       >
//         💬
//       </button>
//     </>
//   );
// }


import { useState, useEffect } from "react";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Welcome message when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          type: "bot",
          text: "Hello! How can I help you today?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async (inputText) => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Simulate network delay for typing indicator
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const response = await fetch("https://movie-ticket-booking-0igc.onrender.com/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: inputText }),
      });

      const data = await response.json();
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: data.reply || "Sorry, I couldn't process your request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
        console.error("Error in fetching chatbot response:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
        isError: true,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <ChatWindow
          messages={messages}
          isTyping={isTyping}
          onSend={handleSend}
          onClose={toggleChat}
        />
      )}
      <ChatButton isOpen={isOpen} onClick={toggleChat} />
    </>
  );
};

export default Chatbot;
