/**
 * Portal DPA Landing Page - Interactivity
 * Vanilla JS only. Zero dependencies.
 */
(function() {
  'use strict';

  // ============================================================
  // 1. FAQ Accordion (single-open)
  // ============================================================
  var faqItems = document.querySelectorAll('.accordion-item');
  var currentOpen = 0; // First item open by default

  function openItem(index) {
    var item = faqItems[index];
    if (!item) return;
    var panel = item.querySelector('.accordion-panel');
    var trigger = item.querySelector('.accordion-trigger');
    var content = panel.querySelector('.accordion-panel__content');
    item.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.removeAttribute('hidden');
    panel.style.maxHeight = content.scrollHeight + 'px';
  }

  function closeItem(index) {
    var item = faqItems[index];
    if (!item) return;
    var panel = item.querySelector('.accordion-panel');
    var trigger = item.querySelector('.accordion-trigger');
    item.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0';
    setTimeout(function() {
      if (!item.classList.contains('open')) {
        panel.setAttribute('hidden', '');
      }
    }, 300);
  }

  faqItems.forEach(function(item, index) {
    var trigger = item.querySelector('.accordion-trigger');

    trigger.addEventListener('click', function() {
      if (currentOpen === index) {
        closeItem(index);
        currentOpen = -1;
      } else {
        if (currentOpen >= 0) closeItem(currentOpen);
        openItem(index);
        currentOpen = index;
      }
    });

    trigger.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        var next = (index + 1) % faqItems.length;
        faqItems[next].querySelector('.accordion-trigger').focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = (index - 1 + faqItems.length) % faqItems.length;
        faqItems[prev].querySelector('.accordion-trigger').focus();
      }
    });
  });

  // Open first item by default
  if (faqItems.length > 0) {
    openItem(0);
  }

  // ============================================================
  // 2. Sticky CTA Bar (Intersection Observer)
  // ============================================================
  var stickyCta = document.querySelector('.sticky-cta-bar');
  var heroCta = document.getElementById('hero-cta');
  var priceSection = document.getElementById('pricing');

  if (stickyCta && heroCta) {
    var heroObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (!entry.isIntersecting) {
          stickyCta.classList.add('visible');
          stickyCta.setAttribute('aria-hidden', 'false');
        } else {
          stickyCta.classList.remove('visible');
          stickyCta.setAttribute('aria-hidden', 'true');
        }
      });
    }, { threshold: 0 });

    heroObserver.observe(heroCta);
  }

  // Hide sticky when price section is visible
  if (stickyCta && priceSection) {
    var priceObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          stickyCta.classList.remove('visible');
          stickyCta.setAttribute('aria-hidden', 'true');
        }
      });
    }, { threshold: 0.3 });

    priceObserver.observe(priceSection);
  }

  // ============================================================
  // 3. Sticky CTA Text Rotation
  // ============================================================
  var stickyBtnText = document.getElementById('sticky-cta-text');
  var stickyTexts = [
    'Quero me preparar agora',
    'Comecar teste gratis',
    'Garantir minha vaga'
  ];
  var stickyIndex = 0;

  if (stickyBtnText) {
    setInterval(function() {
      stickyIndex = (stickyIndex + 1) % stickyTexts.length;
      stickyBtnText.textContent = stickyTexts[stickyIndex];
    }, 8000);
  }

  // ============================================================
  // 4. Countdown Timer
  // ============================================================
  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var endDateStr = countdownEl.getAttribute('data-end');
    var target = new Date(endDateStr).getTime();

    var daysEl = document.getElementById('cd-days');
    var hoursEl = document.getElementById('cd-hours');
    var minutesEl = document.getElementById('cd-minutes');
    var secondsEl = document.getElementById('cd-seconds');

    function padZero(n) {
      return n < 10 ? '0' + n : String(n);
    }

    function tick() {
      var now = Date.now();
      var diff = target - now;

      if (diff <= 0) {
        if (daysEl) daysEl.textContent = '00';
        if (hoursEl) hoursEl.textContent = '00';
        if (minutesEl) minutesEl.textContent = '00';
        if (secondsEl) secondsEl.textContent = '00';
        return;
      }

      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);

      if (daysEl) daysEl.textContent = padZero(days);
      if (hoursEl) hoursEl.textContent = padZero(hours);
      if (minutesEl) minutesEl.textContent = padZero(minutes);
      if (secondsEl) secondsEl.textContent = padZero(seconds);
    }

    tick();
    setInterval(tick, 1000);
  }

  // ============================================================
  // 5. Video Placeholder Click -> Iframe Swap
  // ============================================================
  var videoPlaceholders = document.querySelectorAll('.video-placeholder');
  videoPlaceholders.forEach(function(el) {
    el.addEventListener('click', function() {
      var videoUrl = el.getAttribute('data-video-url');
      if (videoUrl) {
        var iframe = document.createElement('iframe');
        iframe.src = videoUrl + (videoUrl.indexOf('?') > -1 ? '&' : '?') + 'autoplay=1';
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.position = 'absolute';
        iframe.style.top = '0';
        iframe.style.left = '0';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('allow', 'autoplay; encrypted-media');
        el.innerHTML = '';
        el.appendChild(iframe);
      }
    });

    el.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // ============================================================
  // 6. Smooth scroll for anchor links
  // ============================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      var targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
