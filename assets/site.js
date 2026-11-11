(() => {
  const box = document.querySelector('.lightbox');
  const boxImg = box.querySelector('img');
  const boxCap = box.querySelector('.lightbox__cap');

  document.querySelectorAll('[data-gallery]').forEach((g) => {
    const mainBtn = g.querySelector('.gallery__main');
    const mainImg = mainBtn.querySelector('img');
    const thumbs = g.querySelectorAll('.gallery__thumbs button');

    thumbs.forEach((t) => {
      t.addEventListener('click', () => {
        const img = t.querySelector('img');
        mainImg.src = img.src;
        mainImg.alt = img.alt;
        mainImg.width = img.width;
        mainImg.height = img.height;
        thumbs.forEach((x) => x.removeAttribute('aria-current'));
        t.setAttribute('aria-current', 'true');
      });
    });

    mainBtn.addEventListener('click', () => {
      boxImg.src = mainImg.src;
      boxImg.alt = mainImg.alt;
      boxCap.textContent = mainImg.alt;
      box.showModal();
    });
  });

  box.addEventListener('click', (e) => { if (e.target === box) box.close(); });
})();

(() => {
  const flow = document.querySelector('[data-flow]');
  if (!flow) return;
  const tabs = [...flow.querySelectorAll('[role="tab"]')];
  const play = (panel) => {
    panel.classList.remove('is-playing');
    void panel.offsetWidth;
    panel.classList.add('is-playing');
  };
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    play(document.getElementById(tab.getAttribute('aria-controls')));
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
      select(n, true);
    });
  });
  play(flow.querySelector('[role="tabpanel"]:not([hidden])'));
})();
