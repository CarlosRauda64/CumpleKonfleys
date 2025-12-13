
// Navegación por clic entre tarjetas
document.addEventListener('DOMContentLoaded', () => {
	const sections = Array.from(document.querySelectorAll('#card-stack > section'));
	if (!sections.length) return;

	let current = 0;

	const applyPositions = (index) => {
		sections.forEach((s, i) => {
			// Aplicar las clases de posición a la sección completa (mueve confeti también)
			s.style.pointerEvents = (i === index) ? 'auto' : 'none';
			s.classList.remove('pos-left','pos-right','pos-center');
			if (i < index) {
				s.classList.add('pos-left');
			} else if (i === index) {
				s.classList.add('pos-center');
			} else {
				s.classList.add('pos-right');
			}
			// Asegurar que la tarjeta dentro tenga interacción solo cuando la sección esté activa
			const card = s.querySelector('.card');
			if (card) {
				card.style.pointerEvents = (i === index) ? 'auto' : 'none';
			}
		});
	};

	// Inicializar posiciones
	applyPositions(0);

	// Avanzar al hacer click en la tarjeta (ignorando botones/enlaces)
	sections.forEach((section, idx) => {
		section.addEventListener('click', (ev) => {
			const target = ev.target;
			if (target.closest('button') || target.closest('a')) return;

			const next = idx + 1;
			if (next < sections.length) {
				current = next;
				applyPositions(current);
			}
		});
	});

	// Ejemplo: comportamiento del botón de compartir (puedes personalizar)
	const shareBtn = document.getElementById('share-btn');
	if (shareBtn) {
		shareBtn.addEventListener('click', (e) => {
			e.stopPropagation();
			// Placeholder: copiar texto al portapapeles
			const text = '¡Feliz cumpleaños! Revisa mi carta.';
			if (navigator.clipboard) navigator.clipboard.writeText(text).then(()=>{
				shareBtn.textContent = 'Copiado!';
				setTimeout(()=> shareBtn.textContent = 'COMPARTIR', 1500);
			});
		});
	}
    
	// Botones prev/next
	const prevBtn = document.getElementById('prev-btn');
	const nextBtn = document.getElementById('next-btn');
	const go = (idx) => {
		if (idx < 0) idx = 0;
		if (idx >= sections.length) idx = sections.length - 1;
		current = idx;
		applyPositions(current);
	};
	if (prevBtn) {
		prevBtn.addEventListener('click', (e) => { e.stopPropagation(); go(current - 1); });
	}
	if (nextBtn) {
		nextBtn.addEventListener('click', (e) => { e.stopPropagation(); go(current + 1); });
	}

	// Soporte de teclado (flechas)
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') { go(current + 1); }
		if (e.key === 'ArrowLeft') { go(current - 1); }
	});
});

