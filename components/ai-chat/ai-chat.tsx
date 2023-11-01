"use client";
import React from "react";
import Message from "../message/message";
import styles from "./ai-chat.module.css";
import { useChat } from "ai/react";

const AiChat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <>
      <div className={styles.messageContainer}>
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.content}
            isUser={message.role == "user"}
          />
        ))}
      </div>
      <form className={styles.inputContainer} onSubmit={handleSubmit}>
        <input
          className={styles.inputText}
          value={input}
          placeholder="Your input goes here..."
          onChange={handleInputChange}
        />
        {!isLoading ? (
          <button type="submit" className={styles.sendButton}>
            Send
          </button>
        ) : (
          <button className={styles.disabledButton} disabled>
            Sending...
          </button>
        )}
      </form>
    </>
  );
};

export default AiChat;
