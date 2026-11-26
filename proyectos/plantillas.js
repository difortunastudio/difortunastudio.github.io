/* =====================================================================
   PLANTILLAS DE DIFORTUNA STUDIO
   ---------------------------------------------------------------------
   Convierte los datos de proyectos.js en HTML. Las usa generar.mjs para
   escribir el contenido directamente en las páginas (legible sin
   JavaScript, por buscadores y por herramientas de IA).
   ===================================================================== */
(function (raizGlobal) {
    function esc(t) {
        return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
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


    /* Contenido completo de un universo (todo lo que va dentro de <main>) */
    function universo(p, proyectos) {
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
                return '<article class="u-funcion aparece' + (cap ? ' con-captura' : '') + (f.ejemplos && !cap ? ' ancha' : '') + '" style="--d:' + ((k % 3) * 0.08) + 's">' +
                    (cap ? '<figure><img src="' + raiz + esc(cap.src) + '" alt="' + esc(cap.alt || f.titulo) + '" loading="lazy" /></figure>' : '') +
                    '<div class="u-funcion-texto">' + (cap ? '' : '<span class="marca" aria-hidden="true"></span>') +
                    '<h3>' + esc(f.titulo) + '</h3>' + (f.texto ? '<p>' + esc(f.texto) + '</p>' : '') +
                    (f.ejemplos ? '<ul class="u-ejemplos">' + f.ejemplos.map(function (e) { return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>' : '') + '</div>' +
                '</article>';
            }).join('') + '</div>' +
        '</section>';

        html += '<section class="u-bloque" id="demo">' + cab('Pruébalo') +
            '<h2 class="u-titulo aparece">Experimenta cómo funciona.</h2>' +
            '<div class="u-demo-caja aparece">' +
                '<span class="u-demo-aviso">Demostración · datos ficticios · sin conexión con el producto real</span>' +
                '<div id="demo-contenido"><noscript><p class="u-demo-intro">Esta demostración interactiva necesita JavaScript.</p></noscript></div>' +
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
        return html;
    }

    /* =============================================================
       PORTADA: caso de estudio destacado y tarjetas del portfolio
       ============================================================= */
    function portada(proyectos) {
        function primeraCaptura(p) {
            var c = p.capturas || {};
            for (var k = 0; k < (p.funcionalidades || []).length; k++) {
                var f = p.funcionalidades[k];
                if (f.captura && c[f.captura]) return c[f.captura];
            }
            return null;
        }

        function visualHTML(p, i) {
            var cap = primeraCaptura(p);
            if (cap) {
                return '<div class="proyecto-visual"><img src="' + esc(cap.src) + '" alt="' + esc(cap.alt || '') + '" loading="lazy" /></div>';
            }
            return '<div class="proyecto-visual" aria-hidden="true">' +
                '<span class="visual-num">' + String(i + 1).padStart(2, '0') + ' / ' + String(proyectos.length).padStart(2, '0') + '</span>' +
                '<span class="visual-sectores">' + p.sectores.map(esc).join('<br>') + '</span>' +
                '<span class="visual-orbita"></span>' +
                '<span class="visual-nombre' + (p.nombre.length > 10 ? ' largo' : '') + '">' + esc(p.nombre) + '</span>' +
            '</div>';
        }

        function enlaceUniverso(p, clase) {
            return '<a class="' + clase + '" href="' + esc(p.pagina) + '" data-entrar="' + esc(p.id) + '">Entrar en el universo ' + esc(p.nombre) + ' <span aria-hidden="true">→</span></a>';
        }

        /* Featured Case Study: narrativa antes / después */
        function casoHTML(p) {
            var c = p.caso || {};
            return '<article class="caso reveal" style="--acento:' + esc(p.tema.color) + '" aria-labelledby="caso-' + esc(p.id) + '">' +
                '<span class="caso-fondo" aria-hidden="true">' + esc(p.nombre) + '</span>' +
                '<span class="caso-etiqueta" lang="en">' + esc(p.rolEtiqueta) + '</span>' +
                '<div class="proyecto-top"><h3 class="caso-nombre" id="caso-' + esc(p.id) + '">' + esc(p.nombre) + '</h3><span class="estado">' + esc(p.estado) + '</span></div>' +
                '<p class="proyecto-claim">' + esc(p.claim) + '</p>' +
                '<p class="proyecto-tags">' + p.sectores.map(esc).join(' · ') + '</p>' +
                (c.intro ? '<p class="caso-intro">' + esc(c.intro) + '</p>' : '') +
                '<div class="caso-tabla">' +
                    '<div class="caso-encabezados" aria-hidden="true"><span>Antes · La pregunta</span><span>Con ' + esc(p.nombre) + ' · La respuesta</span></div>' +
                    '<ol class="caso-pares">' + (c.pares || []).map(function (par, k) {
                        return '<li class="caso-par reveal" style="--d:' + (k * 0.09) + 's">' +
                            '<p class="antes"><span class="et">Antes</span>' + esc(par.antes) + '</p>' +
                            '<span class="paso-flecha" aria-hidden="true"></span>' +
                            '<p class="despues"><span class="et">Con ' + esc(p.nombre) + '</span>' + esc(par.despues) + '</p>' +
                        '</li>';
                    }).join('') + '</ol>' +
                '</div>' +
                (c.cierre ? '<p class="caso-cierre">' + esc(c.cierre) + '</p>' : '') +
                (p.origen ? '<p class="origen">' + esc(p.origen) + '</p>' : '') +
                '<div class="caso-cta">' +
                    '<p class="caso-pregunta">¿Qué proceso de tu empresa podríamos transformar?</p>' +
                    '<div class="caso-acciones">' +
                        '<a href="#contacto" class="boton" data-tipo="consultoria" data-evento="cta-caso-' + esc(p.id) + '">Hablemos de tu proceso <span class="flecha">↗</span></a>' +
                        enlaceUniverso(p, 'boton-texto') +
                    '</div>' +
                '</div>' +
            '</article>';
        }

        function tarjetaHTML(p, i) {
            var insignia = p.rol === 'insignia';
            return '<article class="proyecto reveal' + (insignia ? ' destacado' : '') + '" style="--d:' + (i * 0.08) + 's;--acento:' + esc(p.tema.color) + '">' +
                visualHTML(p, proyectos.indexOf(p)) +
                '<div class="proyecto-cuerpo">' +
                    '<span class="insignia"' + (insignia ? ' lang="en"' : '') + '>' + esc(p.rolEtiqueta) + '</span>' +
                    '<div class="proyecto-top"><h3 class="proyecto-nombre">' + esc(p.nombre) + '</h3><span class="estado">' + esc(p.estado) + '</span></div>' +
                    '<p class="proyecto-claim">' + esc(p.claim) + '</p>' +
                    '<p class="proyecto-tags">' + p.sectores.map(esc).join(' · ') + '</p>' +
                    '<dl class="proyecto-ps">' +
                        '<div><dt>Problema</dt><dd>' + esc(p.problemaCorto) + '</dd></div>' +
                        '<div><dt>Solución</dt><dd>' + esc(p.solucionCorta) + '</dd></div>' +
                    '</dl>' +
                    '<div class="proyecto-acciones">' +
                        enlaceUniverso(p, 'abrir-ficha') +
                        (p.url ? '<a class="enlace-externo" href="' + esc(p.url) + '" target="_blank" rel="noopener" data-evento="web-' + esc(p.id) + '">' + esc(p.url.replace(/^https?:\/\//, '')) + ' ↗</a>' : '') +
                    '</div>' +
                '</div>' +
            '</article>';
        }

        var casos = proyectos.filter(function (p) { return p.rol === 'caso'; });
        var resto = proyectos.filter(function (p) { return p.rol !== 'caso'; });
        return {
            caso: casos.map(casoHTML).join(''),
            tarjetas: resto.map(function (p, i) { return tarjetaHTML(p, i); }).join('')
        };
    }

    var api = { esc: esc, escenas: escenas, universo: universo, portada: portada };
    raizGlobal.DFS_PLANTILLAS = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
