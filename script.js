
// Particle background
const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let w, h, particles = [];
function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
for(let i=0;i<80;i++){ particles.push({x:Math.random()*w, y:Math.random()*h, r:Math.random()*2+0.4, vx:(Math.random()-.5)*0.3, vy:(Math.random()-.5)*0.3});}
function draw(){
  ctx.clearRect(0,0,w,h);
  ctx.fillStyle = 'rgba(255,140,20,0.15)';
  particles.forEach(p=>{ p.x+=p.vx; p.y+=p.vy; if(p.x<0||p.x>w) p.vx*=-1; if(p.y<0||p.y>h) p.vy*=-1; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); });
  requestAnimationFrame(draw);
} draw();

// Nav links active state + smooth scroll
const links = document.querySelectorAll('header nav a');
links.forEach(a=>a.addEventListener('click', (e)=>{
  e.preventDefault();
  document.querySelector('header nav a.active')?.classList.remove('active');
  a.classList.add('active');
  const target = document.querySelector(a.getAttribute('href'));
  if(target){ target.scrollIntoView({behavior:'smooth', block:'start'}); }
}));

// Reveal on scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, {threshold: .15});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Simple AI helper (front-end only)
const messages = document.getElementById('chat-messages');
const input = document.getElementById('chat-input');
const send = document.getElementById('chat-send');
function pushMessage(text, role){
  const el = document.createElement('div');
  el.className = 'msg ' + role;
  el.textContent = (role==='user'?'You: ':'AI: ') + text;
  messages.appendChild(el); messages.scrollTop = messages.scrollHeight;
}
send?.addEventListener('click',()=>{
  const q = input.value.trim(); if(!q) return;
  pushMessage(q, 'user'); input.value='';
  setTimeout(()=> pushMessage("Try: Spotlight reindex, Login Items, or Reduce Motion — check the Tweaks section.", 'ai'), 500);
});
