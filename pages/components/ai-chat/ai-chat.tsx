"use client";
import React, { useEffect, useState } from "react";
import Message from "../message/message";
import styles from "./ai-chat.module.css";
import TopNav from "../top-nav/top-nav";
import useSWR, { mutate } from "swr";

interface ChatMessage {
  text: string;
  isUser: boolean;
}

const AiChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSending, setIsSending] = useState(false); // Track if a request is being sent
  const [userInput, setUserInput] = useState("");

  const { data, error, isLoading } = useSWR(
    isSending ? "/api/chat" : null, // Use isSending flag to trigger the API request
    async (url) => {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      return data;
    }
  );

  if (error) {
    console.error("Error:", error);
    return;
  }

  useEffect(() => {
    // When data is received from the API, add it to the messages
    if (!isLoading && data) {
      const aiMessage: ChatMessage = {
        text: data.message || "",
        isUser: false,
      };
      setMessages((prevMessages) => {
        //filter out thinking message as data is recieved.
        prevMessages = prevMessages.filter((message) =>
          !message.text.includes("Thinking")
        );
        return [...prevMessages, aiMessage];
      });
      setIsSending(false); // Reset the sending flag
      mutate("/api/chat", null, false); //reset the data var without calling the api using mutate.
    } else if (isLoading) {
      //when data is loading display Thinking message.
      const thinkingMessage: ChatMessage = {
        text: `Thinking`,
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
    }
  }, [data, isLoading ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;
    const newMessage: ChatMessage = {
      text: inputValue,
      isUser: true, // This message is from the user
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsSending(true); // Set the sending flag to true.The API request will be triggered by the SWR hook due to isSending being true.
    setUserInput(inputValue);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Include the Top Navbar component */}
      <TopNav />
      <div className={styles.messageContainer}>
        {messages.map((message, index) => (
          <Message key={index} text={message.text} isUser={message.isUser} />
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.inputText}
          type="text"
          placeholder="Your input goes here"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress} // Handle Enter key press
        />
        {!isLoading ? (
          <button className={styles.sendButton} onClick={handleSendMessage}>
            Send
          </button>
        ) : (
          <button className={styles.sendButton} disabled>
            Sending...
          </button>
        )}
      </div>
    </>
  );
};

export default AiChat;
