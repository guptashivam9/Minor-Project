import React, { useState } from 'react';
import './MessageBox.css'; // Import your CSS file for styling

const MessageBox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState({
    'Shreya': [{ sender: 'Shreya', message: 'Hello! How are you?' }],
    'Poonam': [{ sender: 'Poonam', message: 'Hey there! What\'s up?' }],
    'Dikshya': [{ sender: 'Dikshya', message: 'Hi! How have you been?' }],
    'Anushree': [{ sender: 'Anushree', message: 'Hi! Remember me?' }],
    'Anu': [{ sender: 'Anu', message: 'Hello! Long time no see.' }],
    'Ankita': [{ sender: 'Ankita', message: 'Hey! How\'s it going?' }],
    'Saraswati': [{ sender: 'Saraswati', message: 'Hi! How\'s your day?' }],
    'Niru': [{ sender: 'Niru', message: 'Hey! Did you see the new movie?' }],
    'Rekha': [{ sender: 'Rekha', message: 'Hi! Let\'s catch up soon.' }]
  });
  const[selectedPerson, setSelectedPerson]= useState([

    { name: 'Shreya' },
    { name: 'Poonam' },
    { name: 'Dikshya' },
    { name: 'Anushree' },
    { name: 'Anu' },
    { name: 'Ankita' },
    { name: 'Saraswati' },
    { name: 'Niru' },
    { name: 'Rekha' },

    
  ]);
  

  const [inbox, setInbox] = useState([
      
  
    { name: 'Shreya', hasNotification: true },
    { name: 'Poonam', hasNotification: true },
    { name: 'Dikshya', hasNotification: true },
    { name: 'Anushree', hasNotification: true },
    { name: 'Anu', hasNotification: true },
    { name: 'Ankita', hasNotification: true },
    { name: 'Saraswati', hasNotification: true },
    { name: 'Niru', hasNotification: true },
    { name: 'Rekha', hasNotification: true },
  ]);

  
  const handleMessageChange = (event) => {
    event.preventDefault();
    setMessage(event.target.value);

  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedPerson]: [
          ...(prevMessages[selectedPerson] || []),
          { sender: 'You', message }
        ]
      }));
      setMessage('');
    }
  };

  const handleUnsendMessage = (index) => {
    const updatedMessages = [...messages[selectedPerson]];
    updatedMessages.splice(index, 1);
    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedPerson]: updatedMessages
    }));
  };

  const handlePersonSelect = (person) => {
    if (person === selectedPerson) {
      return;

        
    }

    setSelectedPerson(person);
    setInbox(prevInbox => prevInbox.map(item => item.name === person ? { ...item, hasNotification: false } : item));

  };
 


  return (
    <div className="message-box">
      <div className="inbox">
        <h2>Inbox</h2>
        <ul>
        {inbox.map((person, index) => (
  <li key={index} onClick={() => handlePersonSelect(person.name)}>
    {person.name}
    {person.hasNotification && <span className="notification-icon">•</span>}
  </li>
))}
        </ul>
      </div>
      <div className="message-area">
        <div className="message-history">
          {selectedPerson && messages[selectedPerson] && messages[selectedPerson].map((msg, index) => (
            <div key={index} className="message">
              <span>{msg.sender}: </span>
              <span>{msg.message}</span>
              <button onClick={() => handleUnsendMessage(index)}>Unsend</button>
            </div>
          ))}
        </div>
        {selectedPerson && (
          <div className="message-input">
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}
       
       
      </div>
    </div>
  );
};

export default MessageBox;
