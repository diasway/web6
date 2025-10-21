document.addEventListener('DOMContentLoaded', function () {
  
  const datetimeEl = document.getElementById('current-datetime');
  if (datetimeEl) {
    const updateDateTime = () => {
      const now = new Date();
      const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
      };
      datetimeEl.textContent = now.toLocaleDateString('en-US', options);
    };
    updateDateTime();
    setInterval(updateDateTime, 60000);
  }

  const themeBtn = document.getElementById('changeThemeBtn');
  if (themeBtn) {
    const themes = [
      { bg: '#efebe9', text: '#333' },
      { bg: '#2b2b2b', text: '#f0f0f0' },
      { bg: '#f3e5f5', text: '#4a148c' },
      { bg: '#e8f5e9', text: '#1b5e20' }
    ];
    let currentTheme = 0;
    themeBtn.addEventListener('click', () => {
      currentTheme = (currentTheme + 1) % themes.length;
      document.body.style.backgroundColor = themes[currentTheme].bg;
      document.body.style.color = themes[currentTheme].text;
      document.querySelectorAll('.navbar, .site-footer').forEach(el => {
        el.style.backgroundColor = themes[currentTheme].bg;
        el.style.color = themes[currentTheme].text;
      });
    });
  }

  const mainImage = document.getElementById('mainImage');
  const thumbnails = document.querySelectorAll('.thumbnail');
  if (mainImage && thumbnails.length) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        mainImage.src = thumb.src;
        mainImage.alt = thumb.alt;
      });
    });
  }

  
  const timeBtn = document.getElementById('showTimeBtn');
  const timeDisplay = document.getElementById('timeDisplay');
  if (timeBtn && timeDisplay) {
    timeBtn.addEventListener('click', () => {
      timeDisplay.textContent = new Date().toLocaleTimeString();
    });
  }

  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  if (navLinks.length) {
    let currentIndex = 0;
    navLinks[currentIndex].tabIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        navLinks[currentIndex].tabIndex = -1;
        currentIndex = (currentIndex + 1) % navLinks.length;
        navLinks[currentIndex].tabIndex = 0;
        navLinks[currentIndex].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navLinks[currentIndex].tabIndex = -1;
        currentIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
        navLinks[currentIndex].tabIndex = 0;
        navLinks[currentIndex].focus();
      }
    });
  }

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      setTimeout(() => {
        alert(`Thank you, ${name}! Your message was sent.`);
        contactForm.reset();
      }, 500);
    });
  }

  const greetingEl = document.getElementById('dynamicGreeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting;
    switch (true) {
      case (hour >= 5 && hour < 12):
        greeting = "Good morning! Enjoy a fresh green tea.";
        break;
      case (hour >= 12 && hour < 17):
        greeting = "Good afternoon! Try our Assam black tea.";
        break;
      case (hour >= 17 && hour < 21):
        greeting = "Good evening! Relax with chamomile infusion.";
        break;
      default:
        greeting = "Hello night owl! Our teas are always brewing.";
    }
    greetingEl.textContent = greeting;
  }

  const popup = document.getElementById('subscribePopup');
  const openBtn = document.getElementById('openSubscribeBtn');
  const closeBtn = document.getElementById('closePopup');
  if (popup && openBtn) {
    openBtn.onclick = () => popup.style.display = 'flex';
    if (closeBtn) closeBtn.onclick = () => popup.style.display = 'none';
    popup.onclick = (e) => { if (e.target === popup) popup.style.display = 'none'; };
  }

  const form = document.getElementById('deliveryForm');
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      document.querySelectorAll('.err').forEach(el => el.remove());
      let valid = true;

      const name = document.getElementById('userName')?.value.trim();
      const phone = document.getElementById('userPhone')?.value.trim();
      const addr = document.getElementById('userAddress')?.value.trim();

      if (!name) { showError('userName', 'Name is required.'); valid = false; }
      if (!phone || !/^\+?[\d\s\-\(\)]{10,}$/.test(phone)) { showError('userPhone', 'Invalid phone.'); valid = false; }
      if (!addr) { showError('userAddress', 'Address is required.'); valid = false; }

      if (valid) {
        playSound();
        alert('Order placed successfully!');
        form.reset();
      }
    };

    function showError(id, msg) {
      const el = document.getElementById(id);
      if (el) {
        const err = document.createElement('div');
        err.className = 'err text-danger small mt-1';
        err.textContent = msg;
        el.parentNode.appendChild(err);
      }
    }
  }

  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      if (content) {
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
      }
    });
  });

  
  const teas = [
    { name: "Sencha", type: "Green", desc: "Grassy, refreshing", img: "https://kuban24.tv/wp-content/uploads/2023/08/2-62.jpg" },
    { name: "Matcha", type: "Green", desc: "Vibrant and earthy", img: "https://images.unsplash.com/photo-1602812998189-7554d8d6a7a0?auto=format&fit=crop&w=200" },
    { name: "Assam", type: "Black", desc: "Robust and malty", img: "https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_6549c63f7cd8277aa2ddfb54_6549c766399a034e96564e25/scale_1200" },
    { name: "Chamomile", type: "Herbal", desc: "Calm and floral", img: "https://img.freepik.com/premium-photo/herbal-infusion-tea-with-chamomile-lavender-mint_1034924-8490.jpg" }
  ];

  const teaContainer = document.getElementById('featured-teas-container');
  if (teaContainer) {
    const filteredTeas = teas.filter(tea => ['Green', 'Black', 'Herbal'].includes(tea.type));
    teaContainer.innerHTML = filteredTeas.map(tea => `
      <div class="responsive-card animated-card">
        <img src="${tea.img}" alt="${tea.name}" onerror="this.src='https://via.placeholder.com/100?text=Tea'">
        <h4>${tea.name}</h4>
        <p>${tea.desc}</p>
        <button class="btn btn-sm btn-brown learn-more" data-name="${tea.name}">Learn More</button>
      </div>
    `).join('');

    document.querySelectorAll('.learn-more').forEach(btn => {
      btn.addEventListener('click', () => {
        playSound();
        alert(`You selected: ${btn.dataset.name}`);
      });
    });

    document.querySelectorAll('.animated-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 100);
    });
  }

  function playSound() {
    const audio = new Audio('sounds/click.mp3');
    audio.play().catch(e => console.log("Audio play failed:", e));
  }


  if (themeBtn) {
    themeBtn.addEventListener('click', playSound);
  }
});