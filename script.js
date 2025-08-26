// Wait for DOM to load before running any script
document.addEventListener('DOMContentLoaded', () => {
  // Cache DOM references
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('main > section');

  /**
   * Hide all sections and remove active classes from nav
   */
  function resetSections() {
    sections.forEach(section => {
      section.classList.add('hidden');
      section.classList.remove('show');
    });
    navLinks.forEach(link => link.classList.remove('active'));
  }

  /**
   * Show a section by id and mark nav link as active
   * @param {string} id – The ID of the section to show
   */
  function showSection(id) {
    const section = document.querySelector(id);
    if (!section) return;
    resetSections();
    // find nav link
    const navLink = document.querySelector(`nav a[href='${id}']`);
    if (navLink) navLink.classList.add('active');
    // unhide section and animate
    section.classList.remove('hidden');
    // use setTimeout to trigger CSS transition after layout reflow
    requestAnimationFrame(() => {
      section.classList.add('show');
    });
  }

  // Attach click listeners to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', evt => {
      evt.preventDefault();
      const target = link.getAttribute('href');
      showSection(target);
    });
  });

  // Initially show home section
  showSection('#home');

  /**
   * Simple chat simulation for the AI chat section.
   */
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');

  function appendMessage(text, isUser = false) {
    const msg = document.createElement('div');
    msg.textContent = (isUser ? 'You: ' : 'AI: ') + text;
    msg.className = isUser ? 'user-msg' : 'ai-msg';
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener('click', () => {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, true);
    chatInput.value = '';
    // Simulate AI thinking
    setTimeout(() => {
      appendMessage(`Thanks for your question about "${text}". I'm here to help!`);
    }, 600);
  });
});