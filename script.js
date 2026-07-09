// Loader
window.addEventListener('load',()=>{
  setTimeout(()=>document.getElementById('loader').classList.add('hide'),450);
});

// Header scroll state
const header = document.getElementById('siteHeader');
window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');
burger.addEventListener('click',()=>{
  burger.classList.toggle('open');
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  burger.classList.remove('open'); mainNav.classList.remove('open');
}));

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.main-nav a');
window.addEventListener('scroll',()=>{
  let current='';
  sections.forEach(sec=>{
    if(window.scrollY >= sec.offsetTop - 160) current = sec.getAttribute('id');
  });
  navLinks.forEach(a=>{
    a.classList.toggle('active', a.getAttribute('href') === '#'+current);
  });
});

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
},{threshold:0.15});
revealEls.forEach(el=>io.observe(el));

// Counters
const counters = document.querySelectorAll('.num');
const counterIO = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      const el = entry.target;
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/60));
      const tick = ()=>{
        cur += step;
        if(cur >= target){ el.textContent = target + suffix; }
        else { el.textContent = cur + suffix; requestAnimationFrame(tick); }
      };
      tick();
      counterIO.unobserve(el);
    }
  });
},{threshold:0.5});
counters.forEach(c=>counterIO.observe(c));

// Testimonial slider
const slidesWrap = document.getElementById('slides');
const dotsWrap = document.getElementById('dots');
const totalSlides = slidesWrap.children.length;
let curSlide = 0;
for(let i=0;i<totalSlides;i++){
  const d = document.createElement('div');
  d.className = 'dot'+(i===0?' active':'');
  d.addEventListener('click',()=>goToSlide(i));
  dotsWrap.appendChild(d);
}
function goToSlide(i){
  curSlide = i;
  slidesWrap.style.transform = `translateX(-${i*100}%)`;
  [...dotsWrap.children].forEach((d,idx)=>d.classList.toggle('active', idx===i));
}
setInterval(()=>{ goToSlide((curSlide+1)%totalSlides); }, 4500);

// Ripple effect
document.querySelectorAll('[data-ripple]').forEach(btn=>{
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(), 650);
  });
});

// Contact form (demo submit)
const form = document.getElementById('contactForm');
const sendBtn = document.getElementById('sendBtn');
form.addEventListener('submit', ()=>{
  sendBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent';
  sendBtn.style.background = '#1f9d55';
  setTimeout(()=>{
    form.reset();
    sendBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
    sendBtn.style.background = '';
  }, 2400);
});

document.getElementById('year').textContent = new Date().getFullYear();