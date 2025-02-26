'use client'
import React, { useState, useRef, useEffect, FormEvent } from 'react'
import styles from './chatbot.module.scss'
import { poppins, montserrat } from '../fonts/fonts'
import { FaPaperPlane, FaRobot, FaUser, FaMapMarkedAlt, FaInfoCircle, FaGlobeAmericas, FaUmbrellaBeach, FaMountain, FaCity, FaUtensils, FaTrash } from 'react-icons/fa'
import Link from 'next/link'
import { useChat } from 'ai/react'
import ReactMarkdown from 'react-markdown'

type Message = {
  id: string
  content: string
  sender: 'user' | 'bot'
  timestamp: Date
}

type ExploreCard = {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  prompt: string
}

const ChatBot: React.FC = () => {
  // Use the useChat hook from the ai/react library
  const { messages: aiMessages, input, handleInputChange, handleSubmit, isLoading, setInput, setMessages: setAiMessages } = useChat()
  
  // Convert AI messages to our format
  const [displayMessages, setDisplayMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI travel assistant. Where would you like to go?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  
  // Update our messages when AI messages change
  useEffect(() => {
    if (aiMessages.length > 0) {
      const formattedMessages: Message[] = aiMessages.map(msg => ({
        id: msg.id,
        content: msg.content,
        sender: msg.role === 'user' ? 'user' : 'bot',
        timestamp: new Date()
      }))
      
      // Combine with our welcome message
      setDisplayMessages([
        {
          id: '1',
          content: 'Hello! I\'m your AI travel assistant. Where would you like to go?',
          sender: 'bot',
          timestamp: new Date()
        },
        ...formattedMessages
      ])
    }
  }, [aiMessages])
  
  const [activeTab, setActiveTab] = useState('chat')
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayMessages])
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent<HTMLFormElement>)
    }
  }
  
  // Clear chat history
  const handleClearChat = () => {
    setShowClearConfirm(true)
  }
  
  const confirmClearChat = () => {
    // Clear AI messages
    setAiMessages([])
    
    // Reset to just the welcome message
    setDisplayMessages([
      {
        id: '1',
        content: 'Hello! I\'m your AI travel assistant. Where would you like to go?',
        sender: 'bot',
        timestamp: new Date()
      }
    ])
    
    setShowClearConfirm(false)
  }
  
  const cancelClearChat = () => {
    setShowClearConfirm(false)
  }
  
  // Format message content for better readability
  const formatMessageContent = (content: string) => {
    // Only format day headers prominently, leave everything else as plain text
    let formattedContent = content
      // Format day headers as h2
      .replace(/Day \d+:/gi, match => `\n## ${match}\n`)
      // Add line breaks before bullet points for better spacing
      .replace(/•/g, '\n•')
      // Add spacing between paragraphs for better readability
      .replace(/\n\n/g, '\n\n')
      // Ensure consistent spacing after periods
      .replace(/\.([A-Z])/g, '. $1');
      
    return formattedContent;
  }
  
  // Explore cards data
  const exploreCards: ExploreCard[] = [
    {
      id: 'beach',
      title: 'Beach Getaway',
      description: 'Relax on sandy beaches with crystal clear waters',
      icon: <FaUmbrellaBeach className={styles.exploreCardIcon} />,
      prompt: 'Create a 3-day beach vacation itinerary for a relaxing getaway with swimming, sunbathing, and seafood dining.'
    },
    {
      id: 'mountain',
      title: 'Mountain Adventure',
      description: 'Explore hiking trails and breathtaking views',
      icon: <FaMountain className={styles.exploreCardIcon} />,
      prompt: 'Plan a 4-day mountain trip with hiking, scenic viewpoints, and outdoor activities.'
    },
    {
      id: 'city',
      title: 'City Exploration',
      description: 'Discover urban attractions, museums, and nightlife',
      icon: <FaCity className={styles.exploreCardIcon} />,
      prompt: 'Design a 3-day city tour covering major attractions, museums, shopping, and local cuisine.'
    },
    {
      id: 'food',
      title: 'Culinary Journey',
      description: 'Experience local cuisines and food markets',
      icon: <FaUtensils className={styles.exploreCardIcon} />,
      prompt: 'Create a food-focused 3-day itinerary with local restaurants, food markets, and culinary experiences.'
    },
    {
      id: 'world',
      title: 'World Wonders',
      description: 'Visit iconic landmarks and historical sites',
      icon: <FaGlobeAmericas className={styles.exploreCardIcon} />,
      prompt: 'Plan a trip to see famous world landmarks and historical sites with detailed daily activities.'
    }
  ];
  
  // Handle clicking on an explore card
  const handleExploreCardClick = (prompt: string) => {
    setInput(prompt);
    setActiveTab('chat');
    // Optional: auto-submit the prompt
    // setTimeout(() => {
    //   handleSubmit({ preventDefault: () => {} } as React.FormEvent);
    // }, 100);
  };
  
  return (
    <div className={`${styles.chatbotContainer} ${poppins.className}`}>
      {/* Modal popup for clear confirmation */}
      {showClearConfirm && (
        <div className={styles.modalOverlay} onClick={cancelClearChat}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              Clear Chat History
            </div>
            <div className={styles.modalBody}>
              <p>Are you sure you want to clear the chat history? This action cannot be undone.</p>
            </div>
            <div className={styles.modalButtons}>
              <button className={styles.cancelButton} onClick={cancelClearChat}>
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={confirmClearChat}>
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.gradient}>Itinerary</span>GPT
        </div>
        
        <nav className={styles.nav}>
          <button 
            className={`${styles.navButton} ${activeTab === 'chat' ? styles.active : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <FaRobot /> <span>Chat</span>
          </button>
          <button 
            className={`${styles.navButton} ${activeTab === 'explore' ? styles.active : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <FaMapMarkedAlt /> <span>Explore</span>
          </button>
        </nav>
        
        <div className={styles.sidebarFooter}>
          <Link href="/landing-page" className={styles.backLink}>
            <FaInfoCircle /> <span>Back to Home</span>
          </Link>
        </div>
      </div>
      
      <div className={styles.mainContent}>
        {activeTab === 'chat' ? (
          <>
            <header className={styles.chatHeader}>
              <div>
                <h1>Travel Assistant</h1>
                <p>Ask me anything about planning your trip</p>
              </div>
              <button 
                className={styles.clearChatButton}
                onClick={handleClearChat}
                title="Clear chat history"
              >
                <FaTrash />
              </button>
            </header>
            
            <div className={styles.messagesContainer}>
              {displayMessages.map(message => (
                <div 
                  key={message.id} 
                  className={`${styles.message} ${message.sender === 'user' ? styles.userMessage : styles.botMessage}`}
                >
                  <div className={styles.messageIcon}>
                    {message.sender === 'user' ? <FaUser /> : <FaRobot />}
                  </div>
                  <div className={styles.messageContent}>
                    {message.sender === 'user' ? (
                      <div className={styles.messageText}>{message.content}</div>
                    ) : (
                      <div className={`${styles.messageText} ${styles.botMessageText}`}>
                        <ReactMarkdown>
                          {formatMessageContent(message.content)}
                        </ReactMarkdown>
                      </div>
                    )}
                    <div className={styles.messageTime}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className={`${styles.message} ${styles.botMessage}`}>
                  <div className={styles.messageIcon}>
                    <FaRobot />
                  </div>
                  <div className={styles.messageContent}>
                    <div className={`${styles.messageText} ${styles.typingIndicator}`}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <form className={styles.inputContainer} onSubmit={handleSubmit}>
              <textarea
                className={styles.inputField}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Ask about your trip..."
                rows={1}
                disabled={isLoading}
              />
              <button 
                className={styles.sendButton} 
                type="submit"
                disabled={input.trim() === '' || isLoading}
              >
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className={styles.exploreContainer}>
            <header className={styles.exploreHeader}>
              <h1>Explore Trip Ideas</h1>
              <p>Select a template to get started with your travel planning</p>
            </header>
            
            <div className={styles.exploreGrid}>
              {exploreCards.map(card => (
                <div 
                  key={card.id}
                  className={styles.exploreCard}
                  onClick={() => handleExploreCardClick(card.prompt)}
                >
                  <div className={styles.exploreCardIconContainer}>
                    {card.icon}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatBot
