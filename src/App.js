import React, { useState, useEffect } from "react";
import InstagramEmbed from "react-instagram-embed";
import firebase from "firebase";
import "./App.css";
import { db } from "./firebase";

function App() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setUsername(prompt("Please enter your name!"));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(snapshot.docs.map((doc) => doc.data()))
      );
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("messages").add({
      user: username,
      content: input,
      timestamp: firebase.firestore.Timestamp.now(),
    });
    setInput("");
  };

  return (
    <div>
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome to the chatroom {username}</h2>

      <InstagramEmbed
        url="https://www.instagram.com/p/CBvLLCRAaWP/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />

      {messages.map((message) => (
        <p>
          {message.user ? message.user : "unknown user"} said: {message.content}
        </p>
      ))}

      <form className="app__form">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" onClick={sendMessage}>
          Send message
        </button>
      </form>
    </div>
  );
}

export default App;
