// components/Message.tsx
"use client";
import styles from "./message.module.css";
import React, { useState } from "react";

interface MessageProps {
  text: string;
  isUser: boolean;
}

const Message: React.FC<MessageProps> = ({ text, isUser }) => {
  // Apply different classes based on isUser prop
  const messageClass = isUser ? "messageUser" : "messageBot";
  const [dots, setDots] = useState("...");
  const isThinking = text.includes("Thinking");

  return (
    <>
      <div className={`${styles.message} ${styles[`${messageClass}`]}`}>
        <pre className={styles.responseText}>{text}</pre>
      </div>
    </>
  );
};

export default Message;
