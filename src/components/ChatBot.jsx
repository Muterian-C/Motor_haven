import React, { useState, useRef, useEffect } from 'react';
 
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
 
  // Create a reference for the message container to scroll to the bottom
  const messagesEndRef = useRef(null);
  
  // Define possible product questions and responses with more flexible regex
  const responses = [
    {
      regex: /price|cost|how much/i,
      replies: [
        "The product costs $199.99.",
        "It’s priced at $199.99.",
        "The cost of this product is $199.99."
      ]
    },
    {
      regex: /features|what does it do|what are the capabilities/i,
      replies: [
        "This product comes with a high-definition display, long battery life, and built-in AI functionality.",
        "It has wireless charging, water resistance, and a customizable interface.",
        "You get a variety of features such as a powerful processor and a sleek design."
      ]
    },
    {
      regex: /shipping|delivery|how long does it take to ship/i,
      replies: [
        "It usually ships within 3-5 business days.",
        "Shipping takes about 3-5 business days, depending on your location.",
        "You can expect delivery in 3-5 business days after placing the order."
      ]
    },
    {
      regex: /return policy|return|refund/i,
      replies: [
        "You can return the product within 30 days for a full refund.",
        "Our return policy allows returns within 30 days, no questions asked.",
        "We offer a 30-day return policy for full refunds."
      ]
    },
    {
      regex: /help|assist|support/i,
      replies: [
        "How can I assist you with the product?",
        "Feel free to ask me anything about the product!",
        "I’m here to help. What do you need assistance with?"
      ]
    },
    {
      regex: /hi|hello|hey/i,
      replies: [
        "Hello! How can I help you today?",
        "Hi there! What can I do for you?",
        "Hey! How can I assist you today?"
      ]
    },
    {
      regex: /program|programs/i,
      replies: [
        "Are you asking about a specific program associated with the product?",
        "This product doesn't require any special programs to use, but let me know if you need further details!",
        "If you’re referring to programs or apps, this product supports a wide variety of them!"
      ]
    }
  ];
 
  // Handle user input and generate a response
  const handleUserInput = (event) => {
    setInput(event.target.value);
  };
 
  // Send message and bot response
  const sendMessage = () => {
    if (input.trim() === '') return;
 
    // Add user message to the conversation
    const userMessage = input;
    setMessages([...messages, { sender: 'user', text: userMessage }]);
 
    // Check if input matches any pattern in the responses array
    let botResponse = "Sorry, I didn't quite understand that.";
    for (let response of responses) {
      if (response.regex.test(userMessage)) {
        const randomReply = response.replies[Math.floor(Math.random() * response.replies.length)];
        botResponse = randomReply;
        break;
      }
    }
 
    // Add bot response to the conversation
    setMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
    setInput(''); // Clear input field
  };
 
  // Scroll to the bottom whenever new messages are added
  useEffect(() => {
    // Scroll to the bottom of the messages container
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]); // This effect runs whenever the messages state changes
 
  // Handle Enter key press for sending message
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
   
  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h3>Talk to us we can help!</h3>
      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: message.sender === 'bot' ? 'flex-start' : 'flex-end', marginBottom: '10px' }}>
            <div style={{
              backgroundColor: message.sender === 'bot' ? '#f1f1f1' : '#4caf50',
              color: message.sender === 'bot' ? '#333' : '#fff',
              padding: '10px 20px',
              borderRadius: '20px',
              maxWidth: '70%', // Limiting width to avoid overly stretched messages
              wordWrap: 'break-word'
            }}>
              {message.text}
            </div>
          </div>
        ))}
        {/* Reference the end of the messages to scroll there automatically */}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={input}
          onChange={handleUserInput}
          onKeyDown={handleKeyDown}  // Listen for Enter key press
          placeholder="Hi, How can I help you?.."
          style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }}
        />
        <button onClick={sendMessage} style={{ padding: '10px', marginLeft: '10px', backgroundColor: '#4caf50', color: '#fff', borderRadius: '20px', border: 'none' }}>
          Send Chat
        </button>
      </div>
    </div>
  );
};
 
 
export default ChatBot;