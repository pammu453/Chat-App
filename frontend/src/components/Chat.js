import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSend = async () => {
    try {
      const response = await axios.post('https://chat-app-w5pi.onrender.com/api/chat/ask', {
        question: message,
        userId: 'user123',
      });
  
      console.log(response);
  
      setResponses([...responses, { user: message, bot: response.data.choices[0].message.content }]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  return (
    <>
      <div className="chat-window">
        {responses.map((res, index) => (
          <div key={index}>
            <p><strong>You:</strong> {res.user}</p>
            <p><strong>Bot:</strong> {res.bot}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </>
  );
};

export default Chat;