document.addEventListener("DOMContentLoaded",()=>{
  // Tabs
  document.querySelectorAll("nav a").forEach(link=>{
    link.addEventListener("click",e=>{
      e.preventDefault();
      document.querySelectorAll("main .tab").forEach(tab=>tab.classList.add("hidden"));
      const target=document.querySelector(link.getAttribute("href"));
      if(target){target.classList.remove("hidden");}
    });
  });

  // Simple AI chat simulation
  const chatMessages=document.getElementById("chat-messages");
  const chatInput=document.getElementById("chat-input");
  const chatSend=document.getElementById("chat-send");
  chatSend.addEventListener("click",()=>{
    const text=chatInput.value.trim();
    if(!text) return;
    const userMsg=document.createElement("div");
    userMsg.textContent="You: "+text;
    chatMessages.appendChild(userMsg);
    chatInput.value="";
    // Fake AI response
    const aiMsg=document.createElement("div");
    aiMsg.textContent="AI: Thanks for your question about '"+text+"'. I'm here to help!";
    setTimeout(()=>{chatMessages.appendChild(aiMsg);chatMessages.scrollTop=chatMessages.scrollHeight;},500);
  });
});
