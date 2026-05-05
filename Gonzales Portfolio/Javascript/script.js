const modeBtn = document.querySelector('.mode-btn');

if (modeBtn) {
  modeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    modeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('mode', isLight ? 'light' : 'dark');
  });
}

if (localStorage.getItem('mode') === 'light') {
  document.body.classList.add('light');
  if (modeBtn) modeBtn.textContent = '☀️';
}

// Certificate Modal
(function () {
  function createModal() {
    // Overlay
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0', left: '0',
      width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.85)',
      zIndex: '999999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
    });

    // Wrapper (positions iframe + close button together)
    const isMobile = window.innerWidth <= 768;
    const modalWidth = isMobile ? '94vw' : 'min(92vw, 960px)';
    const modalHeight = isMobile ? `calc(94vw * 1.414)` : '88vh';

    const wrapper = document.createElement('div');
    Object.assign(wrapper.style, {
      position: 'relative',
      width: modalWidth,
      height: modalHeight,
    });

    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    Object.assign(closeBtn.style, {
      position: 'absolute',
      top: '-16px',
      right: '-16px',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: 'none',
      background: '#ffffff',
      color: '#111',
      fontSize: '16px',
      fontWeight: '700',
      cursor: 'pointer',
      zIndex: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
      lineHeight: '1',
    });
    closeBtn.setAttribute('aria-label', 'Close');

    // iframe
    const iframe = document.createElement('iframe');
    Object.assign(iframe.style, {
      width: '100%',
      height: '100%',
      border: 'none',
      borderRadius: '10px',
      display: 'block',
      boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
    });
    iframe.setAttribute('frameborder', '0');

    // Assemble
    wrapper.appendChild(closeBtn);
    wrapper.appendChild(iframe);
    overlay.appendChild(wrapper);

    // Close handlers
    function close() {
      iframe.src = '';
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); }
    });

    return { overlay, iframe };
  }

  // Attach click to each cert item
  document.querySelectorAll('.cert-item').forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-img');
      if (!src) return;
      const { overlay, iframe } = createModal();
      iframe.src = src + '#toolbar=0&view=FitH';
      document.body.appendChild(overlay);
      document.body.style.overflow = 'hidden';
    });
  });
})();