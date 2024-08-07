"use client";
import React from "react";
import Message from "../message/message";
import styles from "./ai-chat.module.scss";
import { useChat } from "ai/react";
import { MdArrowBack } from "react-icons/md";
import TopNav from "../top-nav/top-nav";

const AiChat: React.FC = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();

  return (
    <main className={styles.ai_chat_container}>
        <TopNav/>
        <div className={styles.messageContainer}>
          <div className={styles.messageWrapper}>
            {messages.map((message) => (
              <Message
                key={message.id}
                text={message.content}
                isUser={message.role == "user"}
              />
            ))}
          </div>
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
    </main>
  );
};

export default AiChat;
