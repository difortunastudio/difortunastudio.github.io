/* =====================================================================
   UNIVERSOS DE PRODUCTO
   Monta la página del proyecto a partir de proyectos.js, dibuja su
   escena, gestiona las transiciones y contiene las demos.
   Las demos usan SIEMPRE datos ficticios y no se conectan a nada.
   ===================================================================== */
(function () {
    var id = document.body.getAttribute('data-proyecto');
    var proyectos = window.PROYECTOS || [];
    var p = proyectos.filter(function (x) { return x.id === id; })[0];
    if (!p) return;

    var sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var enLocal = /^(localhost|127\.0\.0\.1)$/.test(location.hostname);

    function esc(t) {
        return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }
    var eur = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
    var gbp = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });

    var medidos = {};
    function medir(evento, unaVez) {
        if (unaVez) { if (medidos[evento]) return; medidos[evento] = true; }
        if (enLocal) { console.info('[evento]', evento); return; }
        if (window.goatcounter && window.goatcounter.count) {
            window.goatcounter.count({ path: 'evento/' + evento, title: evento, event: true });
        }
    }

    /* =============================================================
       ESCENAS
       ============================================================= */
    var escenas = {
        fliia:
            '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">' +
            '<defs><radialGradient id="fl-a" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#c4b5fd" stop-opacity=".75"/><stop offset="1" stop-color="#c4b5fd" stop-opacity="0"/></radialGradient>' +
            '<radialGradient id="fl-b" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#ddd3ff"/><stop offset="1" stop-color="#a99bf8"/></radialGradient></defs>' +
            '<circle cx="1000" cy="160" r="300" fill="url(#fl-a)" class="respira"/>' +
            '<circle cx="640" cy="760" r="260" fill="url(#fl-a)" opacity=".7" class="respira" style="animation-delay:-3s"/>' +
            '<g fill="none" stroke="#8b7cf6">' +
            '<circle cx="880" cy="400" r="150" stroke-opacity=".28"/>' +
            '<circle cx="880" cy="400" r="235" stroke-opacity=".2" stroke-dasharray="2 7"/>' +
            '<circle cx="880" cy="400" r="320" stroke-opacity=".14"/></g>' +
            '<circle cx="880" cy="400" r="88" fill="url(#fl-b)" class="respira"/>' +
            '<g class="giro" style="--t:40s"><circle cx="880" cy="400" r="150" fill="none" stroke="none"/><circle cx="1030" cy="400" r="9" fill="#8b7cf6"/></g>' +
            '<g class="giro inverso" style="--t:70s"><circle cx="880" cy="400" r="235" fill="none" stroke="none"/><circle cx="880" cy="165" r="12" fill="#b9acfb"/><circle cx="1115" cy="400" r="6" fill="#8b7cf6"/></g>' +
            '<g class="giro" style="--t:110s"><circle cx="880" cy="400" r="320" fill="none" stroke="none"/><circle cx="560" cy="400" r="8" fill="#a99bf8"/></g>' +
            '</svg>',

        timon:
            '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">' +
            '<defs><radialGradient id="tm-s" cx="42%" cy="38%" r="60%"><stop offset="0" stop-color="#cfe0ff"/><stop offset=".35" stop-color="#4f8cff"/><stop offset="1" stop-color="#0a1a4a"/></radialGradient>' +
            '<radialGradient id="tm-h" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#4f8cff" stop-opacity=".45"/><stop offset="1" stop-color="#4f8cff" stop-opacity="0"/></radialGradient></defs>' +
            '<g fill="#9cc0ff" opacity=".5"><circle cx="120" cy="90" r="1.2"/><circle cx="300" cy="640" r="1"/><circle cx="520" cy="140" r="1.4"/><circle cx="1100" cy="700" r="1.1"/><circle cx="700" cy="720" r="1"/><circle cx="1150" cy="120" r="1.3"/><circle cx="60" cy="480" r="1"/><circle cx="420" cy="380" r="1"/></g>' +
            '<circle cx="860" cy="400" r="300" fill="url(#tm-h)" class="respira"/>' +
            '<g fill="none" stroke="#4f8cff">' +
            '<ellipse cx="860" cy="400" rx="330" ry="95" stroke-opacity=".35" transform="rotate(-18 860 400)"/>' +
            '<ellipse cx="860" cy="400" rx="260" ry="70" stroke-opacity=".28" transform="rotate(24 860 400)"/>' +
            '<ellipse cx="860" cy="400" rx="380" ry="130" stroke-opacity=".16" transform="rotate(62 860 400)"/></g>' +
            '<g stroke="#8fb6ff" stroke-opacity=".25"><line x1="860" y1="400" x2="560" y2="470"/><line x1="860" y1="400" x2="1150" y2="300"/><line x1="860" y1="400" x2="980" y2="660"/></g>' +
            '<circle cx="860" cy="400" r="110" fill="url(#tm-s)"/>' +
            '<g class="giro" style="--t:30s"><circle cx="860" cy="400" r="200" fill="none"/><circle cx="1060" cy="400" r="6" fill="#cfe0ff"/></g>' +
            '<g class="giro inverso" style="--t:55s"><circle cx="860" cy="400" r="290" fill="none"/><circle cx="860" cy="110" r="5" fill="#8fb6ff"/><circle cx="570" cy="400" r="4" fill="#4f8cff"/></g>' +
            '</svg>',

        outbill:
            '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">' +
            '<defs><pattern id="ob-g" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#2563eb" stroke-opacity=".07"/></pattern>' +
            '<linearGradient id="ob-f" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>' +
            '<rect width="1200" height="800" fill="url(#ob-g)"/><rect width="1200" height="800" fill="url(#ob-f)"/>' +
            '<g transform="translate(760 150) rotate(-6)"><rect width="240" height="320" rx="6" fill="#fff" stroke="#2563eb" stroke-opacity=".25"/></g>' +
            '<g transform="translate(800 170) rotate(3)"><rect width="240" height="320" rx="6" fill="#fff" stroke="#2563eb" stroke-opacity=".3"/></g>' +
            '<g transform="translate(840 190)"><rect width="240" height="340" rx="6" fill="#fff" stroke="#2563eb" stroke-opacity=".55"/>' +
            '<g fill="#2563eb" fill-opacity=".14"><rect x="24" y="30" width="120" height="10" rx="3"/><rect x="24" y="60" width="190" height="6" rx="3"/><rect x="24" y="78" width="160" height="6" rx="3"/><rect x="24" y="96" width="175" height="6" rx="3"/><rect x="24" y="140" width="190" height="1"/></g>' +
            '<g fill="#2563eb" fill-opacity=".35"><rect x="24" y="160" width="80" height="6" rx="3"/><rect x="150" y="160" width="64" height="6" rx="3"/><rect x="24" y="180" width="70" height="6" rx="3"/><rect x="150" y="180" width="64" height="6" rx="3"/><rect x="24" y="214" width="96" height="10" rx="3"/><rect x="134" y="214" width="80" height="10" rx="3"/></g>' +
            '<rect class="barrido" x="0" y="0" width="240" height="40" fill="#2563eb" fill-opacity=".12"/></g>' +
            '<g stroke="#2563eb" stroke-opacity=".5" fill="none"><path d="M560 620h180l40-40h160"/><circle cx="560" cy="620" r="4" fill="#2563eb"/><circle cx="940" cy="580" r="4" fill="#2563eb"/></g>' +
            '</svg>',

        automotive:
            '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">' +
            '<g fill="none" stroke="#0f766e">' +
            '<circle cx="880" cy="360" r="210" stroke-opacity=".14"/>' +
            '<g class="giro" style="--t:90s"><circle cx="880" cy="360" r="170" stroke-opacity=".5" stroke-width="10" stroke-dasharray="40 14"/></g>' +
            '<circle cx="880" cy="360" r="120" stroke-opacity=".2"/>' +
            '<circle cx="880" cy="360" r="40" stroke-opacity=".45"/></g>' +
            '<circle cx="880" cy="360" r="8" fill="#0f766e"/>' +
            '<line x1="480" y1="660" x2="1200" y2="660" stroke="#0f766e" stroke-opacity=".35"/>' +
            '<g fill="#0f766e"><circle cx="540" cy="660" r="6"/><circle cx="620" cy="660" r="6"/><circle cx="700" cy="660" r="6"/><circle cx="780" cy="660" r="6"/></g>' +
            '<g fill="#f3f5f5" stroke="#0f766e"><circle cx="860" cy="660" r="6"/><circle cx="940" cy="660" r="6"/><circle cx="1020" cy="660" r="6"/><circle cx="1100" cy="660" r="6"/></g>' +
            '<circle cx="860" cy="660" r="13" fill="none" stroke="#0f766e" class="respira"/>' +
            '</svg>',

        nautico:
            '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">' +
            '<g fill="none" stroke="#2dd4bf" class="ola">' +
            '<path d="M-50 600C150 560 300 650 520 600S900 540 1250 610" stroke-opacity=".18"/>' +
            '<path d="M-50 640C170 600 320 690 540 640S920 580 1250 650" stroke-opacity=".13"/>' +
            '<path d="M-50 680C190 640 340 730 560 680S940 620 1250 690" stroke-opacity=".09"/></g>' +
            '<g fill="none" stroke="#2dd4bf" stroke-opacity=".22">' +
            '<path d="M760 180c90-40 220-20 260 70s-30 190-150 200-210-40-220-130 30-110 110-140z"/>' +
            '<path d="M790 220c70-25 160-10 190 55s-25 140-110 148-155-30-162-95 22-82 82-108z"/></g>' +
            '<g transform="translate(900 340)"><g class="giro" style="--t:120s"><circle r="120" fill="none" stroke="#2dd4bf" stroke-opacity=".3"/>' +
            '<path d="M0-120V120M-120 0H120" stroke="#2dd4bf" stroke-opacity=".25"/>' +
            '<path d="M0-95L10 0 0 95-10 0z" fill="#2dd4bf" fill-opacity=".35"/></g>' +
            '<text y="-132" text-anchor="middle" fill="#5eead4" font-family="ui-serif, Georgia, serif" font-size="16">N</text></g>' +
            '<g stroke="#2dd4bf" stroke-opacity=".35"><line x1="560" y1="250" x2="700" y2="160"/><line x1="560" y1="250" x2="640" y2="420"/><line x1="640" y1="420" x2="780" y2="500"/></g>' +
            '<g fill="#04212a" stroke="#2dd4bf"><circle cx="560" cy="250" r="6"/><circle cx="700" cy="160" r="5"/><circle cx="640" cy="420" r="6"/><circle cx="780" cy="500" r="5"/></g>' +
            '</svg>'
    };

    /* =============================================================
       PÁGINA
       ============================================================= */
    var indice = proyectos.indexOf(p);
    var siguiente = proyectos[(indice + 1) % proyectos.length];
    var raiz = '../';
    var numero = 1;
    function cab(texto) {
        var n = String(numero++).padStart(2, '0');
        return '<div class="u-cabecera aparece"><span class="n">' + n + '</span>' + esc(texto) + '</div>';
    }

    document.title = p.nombre + ' · ' + p.claim + ' | Difortuna Studio';

    var html = '';

    html += '<section class="u-hero" id="inicio">' +
        '<div class="u-escena" aria-hidden="true">' + (escenas[p.id] || '') + '</div>' +
        '<div class="u-hero-inner">' +
            '<span class="u-rol entra" style="--d:.1s"' + (/^[A-Z][a-z]+ [A-Z]/.test(p.rolEtiqueta) ? ' lang="en"' : '') + '>' + esc(p.rolEtiqueta) + '</span>' +
            '<h1 class="u-nombre entra" style="--d:.22s">' + esc(p.nombre) + '</h1>' +
            '<p class="u-claim entra" style="--d:.36s">' + esc(p.claim) + '</p>' +
            '<div class="u-meta entra" style="--d:.5s">' +
                '<span>Sector<strong>' + esc(p.sector) + '</strong></span>' +
                '<span>Estado<strong>' + esc(p.estado) + '</strong></span>' +
            '</div>' +
        '</div>' +
        '<a href="#problema" class="u-bajar" aria-label="Empezar">↓</a>' +
    '</section>';

    html += '<section class="u-bloque" id="problema">' + cab('El problema') +
        '<h2 class="u-titulo aparece">Todo empezó con una necesidad real.</h2>' +
        '<p class="u-grande aparece">' + esc(p.problema) + '</p>' +
        (p.ejemplo ? '<div class="u-ejemplo aparece"><span class="et">Un ejemplo</span>' + esc(p.ejemplo) + '</div>' : '') +
    '</section>';

    if (p.caso) {
        html += '<section class="u-bloque" id="transformacion">' + cab('La transformación') +
            '<h2 class="u-titulo aparece">De registrar la actividad a entender la empresa.</h2>' +
            '<p class="u-texto aparece">' + esc(p.caso.intro) + '</p>' +
            '<div class="u-caso"><ol>' + p.caso.pares.map(function (par, k) {
                return '<li class="aparece" style="--d:' + (k * 0.08) + 's">' +
                    '<p class="antes"><span class="et">Antes</span>' + esc(par.antes) + '</p>' +
                    '<span class="flecha" aria-hidden="true"></span>' +
                    '<p class="despues"><span class="et">Con ' + esc(p.nombre) + '</span>' + esc(par.despues) + '</p></li>';
            }).join('') + '</ol>' +
            '<p class="u-caso-cierre aparece">' + esc(p.caso.cierre) + '</p></div>' +
        '</section>';
    }

    html += '<section class="u-bloque" id="solucion">' + cab('Cómo se diseñó la solución') +
        '<h2 class="u-titulo aparece">' + esc(p.solucion) + '</h2>' +
        '<div class="u-diseno">' + p.diseno.map(function (d, k) {
            return '<article class="aparece" style="--d:' + (k * 0.1) + 's"><h3>' + esc(d.titulo) + '</h3><p>' + esc(d.texto) + '</p></article>';
        }).join('') + '</div>' +
    '</section>';

    html += '<section class="u-bloque" id="funcionalidades">' + cab('Funcionalidades') +
        '<h2 class="u-titulo aparece">Lo que hace ' + esc(p.nombre) + '.</h2>' +
        '<div class="u-funciones">' + p.funcionalidades.map(function (f, k) {
            var cap = f.captura && p.capturas && p.capturas[f.captura];
            return '<article class="u-funcion aparece' + (cap ? ' con-captura' : '') + '" style="--d:' + ((k % 3) * 0.08) + 's">' +
                (cap ? '<figure><img src="' + raiz + esc(cap.src) + '" alt="' + esc(cap.alt || f.titulo) + '" loading="lazy" /></figure>' : '') +
                '<div class="u-funcion-texto">' + (cap ? '' : '<span class="marca" aria-hidden="true"></span>') +
                '<h3>' + esc(f.titulo) + '</h3>' + (f.texto ? '<p>' + esc(f.texto) + '</p>' : '') + '</div>' +
            '</article>';
        }).join('') + '</div>' +
    '</section>';

    html += '<section class="u-bloque" id="demo">' + cab('Pruébalo') +
        '<h2 class="u-titulo aparece">Experimenta cómo funciona.</h2>' +
        '<div class="u-demo-caja aparece">' +
            '<span class="u-demo-aviso">Demostración · datos ficticios · sin conexión con el producto real</span>' +
            '<div id="demo-contenido"></div>' +
        '</div>' +
    '</section>';

    html += '<section class="u-bloque" id="valor">' + cab('El valor que aporta') +
        '<h2 class="u-titulo aparece">Lo que cambia para quien lo usa.</h2>' +
        '<ul class="u-valor">' + p.valor.map(function (v, k) {
            return '<li class="aparece" style="--d:' + (k * 0.1) + 's">' + esc(v) + '</li>';
        }).join('') + '</ul>' +
        (p.vision ? '<div class="u-vision aparece"><span class="et">Visión de futuro</span>' + esc(p.vision) + '</div>' : '') +
        (p.aviso ? '<p class="u-aviso aparece">' + esc(p.aviso) + '</p>' : '') +
    '</section>';

    var cta;
    if (p.rol === 'caso') {
        cta = '<h2>¿Qué proceso de tu empresa podríamos transformar?</h2>' +
            '<div class="u-cta-acciones"><a class="boton-u" href="' + raiz + 'index.html?tipo=consultoria#contacto" data-evento="cta-' + p.id + '-contacto">Hablemos de tu proceso ↗</a></div>';
    } else if (p.rol === 'insignia') {
        cta = '<h2>¿Quieres conocer ' + esc(p.nombre) + '?</h2>' +
            '<div class="u-cta-acciones">' +
            (p.url ? '<a class="boton-u" href="' + esc(p.url) + '" target="_blank" rel="noopener" data-evento="web-' + p.id + '">Visitar ' + esc(p.url.replace(/^https?:\/\//, '')) + ' ↗</a>' : '') +
            '<a class="boton-u sec" href="' + raiz + 'index.html?tipo=productos#contacto" data-evento="cta-' + p.id + '-contacto">Hablemos</a></div>';
    } else {
        cta = '<h2>¿Tienes un reto parecido en tu negocio?</h2>' +
            '<div class="u-cta-acciones"><a class="boton-u" href="' + raiz + 'index.html?tipo=desarrollo#contacto" data-evento="cta-' + p.id + '-contacto">Cuéntame qué necesitas resolver ↗</a></div>';
    }
    html += '<section class="u-cierre">' +
        '<div class="u-cta aparece">' + cta + '</div>' +
        '<nav class="u-siguiente" aria-label="Otros proyectos">' +
            '<a href="' + raiz + 'index.html#proyectos" data-salir="portfolio">← Volver al portfolio</a>' +
            '<a href="' + raiz + esc(siguiente.pagina) + '" data-salir="' + esc(siguiente.id) + '" style="text-align:right"><span>Siguiente proyecto</span>' + esc(siguiente.nombre) + ' →</a>' +
        '</nav>' +
    '</section>';

    html += '<footer class="u-pie">' +
        (p.origen ? '<span>' + esc(p.origen) + '</span>' : '') +
        (p.titular ? '<span>' + esc(p.titular) + '</span>' : '') +
        '<span>Las demostraciones usan datos ficticios. Las capturas se muestran anonimizadas.</span>' +
        '<span>© 2026 Difortuna Studio · <a href="' + raiz + 'aviso-legal.html">Aviso legal y privacidad</a></span>' +
    '</footer>';

    document.getElementById('universo').innerHTML = html;
    document.querySelector('.barra-marca').textContent = 'Difortuna Studio';

    /* =============================================================
       TRANSICIONES
       ============================================================= */
    var cortina = document.createElement('div');
    cortina.className = 'cortina';
    document.body.appendChild(cortina);

    var llegada = null;
    try { llegada = sessionStorage.getItem('dfs-transicion'); sessionStorage.removeItem('dfs-transicion'); } catch (e) {}

    function revelar() {
        document.body.classList.add('universo-listo');
    }

    if (llegada === p.id && !sinMovimiento) {
        /* Venimos de una cortina de este mismo color: la abrimos */
        cortina.classList.add('cubre');
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                cortina.classList.add('anima');
                cortina.classList.remove('cubre');
                setTimeout(revelar, 180);
            });
        });
    } else {
        requestAnimationFrame(revelar);
    }

    window.addEventListener('pageshow', function (e) {
        if (e.persisted) { cortina.classList.remove('anima', 'cubre'); revelar(); }
    });

    function colorDe(destino) {
        if (destino === 'portfolio') return '#061310';
        var d = proyectos.filter(function (x) { return x.id === destino; })[0];
        return d ? d.tema.color : '#061310';
    }

    document.addEventListener('click', function (e) {
        var a = e.target.closest('a[data-salir]');
        if (!a || e.metaKey || e.ctrlKey || e.shiftKey || sinMovimiento) return;
        e.preventDefault();
        var destino = a.getAttribute('data-salir');
        try { sessionStorage.setItem('dfs-transicion', destino); } catch (err) {}
        cortina.style.setProperty('--cortina', colorDe(destino));
        cortina.style.setProperty('--cx', e.clientX + 'px');
        cortina.style.setProperty('--cy', e.clientY + 'px');
        cortina.classList.remove('anima', 'cubre');
        void cortina.offsetWidth;
        cortina.classList.add('anima', 'cubre');
        setTimeout(function () { location.href = a.href; }, 560);
    });

    document.addEventListener('click', function (e) {
        var el = e.target.closest('[data-evento]');
        if (el) medir(el.getAttribute('data-evento'));
    });

    /* Barra con fondo al bajar */
    var barra = document.querySelector('.barra');
    function fondoBarra() { barra.classList.toggle('con-fondo', window.scrollY > 30); }
    fondoBarra();
    window.addEventListener('scroll', fondoBarra, { passive: true });

    /* Aparición al bajar */
    var aparecen = document.querySelectorAll('.aparece');
    if (sinMovimiento || !('IntersectionObserver' in window)) {
        aparecen.forEach(function (el) { el.classList.add('visible'); });
    } else {
        var obs = new IntersectionObserver(function (ent) {
            ent.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('visible'); obs.unobserve(x.target); } });
        }, { threshold: 0.08 });
        aparecen.forEach(function (el) { obs.observe(el); });
    }

    /* =============================================================
       DEMOS (datos ficticios)
       ============================================================= */
    var caja = document.getElementById('demo-contenido');
    function usada() { medir('demo-' + p.id, true); }
    function animarCifra(el, desde, hasta, formato) {
        if (sinMovimiento) { el.textContent = formato(hasta); return; }
        var t0 = null;
        function paso(t) {
            if (!t0) t0 = t;
            var k = Math.min(1, (t - t0) / 700);
            el.textContent = formato(desde + (hasta - desde) * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(paso);
        }
        requestAnimationFrame(paso);
    }

    var demos = {};

    /* ---------- FLIIA: registrar un gasto en lenguaje natural ---------- */
    demos.fliia = function () {
        var ingresos = 2000, movimientos = [
            { c: 'Nómina', cat: 'Ingresos', v: 2000 },
            { c: 'Alquiler', cat: 'Hogar', v: -650 },
            { c: 'Supermercado', cat: 'Alimentación', v: -110 }
        ];
        function disponible() { return movimientos.reduce(function (s, m) { return s + m.v; }, 0); }
        function gastado() { return movimientos.reduce(function (s, m) { return s + (m.v < 0 ? -m.v : 0); }, 0); }

        caja.innerHTML =
            '<p class="u-demo-intro">En Fliia, registrar un movimiento es tan sencillo como decirlo. Escribe una frase como la dirías en voz alta y observa cómo cambia el dinero disponible de una familia ficticia.</p>' +
            '<div class="demo">' +
                '<div class="demo-panel">' +
                    '<label class="demo-et" for="fl-frase">Dile a Fliia qué ha pasado</label>' +
                    '<form id="fl-form" style="display:flex;gap:.6rem;flex-wrap:wrap">' +
                        '<input class="demo-input" id="fl-frase" autocomplete="off" placeholder="Gasté 23,50 € en el súper" style="flex:1;min-width:200px" />' +
                        '<button class="demo-boton" type="submit">Registrar</button>' +
                    '</form>' +
                    '<div class="demo-chips">' +
                        ['Gasté 23,50 € en el súper', '45 € de cena con amigos', 'Pagué 60 € de gasolina', 'Me han ingresado 300 € de un trabajo extra']
                            .map(function (t) { return '<button type="button" class="demo-chip">' + esc(t) + '</button>'; }).join('') +
                    '</div>' +
                    '<p class="demo-msg" id="fl-msg" aria-live="polite"></p>' +
                    '<p class="demo-nota">En la aplicación real, esto también se puede hacer con la voz.</p>' +
                '</div>' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Disponible este mes · familia ficticia</span>' +
                    '<div style="display:flex;align-items:center;gap:1.4rem">' +
                        '<svg viewBox="0 0 120 120" width="110" height="110" aria-hidden="true"><circle cx="60" cy="60" r="48" fill="none" stroke="var(--linea)" stroke-width="10"/>' +
                        '<circle id="fl-aro" cx="60" cy="60" r="48" fill="none" stroke="var(--c)" stroke-width="10" stroke-linecap="round" stroke-dasharray="301.6" stroke-dashoffset="301.6" transform="rotate(-90 60 60)" style="transition:stroke-dashoffset .7s cubic-bezier(.2,.7,.3,1)"/></svg>' +
                        '<div><div class="demo-cifra" id="fl-disp"></div><div class="demo-nota" id="fl-gasto"></div></div>' +
                    '</div>' +
                    '<div id="fl-lista" style="margin-top:1.2rem"></div>' +
                '</div>' +
            '</div>';

        var disp = document.getElementById('fl-disp'), aro = document.getElementById('fl-aro'),
            lista = document.getElementById('fl-lista'), msg = document.getElementById('fl-msg'),
            gasto = document.getElementById('fl-gasto'), frase = document.getElementById('fl-frase');

        function pintar(nuevo, anterior) {
            animarCifra(disp, anterior == null ? disponible() : anterior, disponible(), function (v) { return eur.format(v); });
            var g = gastado(), tot = movimientos.reduce(function (s, m) { return s + (m.v > 0 ? m.v : 0); }, 0);
            aro.style.strokeDashoffset = String(301.6 * (1 - Math.min(1, g / tot)));
            gasto.textContent = 'Gastado: ' + eur.format(g) + ' de ' + eur.format(tot) + ' ingresados';
            lista.innerHTML = movimientos.slice(0, 5).map(function (m, k) {
                return '<div class="demo-fila' + (k === 0 && nuevo ? ' demo-nuevo' : '') + '"><span>' + esc(m.c) + ' <span style="color:var(--tenue);font-size:.8em">· ' + esc(m.cat) + '</span></span><span class="v">' + (m.v > 0 ? '+' : '') + eur.format(m.v) + '</span></div>';
            }).join('');
        }

        var categorias = [
            [/s[uú]per|mercado|compra|fruta|panader/i, 'Alimentación', 'Supermercado'],
            [/cena|comida|restaurante|caf[eé]|bar\b|almuerzo/i, 'Ocio y restauración', 'Restauración'],
            [/gasolina|combustible|parking|taxi|tren|metro|bus/i, 'Transporte', 'Transporte'],
            [/luz|agua|alquiler|internet|gas\b|comunidad/i, 'Hogar', 'Hogar'],
            [/farmacia|m[eé]dico|dentista/i, 'Salud', 'Salud'],
            [/colegio|libros|curso|extraescolar/i, 'Educación', 'Educación']
        ];

        function registrar(texto) {
            var m = texto.match(/(\d{1,6}(?:[.,]\d{1,2})?)\s*(?:€|eur|euros?)?/i);
            if (!m) { msg.textContent = 'No encuentro el importe. Prueba con algo como «Gasté 12 € en la farmacia».'; return; }
            var importe = parseFloat(m[1].replace(',', '.'));
            if (!(importe > 0) || importe > 100000) { msg.textContent = 'Prueba con un importe entre 1 € y 100.000 €.'; return; }
            var ingreso = /ingres|cobr|me han pagado|n[oó]mina|recib/i.test(texto);
            var cat = 'Otros', concepto = ingreso ? 'Ingreso' : 'Gasto';
            categorias.forEach(function (c) { if (cat === 'Otros' && c[0].test(texto)) { cat = c[1]; concepto = c[2]; } });
            if (ingreso) { cat = 'Ingresos'; if (/trabajo extra|extra/i.test(texto)) concepto = 'Trabajo extra'; }
            var anterior = disponible();
            movimientos.unshift({ c: concepto, cat: cat, v: ingreso ? importe : -importe });
            pintar(true, anterior);
            msg.textContent = 'Entendido: ' + (ingreso ? 'ingreso' : 'gasto') + ' de ' + eur.format(importe) + (ingreso ? '' : ' en ' + cat) + '.';
            usada();
        }

        document.getElementById('fl-form').addEventListener('submit', function (e) {
            e.preventDefault();
            if (frase.value.trim()) { registrar(frase.value.trim()); frase.value = ''; }
        });
        caja.querySelectorAll('.demo-chip').forEach(function (b) {
            b.addEventListener('click', function () { registrar(b.textContent); });
        });
        pintar(false);
    };

    /* ---------- TIMÓN: una decisión y su efecto en el reparto ---------- */
    demos.timon = function () {
        var beneficio = 180000;
        var socios = [{ n: 'Socia A', pct: 0.40 }, { n: 'Socio B', pct: 0.35 }, { n: 'Socia C', pct: 0.25 }];

        caja.innerHTML =
            '<p class="u-demo-intro">Una empresa ficticia con tres socios cierra el ejercicio con ' + eur.format(beneficio) + ' de beneficio. Plantea una decisión y observa cómo cambia lo que corresponde a cada socio.</p>' +
            '<div class="demo">' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Decisiones</span>' +
                    '<div class="demo-control"><label for="tm-res"><span>Destinar a reservas</span><strong id="tm-res-v"></strong></label><input type="range" id="tm-res" min="0" max="40" step="5" value="10" /></div>' +
                    '<label class="demo-check"><input type="checkbox" id="tm-hire" /> Incorporar a una persona en el departamento de Diseño (coste anual: ' + eur.format(36000) + ')</label>' +
                    '<label class="demo-check"><input type="checkbox" id="tm-equipo" /> Renovar el equipo informático (' + eur.format(18000) + ')</label>' +
                    '<p class="demo-msg" id="tm-msg" aria-live="polite"></p>' +
                    '<p class="demo-nota">Modelo simplificado. En TIMÓN, el reparto sigue las reglas que acuerdan los socios.</p>' +
                '</div>' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Reparto entre socios</span>' +
                    '<svg class="demo-red" viewBox="0 0 360 200" aria-hidden="true" id="tm-svg"></svg>' +
                    '<div id="tm-filas"></div>' +
                '</div>' +
            '</div>';

        var res = document.getElementById('tm-res'), hire = document.getElementById('tm-hire'), equipo = document.getElementById('tm-equipo');
        var svg = document.getElementById('tm-svg'), filas = document.getElementById('tm-filas'), msg = document.getElementById('tm-msg');

        function calcular(r, h, q) {
            var tras = beneficio - (h ? 36000 : 0) - (q ? 18000 : 0);
            var reservas = Math.max(0, tras) * r / 100;
            var repartible = Math.max(0, tras - reservas);
            return { reservas: reservas, repartible: repartible, socios: socios.map(function (s) { return repartible * s.pct; }) };
        }
        var base = calcular(10, false, false);

        function pintar() {
            var c = calcular(+res.value, hire.checked, equipo.checked);
            document.getElementById('tm-res-v').textContent = res.value + ' %';
            var pos = [[70, 100], [180, 60], [290, 110]];
            var max = calcular(0, false, false).socios[0];
            svg.innerHTML = '<circle cx="180" cy="150" r="26" fill="var(--c)" opacity=".9"/><text x="180" y="190" text-anchor="middle" fill="var(--tenue)" font-size="10">Repartible ' + esc(eur.format(c.repartible)) + '</text>' +
                pos.map(function (q, k) {
                    var r = 10 + 30 * Math.sqrt(c.socios[k] / max);
                    return '<line x1="180" y1="150" x2="' + q[0] + '" y2="' + q[1] + '" stroke="var(--c)" stroke-opacity=".35"/>' +
                        '<circle cx="' + q[0] + '" cy="' + q[1] + '" r="' + r.toFixed(1) + '" fill="var(--c-suave)" stroke="var(--c)" style="transition:r .6s"/>' +
                        '<text x="' + q[0] + '" y="' + (q[1] + 4) + '" text-anchor="middle" fill="var(--texto-fuerte)" font-size="10">' + Math.round(socios[k].pct * 100) + '%</text>';
                }).join('');
            filas.innerHTML = socios.map(function (s, k) {
                var dif = c.socios[k] - base.socios[k];
                return '<div class="demo-fila"><span>' + s.n + ' · ' + Math.round(s.pct * 100) + ' %</span><span class="v">' + eur.format(c.socios[k]) +
                    (Math.abs(dif) > 1 ? ' <span style="font-weight:400;font-size:.8em;color:var(--tenue)">(' + (dif > 0 ? '+' : '') + eur.format(dif) + ')</span>' : '') + '</span></div>';
            }).join('') + '<div class="demo-fila"><span>Reservas</span><span class="v">' + eur.format(c.reservas) + '</span></div>';
            var total = c.repartible - base.repartible;
            msg.textContent = Math.abs(total) < 1 ? 'Situación inicial: 10 % a reservas y sin nuevas inversiones.' :
                (total < 0 ? 'Con esta decisión, el reparto total baja ' + eur.format(-total) + ' respecto a la situación inicial.' :
                    'Con esta decisión, el reparto total sube ' + eur.format(total) + ' respecto a la situación inicial.');
        }
        [res, hire, equipo].forEach(function (el) { el.addEventListener('input', function () { pintar(); usada(); }); });
        pintar();
    };

    /* ---------- OUTBILL: leer un ticket y actualizar la estimación ---------- */
    demos.outbill = function () {
        var empresas = {
            es: { n: 'Empresa A · España', fmt: eur, imp: 'IVA', lab: ['IVA repercutido', 'IVA soportado'], ticket: ['PAPELERÍA EJEMPLO S.L.', '12/03/2026', 'Material de oficina', 41.32, 8.68, 50.00, '21 %'], repercutido: 2100, soportado: 840 },
            uk: { n: 'Empresa B · Reino Unido', fmt: gbp, imp: 'VAT', lab: ['VAT de ventas', 'VAT de compras'], ticket: ['EXAMPLE STATIONERY LTD', '12/03/2026', 'Office supplies', 40.00, 8.00, 48.00, '20 %'], repercutido: 1800, soportado: 700 }
        };
        var actual = 'es', leidos = { es: false, uk: false };

        caja.innerHTML =
            '<p class="u-demo-intro">Una persona gestiona dos empresas ficticias en países distintos. Elige una, lee el ticket y observa cómo se incorpora al registro de gastos y a la estimación de impuestos del trimestre.</p>' +
            '<div class="demo">' +
                '<div class="demo-panel">' +
                    '<div class="demo-chips" role="group" aria-label="Empresa" style="margin:0 0 1.2rem">' +
                        '<button type="button" class="demo-chip" data-emp="es" aria-pressed="true">Empresa A · España</button>' +
                        '<button type="button" class="demo-chip" data-emp="uk" aria-pressed="false">Empresa B · Reino Unido</button>' +
                    '</div>' +
                    '<div class="demo-papel" id="ob-ticket"></div>' +
                    '<div style="margin-top:1.2rem;display:flex;gap:.6rem;flex-wrap:wrap"><button class="demo-boton" type="button" id="ob-leer">Leer ticket</button><button class="demo-boton sec" type="button" id="ob-reset">Reiniciar</button></div>' +
                '</div>' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Datos extraídos</span><div id="ob-campos"></div>' +
                    '<span class="demo-et" style="margin-top:1.4rem">Estimación del trimestre · orientativa</span><div id="ob-fiscal"></div>' +
                    '<p class="demo-msg" id="ob-msg" aria-live="polite"></p>' +
                '</div>' +
            '</div>';

        var ticket = document.getElementById('ob-ticket'), campos = document.getElementById('ob-campos'),
            fiscal = document.getElementById('ob-fiscal'), msg = document.getElementById('ob-msg'), leer = document.getElementById('ob-leer');

        function pintar() {
            var e = empresas[actual], t = e.ticket, f = e.fmt;
            ticket.classList.remove('escaneando');
            ticket.innerHTML = '<div class="escaner"></div><strong>' + esc(t[0]) + '</strong><br>' + esc(t[1]) + '<br>--------------------------<br>' +
                esc(t[2]) + '<br>' + (actual === 'es' ? 'Base imponible' : 'Net') + ' ' + f.format(t[3]) + '<br>' + e.imp + ' ' + t[6] + ' ' + f.format(t[4]) +
                '<br>--------------------------<br><strong>TOTAL ' + f.format(t[5]) + '</strong>';
            var etiquetas = ['Proveedor', 'Fecha', 'Categoría', 'Base', e.imp, 'Total'];
            var valores = [t[0], t[1], t[2], f.format(t[3]), f.format(t[4]), f.format(t[5])];
            campos.innerHTML = etiquetas.map(function (l, k) {
                return '<div class="demo-campo' + (leidos[actual] ? ' leido' : '') + '"><span>' + l + '</span><span class="v">' + (leidos[actual] ? esc(valores[k]) : '—') + '</span></div>';
            }).join('');
            var sop = e.soportado + (leidos[actual] ? t[4] : 0);
            fiscal.innerHTML =
                '<div class="demo-fila"><span>' + e.lab[0] + '</span><span class="v">' + f.format(e.repercutido) + '</span></div>' +
                '<div class="demo-fila' + (leidos[actual] ? ' demo-nuevo' : '') + '"><span>' + e.lab[1] + '</span><span class="v">' + f.format(sop) + '</span></div>' +
                '<div class="demo-fila"><span><strong>A ingresar (estimación)</strong></span><span class="v">' + f.format(e.repercutido - sop) + '</span></div>';
            leer.disabled = leidos[actual];
        }

        leer.addEventListener('click', function () {
            leer.disabled = true;
            msg.textContent = 'Leyendo el ticket…';
            ticket.classList.add('escaneando');
            var filas = campos.querySelectorAll('.demo-campo');
            var e = empresas[actual], t = e.ticket, f = e.fmt;
            var valores = [t[0], t[1], t[2], f.format(t[3]), f.format(t[4]), f.format(t[5])];
            filas.forEach(function (fl, k) {
                setTimeout(function () { fl.classList.add('leido'); fl.querySelector('.v').textContent = valores[k]; }, sinMovimiento ? 0 : 300 + k * 170);
            });
            setTimeout(function () {
                leidos[actual] = true;
                pintar();
                msg.textContent = 'Gasto registrado en ' + e.n + '. La estimación de ' + e.imp + ' se ha actualizado.';
                usada();
            }, sinMovimiento ? 0 : 1500);
        });
        document.getElementById('ob-reset').addEventListener('click', function () { leidos = { es: false, uk: false }; msg.textContent = ''; pintar(); });
        caja.querySelectorAll('[data-emp]').forEach(function (b) {
            b.addEventListener('click', function () {
                actual = b.getAttribute('data-emp');
                caja.querySelectorAll('[data-emp]').forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); x.style.borderColor = x === b ? 'var(--c)' : ''; });
                msg.textContent = '';
                pintar();
            });
        });
        caja.querySelector('[data-emp="es"]').style.borderColor = 'var(--c)';
        pintar();
    };

    /* ---------- AUTOMOTIVE: cuota vencida y comunicación ---------- */
    demos.automotive = function () {
        var clientes = [
            { n: 'M. Ejemplo', v: 'Turismo compacto', cuota: 14, imp: 189, vence: '05/03', pagada: false },
            { n: 'J. Ficticio', v: 'Monovolumen', cuota: 22, imp: 245, vence: '10/03', pagada: true },
            { n: 'L. Muestra', v: 'Utilitario', cuota: 6, imp: 156, vence: '20/03', pagada: false },
            { n: 'R. Prueba', v: 'Furgoneta', cuota: 31, imp: 312, vence: '25/03', pagada: false }
        ];
        var revisado = false, historial = [];

        caja.innerHTML =
            '<p class="u-demo-intro">Un concesionario ficticio financia la venta de sus vehículos. Hoy es 15 de marzo en la demo: revisa los vencimientos, detecta la cuota pendiente y prepara la comunicación de seguimiento.</p>' +
            '<div class="demo">' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Agenda de cobros · marzo</span>' +
                    '<table class="demo-tabla"><thead><tr><th>Cliente</th><th>Cuota</th><th>Vence</th><th>Estado</th></tr></thead><tbody id="am-filas"></tbody></table>' +
                    '<div style="margin-top:1.2rem;display:flex;gap:.6rem;flex-wrap:wrap"><button class="demo-boton" type="button" id="am-revisar">Revisar vencimientos</button></div>' +
                '</div>' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Seguimiento</span>' +
                    '<div id="am-seg"><p class="demo-nota" style="margin:0">Revisa los vencimientos para ver qué requiere atención.</p></div>' +
                    '<span class="demo-et" style="margin-top:1.4rem">Historial de gestiones</span><div id="am-hist"><p class="demo-nota" style="margin:0">Sin gestiones todavía.</p></div>' +
                '</div>' +
            '</div>';

        var filas = document.getElementById('am-filas'), seg = document.getElementById('am-seg'), hist = document.getElementById('am-hist');

        function estado(c) {
            if (c.pagada) return '<span class="etiqueta-estado bien">Pagada</span>';
            if (revisado && c.vence < '15/03') return '<span class="etiqueta-estado mal">Vencida · 10 días</span>';
            return '<span class="etiqueta-estado">Pendiente</span>';
        }
        function pintar() {
            filas.innerHTML = clientes.map(function (c) {
                var vencida = revisado && !c.pagada && c.vence < '15/03';
                return '<tr' + (vencida ? ' class="vencida"' : '') + '><td>' + esc(c.n) + '<br><span style="color:var(--tenue);font-size:.8em">' + esc(c.v) + '</span></td><td>' + eur.format(c.imp) + '</td><td>' + c.vence + '</td><td>' + estado(c) + '</td></tr>';
            }).join('');
            hist.innerHTML = historial.length ? historial.map(function (h, k) { return '<div class="demo-fila' + (k === 0 ? ' demo-nuevo' : '') + '"><span>' + esc(h) + '</span></div>'; }).join('') : '<p class="demo-nota" style="margin:0">Sin gestiones todavía.</p>';
        }

        document.getElementById('am-revisar').addEventListener('click', function () {
            revisado = true;
            this.disabled = true;
            pintar();
            var c = clientes[0];
            seg.innerHTML = '<div class="demo-fila"><span>Cuota n.º ' + c.cuota + ' de <strong>' + esc(c.n) + '</strong></span><span class="v">' + eur.format(c.imp) + '</span></div>' +
                '<p class="demo-nota">Venció el 5 de marzo y no consta como pagada.</p>' +
                '<button class="demo-boton" type="button" id="am-preparar" style="margin-top:1rem">Preparar comunicación</button>';
            document.getElementById('am-preparar').addEventListener('click', function () {
                this.remove();
                seg.insertAdjacentHTML('beforeend',
                    '<div class="demo-carta demo-nuevo">Hola, ' + esc(c.n) + ':\n\nTe escribimos porque la cuota n.º ' + c.cuota + ' de la financiación de tu vehículo, por importe de ' + eur.format(c.imp) + ', venció el 5 de marzo y todavía no consta como pagada.\n\nSi ya la has abonado, puedes ignorar este mensaje. Si necesitas organizar el pago, estamos a tu disposición.\n\nUn saludo.</div>' +
                    '<p class="demo-nota">La demo no envía nada: solo prepara el texto para revisarlo.</p>' +
                    '<button class="demo-boton sec" type="button" id="am-registrar" style="margin-top:.8rem">Registrar gestión</button>');
                document.getElementById('am-registrar').addEventListener('click', function () {
                    this.disabled = true;
                    historial.unshift('15/03 · Comunicación de seguimiento preparada para ' + c.n + ' (cuota ' + c.cuota + ')');
                    pintar();
                    usada();
                });
            });
            usada();
        });
        pintar();
    };

    /* ---------- NÁUTICO: tarjeta de visita → red profesional ---------- */
    demos.nautico = function () {
        var nombre = p.nombre;
        caja.innerHTML =
            '<p class="u-demo-intro">Después de una feria, un profesional ficticio digitaliza una tarjeta de visita. ' + esc(nombre) + ' la convierte en un contacto con contexto y la conecta con su red.</p>' +
            '<div class="demo">' +
                '<div class="demo-panel">' +
                    '<div class="demo-papel tarjeta" id="nt-tarjeta"><div class="escaner"></div>' +
                        '<strong style="font-size:1.05em">Marta Ejemplo</strong><span>Refit Project Manager</span><span style="margin-top:.6rem;color:#555">Astillero Demo · Palma de Mallorca</span></div>' +
                    '<div style="margin-top:1.2rem;display:flex;gap:.6rem;flex-wrap:wrap"><button class="demo-boton" type="button" id="nt-scan">Digitalizar tarjeta</button><button class="demo-boton sec" type="button" id="nt-buscar" disabled>¿Quién puede ayudarme con un refit en Palma?</button></div>' +
                    '<div id="nt-campos" style="margin-top:1.2rem"></div>' +
                '</div>' +
                '<div class="demo-panel">' +
                    '<span class="demo-et">Tu red profesional</span>' +
                    '<svg class="demo-red" viewBox="0 0 360 275" id="nt-red" role="img" aria-label="Red de contactos ficticia"></svg>' +
                    '<p class="demo-msg" id="nt-msg" aria-live="polite"></p>' +
                '</div>' +
            '</div>';

        var red = document.getElementById('nt-red'), msg = document.getElementById('nt-msg'), campos = document.getElementById('nt-campos');
        var nodos = {
            yo: [180, 115, 'Tú'], jordi: [70, 45, 'Jordi (demo)'], ana: [295, 45, 'Ana (demo)'],
            marta: [300, 180, 'Marta Ejemplo'], astillero: [185, 240, 'Astillero Demo'], feria: [65, 195, 'Salón náutico (demo)']
        };
        var enlaces = [['yo', 'jordi'], ['yo', 'ana'], ['jordi', 'feria'], ['yo', 'marta', 1], ['marta', 'astillero', 1], ['marta', 'feria', 1], ['ana', 'astillero', 1]];
        function dibujar(conectado, ruta) {
            red.innerHTML = enlaces.map(function (e) {
                var a = nodos[e[0]], b = nodos[e[1]], nuevo = e[2];
                if (nuevo && !conectado) return '';
                var on = ruta && ruta.indexOf(e[0] + '-' + e[1]) > -1;
                return '<line class="enlace' + (on ? ' on' : '') + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"' + (on ? ' stroke-width="2.4"' : '') + '/>';
            }).join('') + Object.keys(nodos).map(function (k) {
                var n = nodos[k], nuevo = (k === 'marta' || k === 'astillero');
                if (nuevo && !conectado) return '';
                return '<g class="nodo' + (k === 'yo' ? ' yo' : '') + '"><circle cx="' + n[0] + '" cy="' + n[1] + '" r="' + (k === 'yo' ? 9 : 7) + '"/><text x="' + n[0] + '" y="' + (n[1] + 22) + '">' + esc(n[2]) + '</text></g>';
            }).join('');
        }
        dibujar(false);

        document.getElementById('nt-scan').addEventListener('click', function () {
            var boton = this;
            boton.disabled = true;
            document.getElementById('nt-tarjeta').classList.add('escaneando');
            var datos = [['Nombre', 'Marta Ejemplo'], ['Cargo', 'Refit Project Manager'], ['Empresa', 'Astillero Demo'], ['Ciudad', 'Palma de Mallorca'], ['Dónde os conocisteis', 'Salón náutico (demo)']];
            campos.innerHTML = datos.map(function (d) { return '<div class="demo-campo"><span>' + d[0] + '</span><span class="v">—</span></div>'; }).join('');
            campos.querySelectorAll('.demo-campo').forEach(function (fl, k) {
                setTimeout(function () { fl.classList.add('leido'); fl.querySelector('.v').textContent = datos[k][1]; }, sinMovimiento ? 0 : 300 + k * 180);
            });
            setTimeout(function () {
                dibujar(true);
                msg.textContent = 'Contacto creado y conectado con su empresa, la feria donde os conocisteis y tu red.';
                document.getElementById('nt-buscar').disabled = false;
                usada();
            }, sinMovimiento ? 0 : 1500);
        });
        document.getElementById('nt-buscar').addEventListener('click', function () {
            dibujar(true, ['yo-marta', 'marta-astillero', 'ana-astillero', 'yo-ana']);
            msg.textContent = 'Marta Ejemplo trabaja en refit en Astillero Demo, en Palma. La conociste en el Salón náutico. Ana también conoce el astillero y podría presentaros a más personas del equipo.';
        });
    };

    if (demos[p.demo]) demos[p.demo]();
})();
