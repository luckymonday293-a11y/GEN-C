/**
 * GEN C — Shared Utilities
 * Version: 1.0.0
 *
 * This module provides shared utility functions used across all GEN C pages.
 * No external dependencies — vanilla JS only.
 */

'use strict';

/* ── Greeting ── */

/**
 * Returns time-appropriate greeting based on hour of day.
 * @param {string} firstName
 * @returns {string}
 */
function getGreeting(firstName) {
  const hour = new Date().getHours();
  let greeting;
  if (hour < 12)       greeting = 'Good morning';
  else if (hour < 17)  greeting = 'Good afternoon';
  else                 greeting = 'Good evening';
  return `${greeting}, ${firstName}`;
}

/* ── Date Formatting ── */

/**
 * Format a Date object to 'Thursday, 8 October 2026'
 * @param {Date} date
 * @returns {string}
 */
function formatDateLong(date) {
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format a Date to 'Oct 8, 2026'
 * @param {Date} date
 * @returns {string}
 */
function formatDateShort(date) {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Format a Date to 'Oct 8, 2026 · 2:34 PM'
 * @param {Date} date
 * @returns {string}
 */
function formatDateTime(date) {
  const d = formatDateShort(date);
  const t = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  return `${d} · ${t}`;
}

/* ── Number Formatting ── */

/**
 * Format a number as Nigerian Naira
 * @param {number} amount
 * @returns {string} e.g. '₦250,000.00'
 */
function formatNGN(amount) {
  return '₦' + amount.toLocaleString('en-NG', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format a number as USD
 * @param {number} amount
 * @returns {string} e.g. '$500.00'
 */
function formatUSD(amount) {
  return '$' + amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/* ── Clipboard ── */

/**
 * Copy text to clipboard and trigger a visual feedback element
 * @param {string} text
 * @param {HTMLElement} feedbackEl - Element to show 'Copied!' temporarily
 */
async function copyToClipboard(text, feedbackEl) {
  try {
    await navigator.clipboard.writeText(text);
    if (feedbackEl) {
      const original = feedbackEl.textContent;
      feedbackEl.textContent = 'Copied!';
      feedbackEl.setAttribute('aria-label', 'Copied to clipboard');
      setTimeout(() => {
        feedbackEl.textContent = original;
        feedbackEl.removeAttribute('aria-label');
      }, 2000);
    }
    return true;
  } catch {
    return false;
  }
}

/* ── Form Validation ── */

/**
 * Validate an email address.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Validate a Nigerian phone number (basic check).
 * @param {string} phone
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return /^(\+234|0)[789]\d{9}$/.test(cleaned);
}

/**
 * Get password strength score 0-4
 * @param {string} password
 * @returns {number}
 */
function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8)   score++;
  if (password.length >= 12)  score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password))    score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return Math.min(score, 4);
}

/**
 * Get human-readable password strength label
 * @param {number} score 0-4
 * @returns {{ label: string, color: string }}
 */
function getPasswordStrengthLabel(score) {
  const levels = [
    { label: 'Very weak', color: '#DC2626' },
    { label: 'Weak',      color: '#F59E0B' },
    { label: 'Fair',      color: '#F59E0B' },
    { label: 'Strong',    color: '#16A34A' },
    { label: 'Very strong', color: '#16A34A' },
  ];
  return levels[score] || levels[0];
}

/* ── UI Helpers ── */

/**
 * Show inline field error
 * @param {HTMLElement} input
 * @param {HTMLElement} errorEl
 * @param {string} message
 */
function showFieldError(input, errorEl, message) {
  input.classList.add('form-input--error');
  input.setAttribute('aria-invalid', 'true');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'flex';
  }
}

/**
 * Clear inline field error
 * @param {HTMLElement} input
 * @param {HTMLElement} errorEl
 */
function clearFieldError(input, errorEl) {
  input.classList.remove('form-input--error');
  input.removeAttribute('aria-invalid');
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.style.display = 'none';
  }
}

/**
 * Set button loading state
 * @param {HTMLButtonElement} btn
 * @param {boolean} loading
 * @param {string} loadingText
 */
function setButtonLoading(btn, loading, loadingText = 'Please wait...') {
  if (loading) {
    btn.dataset.originalText = btn.innerHTML;
    btn.innerHTML = `<span class="spinner" aria-hidden="true"></span><span>${loadingText}</span>`;
    btn.disabled = true;
    btn.setAttribute('aria-busy', 'true');
  } else {
    btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
    btn.disabled = false;
    btn.removeAttribute('aria-busy');
  }
}

/* ── Toggle Password Visibility ── */

/**
 * Set up a password visibility toggle button
 * @param {HTMLInputElement} input
 * @param {HTMLButtonElement} toggleBtn
 */
function initPasswordToggle(input, toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggleBtn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
    // Update icon
    const icon = toggleBtn.querySelector('[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
      if (window.lucide) window.lucide.createIcons();
    }
  });
}

/* ── Mobile Nav Drawer ── */

/**
 * Initialize mobile navigation drawer
 * @param {HTMLElement} overlay
 * @param {HTMLElement} drawer
 * @param {HTMLElement} openBtn
 * @param {HTMLElement} closeBtn
 */
function initMobileNav(overlay, drawer, openBtn, closeBtn) {
  if (!overlay || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    closeBtn && closeBtn.focus();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    openBtn && openBtn.focus();
  }

  openBtn && openBtn.addEventListener('click', openDrawer);
  closeBtn && closeBtn.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Close on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && drawer.classList.contains('open')) closeDrawer();
  });
}

/* ── Balance Visibility Toggle ── */

/**
 * Initialize balance visibility toggle (eye icon)
 * @param {HTMLElement} toggleBtn
 * @param {NodeList|Array} balanceEls - Elements containing balance values
 * @param {Object} values - Map of element id/selector to hidden/visible values
 */
function initBalanceToggle(toggleBtn, balanceEls, hidden = '•••') {
  if (!toggleBtn) return;
  let visible = true;
  const originals = new Map();

  balanceEls.forEach(el => originals.set(el, el.textContent));

  toggleBtn.addEventListener('click', () => {
    visible = !visible;
    balanceEls.forEach(el => {
      el.textContent = visible ? originals.get(el) : hidden;
    });
    const icon = toggleBtn.querySelector('[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', visible ? 'eye' : 'eye-off');
      if (window.lucide) window.lucide.createIcons();
    }
    toggleBtn.setAttribute('aria-label', visible ? 'Hide balance' : 'Show balance');
  });
}

/* ── Countdown Timer ── */

/**
 * Start a countdown timer
 * @param {number} seconds
 * @param {function(remaining: number)} onTick
 * @param {function()} onComplete
 * @returns {function()} cancel function
 */
function startCountdown(seconds, onTick, onComplete) {
  let remaining = seconds;
  onTick(remaining);
  const id = setInterval(() => {
    remaining--;
    onTick(remaining);
    if (remaining <= 0) {
      clearInterval(id);
      onComplete && onComplete();
    }
  }, 1000);
  return () => clearInterval(id);
}

/* ── Debounce ── */

/**
 * Debounce a function
 * @param {function} fn
 * @param {number} ms
 * @returns {function}
 */
function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

/* ── Exports (module-style for future use) ── */
// In a non-module environment, all are already global.
