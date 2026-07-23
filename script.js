/* =========================================================
   VISHAL T — PORTFOLIO SCRIPT
   Vanilla JS only. Handles: loading screen, theme toggle,
   custom cursor, scroll progress, nav highlighting, typing
   animation, scroll-reveal, animated counters/skill bars,
   mobile menu, back-to-top, and the contact form.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  /* =========================================================
     AI CHAT — Portfolio Assistant
     ========================================================= */

  const chatToggle = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chatContainer');
  const closeChat = document.getElementById('chatClose');
  const chatInput = document.getElementById('chatInput');
  const sendMessage = document.getElementById('sendBtn');
  const chatBody = document.getElementById('chatBody');

  chatToggle.addEventListener('click', () => {
    const isOpen = chatBox.classList.toggle('active');
    chatToggle.classList.toggle('is-open', isOpen);
    chatToggle.setAttribute('aria-label', isOpen ? 'Close Chat' : 'Open Chat');
    if (isOpen) setTimeout(() => chatInput.focus(), 300);
  });

  closeChat.addEventListener('click', () => {
    chatBox.classList.remove('active');
    chatToggle.classList.remove('is-open');
    chatToggle.setAttribute('aria-label', 'Open Chat');
  });

  /* ---------- 2. Portfolio knowledge base ---------- */
  const PORTFOLIO_KB = [
    {
      topic: 'name',
      keywords: ['your name', 'who are you', 'about you', 'who is vishal'],
      reply: "👋 I'm Vishal T's Portfolio Assistant. Vishal is a Computer Science &amp; Engineering student and an aspiring Full-Stack Developer.<br><br>" +
             "You can ask me about his <em>skills</em>, <em>projects</em>, <em>college</em>, or <em>resume</em>.<br><br>" +
             "🎓 Interested in joining his college? Simply ask me about <em>admission</em> or <em>departments</em>, and I'll help you with the available courses and admission details."
    },
    {
      topic: 'profile',
      keywords: ['profile', 'full details', 'about vishal', 'tell me about him', 'introduce'],
      reply: '🧑‍💻 <strong>Vishal T — Profile</strong><br>' +
             '🎓 Education: B.E. Computer Science &amp; Engineering (2025 — 2029)<br>' +
             '🏛️ College: Nehru Institute of Engineering and Technology, Coimbatore<br>' +
             '💻 Core Skills: Java, Python, HTML, CSS, JavaScript, MySQL<br>' +
             '🚀 Focus: Full-stack web development, building clean &amp; responsive UIs<br>' +
             '🎯 Currently seeking: Software Engineering Internship<br>' +
             '📧 Email: vishal2006t@gmail.com<br>' +
             '📍 Location: Ramanathapuram, Tamil Nadu, India<br>' +
             'Ask me about his <em>skills</em>, <em>projects</em>, <em>college</em> or <em>resume</em> for more!'
    },
    {
      topic: 'college',
      keywords: ['college', 'university', 'institute', 'school', 'education', 'qualification', 'study'],
      reply: '🎓 <strong>College Details</strong><br>' +
             'Vishal studies at the <strong>Nehru Institute of Engineering and Technology, Coimbatore</strong>.<br>' +
             '🏛️ Degree: B.E. Computer Science &amp; Engineering (CSE)<br>' +
             '📅 Batch: 2025 — 2029<br>' +
             '📚 Focus areas: Programming, Data Structures &amp; Algorithms, Databases, and modern Software Engineering practices.'
    },

    // ===============================
    // COLLEGE ADMISSION ASSISTANT
    // ===============================
    {
      topic: 'admission',
      keywords: [
        'admission',
        'admissions',
        'join',
        'course',
        'courses',
        'department',
        'departments',
        'branch',
        'branches'
      ],
      reply:
        '🎓 <strong>Welcome to Nehru Institute of Engineering and Technology (NIET), Coimbatore</strong><br><br>' +
        'We offer the following Undergraduate Engineering Programs:<br><br>' +
        '💻 <strong>Computer Science and Engineering (CSE)</strong><br>' +
        '🤖 <strong>Artificial Intelligence &amp; Data Science (AI &amp; DS)</strong><br>' +
        '📱 <strong>Electronics and Communication Engineering (ECE)</strong><br>' +
        '⚡ <strong>Electrical and Electronics Engineering (EEE)</strong><br>' +
        '⚙️ <strong>Mechanical Engineering (MECH)</strong><br>' +
        '🏗️ <strong>Civil Engineering (CIVIL)</strong><br><br>' +
        '👉 Type any department name to view complete details including:<br>' +
        '• Course Overview<br>' +
        '• Duration<br>' +
        '• Eligibility<br>' +
        '• Core Subjects<br>' +
        '• Laboratories<br>' +
        '• Career Opportunities<br>' +
        '• Fee Information'
    },

    // ===============================
    // CSE
    // ===============================
    {
      topic: 'cse',
      keywords: ['cse', 'computer science', 'computer science engineering'],
      reply:
        '💻 <strong>Computer Science and Engineering (CSE)</strong><br><br>' +
        '📖 <strong>Course Overview</strong><br>' +
        'Computer Science and Engineering focuses on software development, programming, artificial intelligence, networking, databases, cloud computing and modern technologies.<br><br>' +
        '🎓 Duration : 4 Years (8 Semesters)<br>' +
        '📌 Eligibility : 10+2 with Physics, Chemistry &amp; Mathematics<br><br>' +
        '📚 <strong>Core Subjects</strong><br>' +
        '• Programming in C<br>' +
        '• Java Programming<br>' +
        '• Python Programming<br>' +
        '• Data Structures &amp; Algorithms<br>' +
        '• Database Management Systems<br>' +
        '• Operating Systems<br>' +
        '• Computer Networks<br>' +
        '• Web Technologies<br>' +
        '• Artificial Intelligence<br>' +
        '• Cloud Computing<br><br>' +
        '🧪 <strong>Laboratories</strong><br>' +
        '• Programming Lab<br>' +
        '• DBMS Lab<br>' +
        '• Network Lab<br>' +
        '• AI Lab<br>' +
        '• Cloud Computing Lab<br><br>' +
        '💼 <strong>Career Opportunities</strong><br>' +
        '• Software Engineer<br>' +
        '• Full Stack Developer<br>' +
        '• Data Analyst<br>' +
        '• AI Engineer<br>' +
        '• Cloud Engineer<br>' +
        '• Cyber Security Engineer<br><br>' +
        '💰 Fee Structure : Contact Admission Office or visit our website or contact Vishal for latest fee details.'
    },

    // ===============================
    // AI & DS
    // ===============================
    {
      topic: 'ai&ds',
      keywords: ['ai&ds', 'aids', 'artificial intelligence', 'data science'],
      reply:
        '🤖 <strong>Artificial Intelligence &amp; Data Science</strong><br><br>' +
        '📖 <strong>Course Overview</strong><br>' +
        'This program focuses on Artificial Intelligence, Machine Learning, Deep Learning and Data Science technologies.<br><br>' +
        '🎓 Duration : 4 Years (8 Semesters)<br>' +
        '📌 Eligibility : 10+2 with PCM<br><br>' +
        '📚 <strong>Core Subjects</strong><br>' +
        '• Python<br>' +
        '• Machine Learning<br>' +
        '• Deep Learning<br>' +
        '• Data Analytics<br>' +
        '• Big Data<br>' +
        '• Artificial Intelligence<br>' +
        '• Statistics<br><br>' +
        '🧪 <strong>Laboratories</strong><br>' +
        '• AI Lab<br>' +
        '• ML Lab<br>' +
        '• Python Lab<br>' +
        '• Data Analytics Lab<br><br>' +
        '💼 <strong>Career Opportunities</strong><br>' +
        '• AI Engineer<br>' +
        '• Data Scientist<br>' +
        '• ML Engineer<br>' +
        '• Data Analyst<br>' +
        '• Research Engineer<br><br>' +
        '💰 Fee Structure : Contact Admission Office or visit our website or contact Vishal for latest fee details.'
    },

    // ===============================
    // ECE
    // ===============================
    {
      topic: 'ece',
      keywords: ['ece', 'electronics', 'electronics communication'],
      reply:
        '📱 <strong>Electronics and Communication Engineering</strong><br><br>' +
        '📖 <strong>Course Overview</strong><br>' +
        'Study electronic circuits, communication systems, embedded systems and VLSI technologies.<br><br>' +
        '🎓 Duration : 4 Years<br>' +
        '📌 Eligibility : 10+2 with PCM<br><br>' +
        '📚 <strong>Core Subjects</strong><br>' +
        '• Digital Electronics<br>' +
        '• Analog Electronics<br>' +
        '• Embedded Systems<br>' +
        '• VLSI Design<br>' +
        '• Microprocessors<br>' +
        '• Communication Systems<br><br>' +
        '🧪 <strong>Laboratories</strong><br>' +
        '• Embedded Lab<br>' +
        '• Digital Electronics Lab<br>' +
        '• VLSI Lab<br>' +
        '• Communication Lab<br><br>' +
        '💼 <strong>Career Opportunities</strong><br>' +
        '• Embedded Engineer<br>' +
        '• VLSI Engineer<br>' +
        '• IoT Developer<br>' +
        '• Communication Engineer<br><br>' +
        '💰 Fee Structure : Contact Admission Office or visit our website or contact Vishal for latest fee details.'
    },

    // ===============================
    // EEE
    // ===============================
    {
      topic: 'eee',
      keywords: ['eee', 'electrical', 'electrical engineering'],
      reply:
        '⚡ <strong>Electrical and Electronics Engineering</strong><br><br>' +
        '🎓 Duration : 4 Years<br>' +
        '📌 Eligibility : 10+2 with PCM<br><br>' +
        '📚 Subjects<br>' +
        '• Electrical Machines<br>' +
        '• Power Systems<br>' +
        '• Control Systems<br>' +
        '• Power Electronics<br>' +
        '• Renewable Energy<br><br>' +
        '🧪 Laboratories<br>' +
        '• Electrical Machines Lab<br>' +
        '• Power Electronics Lab<br>' +
        '• Control Systems Lab<br><br>' +
        '💼 Career Opportunities<br>' +
        '• Electrical Engineer<br>' +
        '• Power Plant Engineer<br>' +
        '• Maintenance Engineer<br>' +
        '• Design Engineer<br><br>' +
        '💰 Fee Structure : Contact Admission Office or visit our website or contact Vishal for latest fee details.'
    },

    // ===============================
    // MECHANICAL
    // ===============================
    {
      topic: 'mechanical',
      keywords: ['mechanical', 'mech'],
      reply:
        '⚙️ <strong>Mechanical Engineering</strong><br><br>' +
        '🎓 Duration : 4 Years<br>' +
        '📌 Eligibility : 10+2 with PCM<br><br>' +
        '📚 Subjects<br>' +
        '• Engineering Mechanics<br>' +
        '• Manufacturing Technology<br>' +
        '• CAD/CAM<br>' +
        '• Thermodynamics<br>' +
        '• Robotics<br><br>' +
        '🧪 Laboratories<br>' +
        '• CAD Lab<br>' +
        '• Manufacturing Lab<br>' +
        '• Thermal Engineering Lab<br><br>' +
        '💼 Career Opportunities<br>' +
        '• Mechanical Engineer<br>' +
        '• Automobile Engineer<br>' +
        '• Design Engineer<br>' +
        '• Production Engineer<br><br>' +
        '💰 Fee Structure : Contact Admission Office or visit our website or contact Vishal for latest fee details.'
    },

    // ===============================
    // CIVIL
    // ===============================
    {
      topic: 'civil',
      keywords: ['civil', 'civil engineering'],
      reply:
        '🏗️ <strong>Civil Engineering</strong><br><br>' +
        '🎓 Duration : 4 Years<br>' +
        '📌 Eligibility : 10+2 with PCM<br><br>' +
        '📚 Subjects<br>' +
        '• Structural Engineering<br>' +
        '• Surveying<br>' +
        '• Construction Management<br>' +
        '• Environmental Engineering<br>' +
        '• Transportation Engineering<br><br>' +
        '🧪 Laboratories<br>' +
        '• Survey Lab<br>' +
        '• Concrete Lab<br>' +
        '• Highway Lab<br><br>' +
        '💼 Career Opportunities<br>' +
        '• Civil Engineer<br>' +
        '• Site Engineer<br>' +
        '• Structural Engineer<br>' +
        '• Construction Manager<br><br>' +
        '💰 Fee Structure : Contact Admission Office or visit our website or contact Vishal for latest fee details.'
    },

    {
      topic: 'department',
      keywords: ['branch', 'major', 'stream'],
      reply: "🏛️ He's pursuing B.E. in Computer Science & Engineering (CSE)."
    },
    {
      topic: 'year',
      keywords: ['current year', 'which year', 'what year', 'semester'],
      reply: "📅 He's currently an undergraduate student (2025 — 2029 batch)."
    },
    {
      topic: 'skills',
      keywords: ['skill', 'tech stack', 'technologies', 'toolkit'],
      reply: '💻 Core skills: Java, Python, HTML, CSS, JavaScript and MySQL — plus tools like Git, GitHub, VS Code and Postman.'
    },
    {
      topic: 'languages',
      keywords: ['programming language', 'language', 'java', 'python', 'sql'],
      reply: '🧑\u200d💻 Vishal codes primarily in Java and Python, with working knowledge of SQL and JavaScript.'
    },
    {
      topic: 'projects',
      keywords: ['project', 'built', 'portfolio work'],
      reply: '🚀 Featured projects: a Premium Login UI and an Application Form UI — check the Projects section above for live demos and GitHub links.'
    },
    {
      topic: 'resume',
      keywords: ['resume', 'cv'],
      reply: "📄 You can grab his resume from the 'Download Resume' button in the Hero section at the top of the page."
    },
    {
      topic: 'certifications',
      keywords: ['certification', 'certificate', 'nptl', 'nptel'],
      reply: '📜 He holds an NPTL IoT certification, with more on the way — see the Certifications section.'
    },
    {
      topic: 'experience',
      keywords: ['experience', 'worked at', 'job'],
      reply: "🧭 Vishal hasn't started a formal internship yet — he's actively seeking a Software Engineering Internship to gain hands-on experience."
    },
    {
      topic: 'internship',
      keywords: ['internship', 'intern'],
      reply: "🎯 He's currently open to Software Engineering Internship opportunities — see the Experience section for details."
    },
    {
      topic: 'contact',
      keywords: ['contact', 'email', 'phone', 'reach you', 'reach him'],
      reply: '📧 Best way to reach him: vishal2006t@gmail.com, or use the Contact form on this page.'
    },
    {
      topic: 'github',
      keywords: ['github'],
      reply: '🐙 GitHub: github.com/vishal2006t'
    },
    {
      topic: 'linkedin',
      keywords: ['linkedin'],
      reply: '🔗 LinkedIn: linkedin.com/in/vishal-t-2b1a21380'
    },
    {
      topic: 'goals',
      keywords: ['career goal', 'goal', 'future plan', 'aspiration'],
      reply: '🌱 His goal is to grow into a full-stack Software Engineer, starting with an internship where he can learn from experienced engineers.'
    },
    {
      topic: 'greeting',
      keywords: ['hello', 'hi', 'hey'],
      reply: "👋 Hi there! Ask me about Vishal's skills, projects, education, resume, or how to get in touch."
    }
  ];

  const OFF_TOPIC_REPLY =
    "🤖 I'm only able to answer questions about Vishal's portfolio — things like his skills, projects, education, resume, or contact details. Try asking about one of those!";

  /* ---------- 3. Keyword matcher ---------- */
  function matchLocalKB(message) {
    const text = message.toLowerCase();
    for (const entry of PORTFOLIO_KB) {
      if (entry.keywords.some(k => text.includes(k))) {
        return entry.reply;
      }
    }
    return null;
  }

  async function getBotReply(message) {
    const local = matchLocalKB(message);
    return local || OFF_TOPIC_REPLY;
  }

  /* ---------- 5. UI helpers ---------- */
  function appendMessage(text, sender) {
    const el = document.createElement('div');
    el.className = sender === 'user' ? 'user-message' : 'bot-message';
    el.innerHTML = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
    return el;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'bot-message typing';
    typing.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    chatBody.appendChild(typing);
    chatBody.scrollTop = chatBody.scrollHeight;
    return typing;
  }

  async function sendChatMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.textContent = message;
    chatBody.appendChild(userMsg);

    chatInput.value = '';
    chatInput.disabled = true;
    sendMessage.disabled = true;
    chatBody.scrollTop = chatBody.scrollHeight;

    const typingEl = showTypingIndicator();
    const delay = 600 + Math.random() * 500;

    try {
      const reply = await getBotReply(message);
      setTimeout(() => {
        typingEl.remove();
        appendMessage(reply, 'bot');
        chatInput.disabled = false;
        sendMessage.disabled = false;
        chatInput.focus();
      }, delay);
    } catch (err) {
      setTimeout(() => {
        typingEl.remove();
        appendMessage("⚠️ Something went wrong. Please try again.", 'bot');
        chatInput.disabled = false;
        sendMessage.disabled = false;
      }, delay);
    }
  }

  sendMessage.addEventListener('click', sendChatMessage);
  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendChatMessage();
  });

  /* ---------- 1. Loading screen ---------- */
  const loaderTextEl = document.getElementById('loader-text');
  const loadingScreen = document.getElementById('loading-screen');
  const loaderPhrase = 'booting portfolio...';
  let li = 0;

  (function typeLoader(){
    if (li <= loaderPhrase.length){
      loaderTextEl.textContent = loaderPhrase.slice(0, li);
      li++;
      setTimeout(typeLoader, 45);
    }
  })();

  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = '';
    }, 900);
  });

  /* ---------- 2. Theme toggle (persisted) ---------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = getStoredTheme();

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    root.setAttribute('data-theme', 'dark');
  }

  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    storeTheme(next);
  });

  function storeTheme(value){
    try { window.__themePref = value; localStorage.setItem('vishal-theme', value); }
    catch(e){ window.__themePref = value; }
  }
  function getStoredTheme(){
    try { return localStorage.getItem('vishal-theme') || window.__themePref || null; }
    catch(e){ return window.__themePref || null; }
  }

  /* ---------- 3. Custom cursor ---------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorRing = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  (function animateRing(){
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .project-card, .stat-card, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hovering'));
  });

  /* ---------- 4. Scroll progress bar ---------- */
  const progressBar = document.getElementById('scroll-progress');
  function updateScrollProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  /* ---------- 5. Header scrolled state + back-to-top ---------- */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');

  function handleScrollUI(){
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 30);
    backToTop.classList.toggle('visible', y > 500);
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 6. Active nav link highlighting ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav(){
    let currentId = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight){
        currentId = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.dataset.nav === currentId);
    });
  }

  window.addEventListener('scroll', () => {
    updateScrollProgress();
    handleScrollUI();
    highlightNav();
  }, { passive: true });

  updateScrollProgress();
  handleScrollUI();
  highlightNav();

  /* ---------- 7. Mobile menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinksList = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = navLinksList.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 8. Typing animation (hero title) ---------- */
  const typingEl = document.getElementById('typing-text');
  const roles = [
    'Full-Stack Web Developer',
    'Java & Python Programmer',
    'Aspiring Software Engineer',
    'Building Clean UI, One Line at a Time'
  ];
  let roleIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = roles[roleIndex];
    if (!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1500);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
  }
  typeLoop();

  /* ---------- 9. Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const delay = entry.target.dataset.revealDelay || 0;
        setTimeout(() => entry.target.classList.add('in-view'), delay);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 10. Animated counters ---------- */
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  function animateCounter(el){
    const target = parseInt(el.dataset.count, 10) || 0;
    const duration = 1200;
    const start = performance.now();

    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    }
    requestAnimationFrame(tick);
  }

  /* ---------- 11. Animated skill bars ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const bar = entry.target;
        const level = bar.dataset.level || 0;
        const fill = bar.querySelector('.skill-bar-fill');
        requestAnimationFrame(() => { fill.style.width = level + '%'; });
        skillObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  /* ---------- 12. Contact form (client-side validation, no backend) ---------- */
  const form = document.getElementById('contact-form');
  const statusEl = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'name', test: v => v.trim().length > 1, msg: 'Please enter your name.' },
      { id: 'email', test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email.' },
      { id: 'message', test: v => v.trim().length > 9, msg: 'Message should be at least 10 characters.' }
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const errorEl = form.querySelector(`[data-error-for="${f.id}"]`);
      const row = input.closest('.form-row');
      if (!f.test(input.value)){
        valid = false;
        errorEl.textContent = f.msg;
        row.classList.add('error');
      } else {
        errorEl.textContent = '';
        row.classList.remove('error');
      }
    });

    if (!valid){
      statusEl.textContent = '';
      return;
    }

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);

    statusEl.textContent = 'Opening your email client…';
    window.location.href = `mailto:vishal2006t@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      statusEl.textContent = 'Thanks! Your message is ready to send.';
      form.reset();
    }, 600);
  });

  /* ---------- 13. Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

});
