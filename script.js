(() => {
  const noBtn = document.getElementById('no');
  const yesBtn = document.getElementById('yes');
  const toast = document.getElementById('toast');
  const musicToggle = document.getElementById('musicToggle');
  const backgroundMusic = document.getElementById('backgroundMusic');

  // Cambia el teléfono si deseas enviar la respuesta a otro chat.
  // Código de país + número, sin signo + ni espacios.
  const TELEFONO_DESTINO = '51979083162';

  /* ==================================
     BOTÓN NO: ESCAPA
     ================================== */

  function escapeNo(event) {
    if (event) event.preventDefault();

    const margin = 12;
    const rect = noBtn.getBoundingClientRect();

    const maxX = Math.max(margin, window.innerWidth - rect.width - margin);
    const maxY = Math.max(margin, window.innerHeight - rect.height - margin);

    const x = margin + Math.random() * Math.max(0, maxX - margin);
    const y = margin + Math.random() * Math.max(0, maxY - margin);

    noBtn.style.position = 'fixed';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    noBtn.style.transform = 'rotate(' + (Math.random() * 18 - 9) + 'deg)';
    noBtn.style.zIndex = '30';

    const frases = [
      '¡Casi! 🙈',
      'Atrápame 💨',
      'No tan fácil 😜',
      '¡Uy, fallaste! 💕'
    ];

    noBtn.textContent = frases[Math.floor(Math.random() * frases.length)];
  }

  noBtn.addEventListener('pointerenter', escapeNo);
  noBtn.addEventListener('pointerdown', escapeNo);
  noBtn.addEventListener('click', escapeNo);
  noBtn.addEventListener('focus', escapeNo);

  window.addEventListener('resize', () => {
    if (noBtn.style.position === 'fixed') {
      const r = noBtn.getBoundingClientRect();
      const x = Math.max(8, Math.min(r.left, window.innerWidth - r.width - 8));
      const y = Math.max(8, Math.min(r.top, window.innerHeight - r.height - 8));

      noBtn.style.left = x + 'px';
      noBtn.style.top = y + 'px';
    }
  });

  /* ==================================
     BOTÓN SÍ: ABRE WHATSAPP
     ================================== */

  yesBtn.addEventListener('click', () => {
    toast.classList.add('show');

    const mensaje =
      '¡SÍÍÍ! 💖🌹 Confirmo nuestra cita de hoy, 14 de octubre, ' +
      'a las 8:30 p. m. No puedo esperar para verte. ' +
      'Te mando un abrazo y muchos besitos. 💜✨';

    const texto = encodeURIComponent(mensaje);

    const url = TELEFONO_DESTINO
      ? 'https://wa.me/' + TELEFONO_DESTINO + '?text=' + texto
      : 'https://wa.me/?text=' + texto;

    // Abre WhatsApp después de mostrar el mensaje.
    setTimeout(() => {
      window.open(url, '_blank');
    }, 500);
  });

  /* ==================================
     MÚSICA CONTROLADA POR EL GIRASOL
     ================================== */

  backgroundMusic.volume = 0.75;

  function updateMusicButton(isPlaying) {
    musicToggle.classList.toggle('is-playing', isPlaying);

    musicToggle.setAttribute(
      'aria-label',
      isPlaying ? 'Pausar música' : 'Activar música'
    );

    musicToggle.title = isPlaying
      ? 'Pausar música'
      : 'Activar música';
  }

  async function toggleMusic() {
    if (backgroundMusic.paused) {
      try {
        await backgroundMusic.play();
        updateMusicButton(true);
      } catch (error) {
        updateMusicButton(false);
        alert(
          'No se pudo reproducir la música. Comprueba que musica.mp3 ' +
          'esté junto a index.html.'
        );
      }
    } else {
      backgroundMusic.pause();
      updateMusicButton(false);
    }
  }

  musicToggle.addEventListener('click', toggleMusic);

  backgroundMusic.addEventListener('play', () => updateMusicButton(true));
  backgroundMusic.addEventListener('pause', () => updateMusicButton(false));
  backgroundMusic.addEventListener('ended', () => updateMusicButton(false));

  // No forzamos la reproducción automática:
  // algunos navegadores exigen que la persona toque el botón.
  updateMusicButton(false);

  /* ==================================
     PÉTALOS FLOTANTES
     ================================== */

  const petals = ['🌸', '💗', '🌹'];

  for (let i = 0; i < 10; i++) {
    const p = document.createElement('span');

    p.className = 'petal';
    p.textContent = petals[i % petals.length];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.animationDuration = (8 + Math.random() * 10) + 's';
    p.style.animationDelay = (-Math.random() * 15) + 's';
    p.style.fontSize = (12 + Math.random() * 12) + 'px';

    document.body.appendChild(p);
  }
})();