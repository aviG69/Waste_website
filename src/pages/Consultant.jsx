import React, { useEffect, useRef, useState } from "react";

export default function Consultant(){
  const [messages, setMessages] = useState([
    { id: 'init', bot: true, text: "👋 Hello! I'm your environmental consultant. Ask me about waste management, recycling, sustainability, or any environmental concerns." }
  ]);
  const textareaRef = useRef();

  function addMessage(text, isUser){
    setMessages(prev => [...prev, { id: Date.now(), bot: !isUser, text }]);
    // scroll handled by useEffect
  }

  async function sendMessage(){
    const q = textareaRef.current.value.trim();
    if(!q) return;
    addMessage(q, true);
    textareaRef.current.value = "";
    addMessage("⏳ Consulting expert...", false); // temporary
    try{
      const res = await fetch("/api/consult", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ question: q }) });
      const j = await res.json();
      // remove last loading
      setMessages(prev => prev.filter(m => m.text !== "⏳ Consulting expert..."));
      addMessage(j.reply || "Unable to generate response.", false);
    }catch(e){
      setMessages(prev => prev.filter(m => m.text !== "⏳ Consulting expert..."));
      addMessage("Connection error. Please try again.", false);
    }
  }

  useEffect(()=> {
    const el = document.getElementById("consultant-messages");
    if(el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  return (
    <div className="consultant-page">
      <div className="consultant-container">
        <div className="consultant-hero">
          <h1>Expert Environmental Consultant</h1>
          <p>Ask about waste management, recycling, sustainability & environmental solutions</p>
        </div>

        <div className="messages-container" id="consultant-messages">
          {messages.map(m => (
            <div key={m.id} className={"message " + (m.bot ? "bot" : "user")}>
              {m.text}
            </div>
          ))}
        </div>

        <div className="input-box" style={{marginTop:12}}>
          <textarea id="consultant-prompt" ref={textareaRef} placeholder="Ask about waste, recycling, composting..." />
          <button id="consultant-send" onClick={sendMessage}>Ask</button>
        </div>

        <div className="quick-prompts" style={{marginTop:12}}>
          {["How do I reduce plastic waste?","Best composting practices?","Recycling guidelines?","Help with dust problem","Waste pickup schedule","Bin management tips"].map((q,i)=>(
            <div key={i} className="quick-prompt" onClick={()=>{ textareaRef.current.value = q; textareaRef.current.focus(); }}>{q}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
