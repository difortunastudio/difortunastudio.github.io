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



    /* =============================================================
       TIMÓN · MODELO DE LA EMPRESA FICTICIA
       Un único cálculo para el texto estático y para la simulación.
       ============================================================= */
    var MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    var eur0 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    var eur2 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    var pct0 = function (v) { return Math.round(v * 100) + ' %'; };

    function modeloTimon(e, o) {
        o = o || {};
        var reservas = o.reservas != null ? o.reservas : e.reservas;
        var estructura = o.estructura != null ? o.estructura : e.estructura;
        var horasPersona = o.horas != null ? o.horas : e.horasPersona;
        var baja = o.baja || 0;
        var ingBase = e.departamentos.reduce(function (t, d) { return t + d.ingresos; }, 0);
        var f = Math.max(0, 1 - baja / ingBase);   /* la bajada se reparte en proporción; los costes directos acompañan */
        var deps = e.departamentos.map(function (d) { return { n: d.n, ingresos: d.ingresos * f, directos: d.costes * f }; });
        var ingresos = deps.reduce(function (s, d) { return s + d.ingresos; }, 0);
        var directos = deps.reduce(function (s, d) { return s + d.directos; }, 0);
        var margen = ingresos - directos;
        var mc = margen / ingresos;
        deps.forEach(function (d) {
            d.estructura = estructura * d.ingresos / ingresos;          /* su parte de los costes comunes */
            d.costes = d.directos + d.estructura;
            d.resultado = d.ingresos - d.costes;
            d.pct = d.resultado / d.ingresos;
        });
        var beneficio = margen - estructura;
        var puntoMuerto = estructura / mc;
        var facturado = e.facturado.importe;
        var cubierto = facturado >= puntoMuerto;
        var falta = Math.max(0, puntoMuerto - facturado);

        var horas = e.personas * horasPersona;
        var costeHora = (directos + estructura) / horas;
        var precioHora = ingresos / horas;

        var socios = e.socios.map(function (s) {
            var d = deps.filter(function (x) { return x.n === s.dep; })[0];
            return { n: s.n, dep: s.dep, importe: Math.max(0, d.resultado) * (1 - reservas / 100) };
        });
        var repartible = socios.reduce(function (t, s) { return t + s.importe; }, 0);
        var reservasImp = deps.reduce(function (t, d) { return t + Math.max(0, d.resultado) * reservas / 100; }, 0);

        var t = e.tesoreria, acum = 0, minAcum = 0;
        t.flujos.forEach(function (x) { acum += x; minAcum = Math.min(minAcum, acum); });
        var maxReparto = Math.max(0, Math.floor((t.saldo + minAcum - t.colchon) / 1000) * 1000);
        function proyeccion(reparto) {
            var serie = [t.saldo - reparto], sal = t.saldo - reparto;
            t.flujos.forEach(function (x) { sal += x; serie.push(sal); });
            return serie;
        }

        var mejorEuros = deps.slice().sort(function (a, b) { return b.resultado - a.resultado; })[0];
        var mejorPct = deps.slice().sort(function (a, b) { return b.pct - a.pct; })[0];

        return {
            deps: deps, ingresos: ingresos, directos: directos, margen: margen, mc: mc, estructura: estructura, baja: baja,
            beneficio: beneficio, puntoMuerto: puntoMuerto, facturado: facturado, cubierto: cubierto, falta: falta,
            horas: horas, horasPersona: horasPersona, costeHora: costeHora, precioHora: precioHora,
            reservas: reservas, repartible: repartible, reservasImp: reservasImp, socios: socios,
            maxReparto: maxReparto, proyeccion: proyeccion, colchon: t.colchon,
            mejorEuros: mejorEuros, mejorPct: mejorPct
        };
    }

    function nombreMes(m) { return m > 12 ? 'no se cubren este año' : MESES[m - 1]; }
    var pct1 = function (v) { return (v * 100).toFixed(1).replace('.', ',') + ' %'; };
    function lista(partes) { return partes.length > 1 ? partes.slice(0, -1).join(', ') + ' y ' + partes[partes.length - 1] : partes.join(''); }

    /* Lectura en una frase de cada pregunta (también se usa en la simulación) */
    function lecturaTimon(id, e, m, base) {
        switch (id) {
            case 'socios':
                return 'Cada socio recibe el resultado de su departamento, después de un ' + m.reservas + ' % a reservas: ' +
                    lista(m.socios.map(function (s) { return eur0.format(s.importe) + ' para ' + s.n + ' (' + s.dep + ')'; })) + '.';
            case 'departamentos':
                return m.mejorEuros.n + ' aporta más beneficio en euros (' + eur0.format(m.mejorEuros.resultado) + ')' +
                    (m.mejorPct.n === m.mejorEuros.n ? ' y además es la más rentable en proporción' : ', pero ' + m.mejorPct.n + ' es la más rentable en proporción') +
                    ' (' + pct0(m.mejorPct.pct) + ' sobre sus ingresos), ya con su parte de los costes comunes.';
            case 'costes':
                return 'Con ' + eur0.format(m.estructura) + ' de costes de estructura y un margen del ' + pct0(m.mc) + ', el punto muerto está en ' +
                    eur0.format(m.puntoMuerto) + '. A ' + e.facturado.fecha + ' se han facturado ' + eur0.format(m.facturado) + ': ' +
                    (m.cubierto ? 'los costes del año ya están cubiertos.' : 'faltan ' + eur0.format(m.falta) + ' para cubrirlos.');
            case 'hora':
                var dif = m.precioHora - m.costeHora;
                return 'Cada hora productiva cuesta ' + eur2.format(m.costeHora) + ' y se vende de media a ' + eur2.format(m.precioHora) + ': ' +
                    (dif >= 0 ? 'un margen de ' + eur2.format(dif) + ' por hora.' : 'se pierden ' + eur2.format(-dif) + ' por hora.');
            case 'cliente':
                if (!m.baja) return 'Elige una bajada de ingresos para simularla. Hoy el beneficio previsto es de ' + eur0.format(m.beneficio) + ' y el margen, del ' + pct1(m.beneficio / m.ingresos) + '.';
                return 'Si los ingresos bajaran ' + eur0.format(m.baja) + ', el beneficio pasaría de ' + eur0.format(base.beneficio) + ' a ' + eur0.format(m.beneficio) +
                    ' y el margen, del ' + pct1(base.beneficio / base.ingresos) + ' al ' + pct1(m.beneficio / m.ingresos) + '.';
            case 'tesoreria':
                return 'Hay ' + eur0.format(m.beneficio) + ' de beneficio, pero para no bajar del colchón de ' + eur0.format(m.colchon) +
                    ' en las próximas 13 semanas, hoy se pueden repartir como máximo ' + eur0.format(m.maxReparto) + '.';
        }
        return '';
    }

    /* Cifras clave en texto (visibles sin JavaScript) */
    function cifrasTimon(id, m, e) {
        var f = function (a, b) { return '<div><dt>' + esc(a) + '</dt><dd>' + esc(b) + '</dd></div>'; };
        switch (id) {
            case 'socios': return m.socios.map(function (s) { return f(s.n + ' · ' + s.dep, eur0.format(s.importe)); }).join('') + f('A reservas', eur0.format(m.reservasImp));
            case 'departamentos': return m.deps.map(function (d) { return f(d.n, eur0.format(d.resultado) + ' · ' + pct0(d.pct)); }).join('');
            case 'costes': return f('Punto muerto', eur0.format(m.puntoMuerto)) + f('Facturado a ' + e.facturado.fecha, eur0.format(m.facturado)) + f('Estado', m.cubierto ? 'Cubiertos' : 'Faltan ' + eur0.format(m.falta));
            case 'hora': return f('Coste por hora', eur2.format(m.costeHora)) + f('Precio medio por hora', eur2.format(m.precioHora)) + f('Horas productivas al año', new Intl.NumberFormat('es-ES').format(m.horas));
            case 'cliente': return f('Beneficio previsto', eur0.format(m.beneficio)) + f('Margen', pct1(m.beneficio / m.ingresos));
            case 'tesoreria': return f('Saldo actual', eur0.format(m.proyeccion(0)[0])) + f('Colchón mínimo', eur0.format(m.colchon)) + f('Reparto máximo hoy', eur0.format(m.maxReparto));
        }
        return '';
    }

    /* Cifra principal de cada pregunta: en grande en el panel y abreviada en la esfera */
    function valorTimon(id, m, modoDep) {
        var k = function (v) { return Math.round(v / 1000) + 'k €'; };
        switch (id) {
            case 'socios': return { valor: eur0.format(m.repartible), esfera: k(m.repartible) };
            case 'departamentos': var d = modoDep === 'pct' ? m.mejorPct : m.mejorEuros; return { valor: d.n, esfera: d.n };
            case 'costes': return m.cubierto ? { valor: 'Cubiertos', esfera: 'Cubiertos' } : { valor: 'Faltan ' + eur0.format(m.falta), esfera: '−' + k(m.falta) };
            case 'hora': return { valor: eur2.format(m.costeHora), esfera: eur2.format(m.costeHora) };
            case 'cliente': return { valor: eur0.format(m.beneficio), esfera: k(m.beneficio) };
            case 'tesoreria': return { valor: eur0.format(m.maxReparto), esfera: k(m.maxReparto) };
        }
        return { valor: '', esfera: '' };
    }

    /* Esfera de navegación: el anillo gira y trae la pregunta elegida hacia el panel */
    function esferaTimon(c, primera) {
        var n = c.preguntas.length;
        return '<svg class="tm-svg" viewBox="0 0 600 600" aria-hidden="true">' +
            '<defs><radialGradient id="tmc-s" cx="42%" cy="38%" r="60%"><stop offset="0" stop-color="#cfe0ff"/><stop offset=".35" stop-color="#4f8cff"/><stop offset="1" stop-color="#0a1a4a"/></radialGradient>' +
            '<radialGradient id="tmc-h" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#4f8cff" stop-opacity=".45"/><stop offset="1" stop-color="#4f8cff" stop-opacity="0"/></radialGradient></defs>' +
            '<circle cx="300" cy="300" r="260" fill="url(#tmc-h)"/>' +
            '<g class="tm-decor" fill="none" stroke="#6f9eff">' +
                '<ellipse cx="300" cy="300" rx="265" ry="100" stroke-opacity=".45" transform="rotate(-28 300 300)"/>' +
                '<ellipse cx="300" cy="300" rx="265" ry="100" stroke-opacity=".35" transform="rotate(32 300 300)"/>' +
                '<ellipse cx="300" cy="300" rx="110" ry="262" stroke-opacity=".22"/></g>' +
            '<circle cx="300" cy="300" r="215" fill="none" stroke="#4f8cff" stroke-opacity=".3" stroke-dasharray="2 6"/>' +
            '<line class="tm-haz" x1="408" y1="300" x2="498" y2="300"/>' +
            '<g class="tm-anillo">' +
            c.preguntas.map(function (q, k) {
                return '<g class="tm-nodo" data-q="' + esc(q.id) + '" style="--a:' + ((360 / n) * k) + 'deg">' +
                    '<circle class="tm-nodo-halo" cx="300" cy="300" r="24"/>' +
                    '<circle class="tm-nodo-punto" cx="300" cy="300" r="10"/>' +
                    '<text x="300" y="338">' + esc(q.corto) + '</text></g>';
            }).join('') +
            '</g>' +
            '<circle class="tm-nucleo" cx="300" cy="300" r="108" fill="url(#tmc-s)"/>' +
            '<text class="tm-display-et" x="300" y="284">' + esc(primera.etiqueta) + '</text>' +
            '<text class="tm-display" x="300" y="322">' + esc(primera.esfera) + '</text>' +
            '</svg>';
    }

    function centroTimon(p) {
        var c = p.centro, e = c.empresa, m = modeloTimon(e), base = m;
        var q0 = c.preguntas[0], v0 = valorTimon(q0.id, m);
        var resumen = e.nombre + ': ' + e.personas + ' personas, ' + e.socios.length + ' socios, ' + e.departamentos.length + ' departamentos y ' + eur0.format(m.ingresos) + ' de facturación prevista';
        return '<section class="tm-escena" id="centro" aria-labelledby="tm-nombre">' +
            '<div class="tm-fondo" aria-hidden="true"></div>' +
            '<header class="tm-cabecera">' +
                '<div>' +
                    '<span class="u-rol entra" style="--d:.1s" lang="en">' + esc(p.rolEtiqueta) + '</span>' +
                    '<h1 class="tm-nombre entra" id="tm-nombre" style="--d:.18s">' + esc(p.nombre) + '</h1>' +
                    '<p class="tm-claim entra" style="--d:.26s">' + esc(p.claim) + '</p>' +
                '</div>' +
                '<p class="tm-lema entra" style="--d:.34s">' + esc(c.lema) + ' <span>' + esc(c.intro) + '</span></p>' +
            '</header>' +
            '<div class="tm-mando entra" style="--d:.42s">' +
                '<div class="tm-esfera">' + esferaTimon(c, { etiqueta: q0.etiqueta, esfera: v0.esfera }) + '</div>' +
                '<div class="tm-paneles">' +
                c.preguntas.map(function (q, k) {
                    var v = valorTimon(q.id, m);
                    return '<article class="tm-panel" id="q-' + esc(q.id) + '" role="tabpanel" aria-labelledby="tab-' + esc(q.id) + '">' +
                        '<div class="tm-panel-cab">' +
                            '<p class="tm-num">' + String(k + 1).padStart(2, '0') + ' / ' + esc(q.corto) + '</p>' +
                            '<p class="tm-funcion">Funcionalidad · ' + esc(q.funcion) + '</p>' +
                        '</div>' +
                        '<div class="tm-panel-top">' +
                            '<h2 class="tm-pregunta">' + esc(q.pregunta) + '</h2>' +
                            '<div class="tm-cifra"><span>' + esc(q.etiqueta) + '</span><strong class="tm-valor">' + esc(v.valor) + '</strong></div>' +
                        '</div>' +
                        '<div class="tm-viz" data-viz="' + esc(q.id) + '"></div>' +
                        '<dl class="tm-cifras">' + cifrasTimon(q.id, m, e) + '</dl>' +
                        '<div class="tm-panel-pie">' +
                            '<p class="tm-lectura" aria-live="polite">' + esc(lecturaTimon(q.id, e, m, base)) + '</p>' +
                            '<div class="tm-antes"><p><span>Antes</span>' + esc(q.antes) + '</p><p><span>Con ' + esc(p.nombre) + '</span>' + esc(q.funcion) + '.</p></div>' +
                        '</div>' +
                    '</article>';
                }).join('') +
                '</div>' +
            '<div class="tm-pestanas">' +
                '<ol role="tablist" aria-label="Preguntas empresariales">' +
                c.preguntas.map(function (q, k) {
                    return '<li role="presentation"><a href="#q-' + esc(q.id) + '" role="tab" id="tab-' + esc(q.id) + '" aria-controls="q-' + esc(q.id) + '" data-q="' + esc(q.id) + '">' +
                        '<span class="n">' + String(k + 1).padStart(2, '0') + '</span>' + esc(q.corto) + '</a></li>';
                }).join('') +
                '</ol>' +
                '<p class="tm-aviso">Simulación con datos ficticios · ' + esc(resumen) + '</p>' +
            '</div>' +
            '</div>' +
        '</section>';
    }

    /* Después de la escena: prueba real y contexto. Nada más. */
    function despuesTimon(p, raiz) {
        var c = p.centro, capturas = [];
        (p.funcionalidades || []).forEach(function (f) {
            var cap = f.captura && p.capturas && p.capturas[f.captura];
            if (cap) capturas.push({ cap: cap, titulo: f.titulo });
        });
        return (capturas.length ?
            '<section class="tm-prueba" aria-labelledby="tm-prueba-t">' +
                '<h2 class="tm-sub aparece" id="tm-prueba-t">' + esc(p.nombre) + ' en uso</h2>' +
                '<div class="tm-capturas">' + capturas.map(function (x) {
                    return '<figure class="aparece"><img src="' + raiz + esc(x.cap.src) + '" alt="' + esc(x.cap.alt || x.titulo) + '" loading="lazy" /><figcaption>' + esc(x.titulo) + '</figcaption></figure>';
                }).join('') + '</div>' +
                '<p class="tm-nota aparece">Capturas reales con los datos de la empresa anonimizados.</p>' +
            '</section>' : '') +
            '<section class="tm-contexto" aria-labelledby="tm-contexto-t">' +
                '<h2 class="tm-sub aparece" id="tm-contexto-t">Dónde nació</h2>' +
                '<div class="tm-contexto-texto aparece">' +
                    '<p>' + esc(p.origen) + '</p>' +
                    '<p>' + esc(p.problema) + '</p>' +
                    (p.caso ? '<p class="tm-destacado">' + esc(p.caso.cierre) + '</p>' : '') +
                    (c.otras ? '<p class="tm-otras">' + esc(c.otras) + '</p>' : '') +
                '</div>' +
            '</section>';
    }


    /* =============================================================
       EXPERIENCIAS PROPIAS: cada universo con su composición
       ============================================================= */
    var gbp2 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' });
    function rolHTML(p, d) {
        return '<span class="u-rol entra" style="--d:' + (d || .1) + 's"' + (/^[A-Z][a-z]+ [A-Z]/.test(p.rolEtiqueta) ? ' lang="en"' : '') + '>' + esc(p.rolEtiqueta) + '</span>';
    }
    function avisoSim(texto) { return '<p class="x-aviso">Simulación · ' + esc(texto) + '</p>'; }

    /* ---------- FLIIA: claridad para hoy, posibilidades para mañana ---------- */
    function modeloFliia(e, extra) {
        extra = extra || {};
        var ingresos = e.ingresos + (extra.ingresos || 0);
        var variables = e.variables + (extra.gastos || 0);
        var puedes = ingresos - e.fijos - variables - e.cajitas;     /* como en Fliia: lo apartado en cajitas no se cuenta */
        var restante = e.sueno.objetivo - e.sueno.ahorrado;
        var patrimonio = e.patrimonio.reduce(function (t, x) { return t + x[1]; }, 0);
        return { ingresos: ingresos, variables: variables, puedes: puedes, restante: restante, patrimonio: patrimonio,
                 pctSueno: e.sueno.ahorrado / e.sueno.objetivo };
    }
    function textoKipu(k) {
        return k.saldo > 0 ? 'tienes ' + eur0.format(k.saldo) + ' a favor' : k.saldo < 0 ? 'debes ' + eur0.format(-k.saldo) : 'estás al día';
    }
    function respuestaDecision(e, m) {
        var queda = m.puedes - e.decision.importe;
        return (queda >= 0 ? 'Sí: con ' + eur0.format(m.puedes) + ' para gastar este mes, te quedarían ' + eur0.format(queda) + '.' :
            'Este mes no llega: tienes ' + eur0.format(Math.max(0, m.puedes)) + ' para gastar y te faltarían ' + eur0.format(-queda) + '.') +
            ' En Decisiones puedes comparar pagarlo con ahorros, a plazos, a medias o esperar.';
    }
    function escenaFliia(p, raiz, o) {
        var e = p.escena, m = modeloFliia(e), conPortada = o && o.conPortada;
        var planetas = [
            { id: 'dia', n: 'Día a día', v: eur0.format(m.variables) + ' gastados',
              d: '<p>Este mes: ' + eur0.format(m.ingresos) + ' de ingresos, ' + eur0.format(e.fijos) + ' de gastos fijos y ' + eur0.format(m.variables) + ' en el día a día.</p><ul class="fl-movs" data-movs></ul>' },
            { id: 'suenos', n: 'Sueños', v: 'faltan ' + eur0.format(m.restante),
              d: '<p class="fl-sueno-n">' + esc(e.sueno.n) + '</p><div class="fl-progreso"><i style="width:' + (m.pctSueno * 100) + '%"></i></div><p>' + eur0.format(e.sueno.ahorrado) + ' ahorrados de ' + eur0.format(e.sueno.objetivo) + '. Te faltan ' + eur0.format(m.restante) + '.</p>' },
            { id: 'patrimonio', n: 'Patrimonio', v: eur0.format(m.patrimonio),
              d: '<dl class="fl-lista">' + e.patrimonio.map(function (x) { return '<div><dt>' + esc(x[0]) + '</dt><dd>' + eur0.format(x[1]) + '</dd></div>'; }).join('') + '<div class="total"><dt>Total</dt><dd>' + eur0.format(m.patrimonio) + '</dd></div></dl>' },
            { id: 'kipus', n: 'Kipus', v: e.kipus.length + ' compartidos',
              d: '<p>Economías compartidas con otras personas, sin mezclar toda tu vida financiera.</p><dl class="fl-lista">' + e.kipus.map(function (k) { return '<div><dt>' + esc(k.n) + ' · con ' + esc(lista(k.con)) + '</dt><dd>' + textoKipu(k) + '</dd></div>'; }).join('') + '</dl>' },
            { id: 'decisiones', n: 'Decisiones', v: '1 pendiente',
              d: '<p class="fl-pregunta">' + esc(e.decision.pregunta) + '</p><button type="button" class="fl-boton" data-decidir hidden>Preguntar a Fliia</button><p class="fl-respuesta" data-respuesta></p>' }
        ];
        return '<section class="fl-escena" id="escena" aria-labelledby="fl-nombre">' +
            (conPortada ? '' : '<div class="fl-fondo" aria-hidden="true"><i></i><i></i><i></i></div>') +
            (conPortada ?
            '<header class="fl-cabecera"><h2 class="fl-lema aparece" id="fl-nombre">' + esc(e.lema) + '</h2></header>' :
            '<header class="fl-cabecera">' + rolHTML(p) +
                '<h1 class="fl-nombre entra" id="fl-nombre" style="--d:.18s">' + esc(p.nombre) + '</h1>' +
                '<p class="fl-lema entra" style="--d:.26s">' + esc(e.lema) + '</p>' +
            '</header>') +
            '<div class="fl-sistema entra" style="--d:.34s">' +
                '<svg class="fl-orbitas" viewBox="0 0 800 800" aria-hidden="true"><circle cx="400" cy="400" r="230"/><circle cx="400" cy="400" r="330" class="fina"/><circle class="fl-onda" cx="400" cy="400" r="150"/></svg>' +
                '<div class="fl-nucleo" role="status" aria-live="polite">' +
                    '<span class="et">Puedes gastar este mes</span>' +
                    '<strong class="fl-cifra" data-cifra>' + eur0.format(m.puedes) + '</strong>' +
                    '<span class="sub" data-sub>después de tus gastos fijos y lo apartado en cajitas</span>' +
                '</div>' +
                '<ul class="fl-planetas" aria-label="Dimensiones de la economía familiar">' +
                planetas.map(function (pl, k) {
                    return '<li class="fl-planeta" style="--i:' + k + '"><a href="#fl-' + pl.id + '" data-planeta="' + pl.id + '" aria-controls="fl-' + pl.id + '"><b>' + esc(pl.n) + '</b><span data-valor="' + pl.id + '">' + esc(pl.v) + '</span></a></li>';
                }).join('') +
                '</ul>' +
            '</div>' +
            '<div class="fl-detalles">' +
            planetas.map(function (pl) {
                return '<article class="fl-detalle" id="fl-' + pl.id + '"><h2>' + esc(pl.n) + '</h2>' + pl.d + '</article>';
            }).join('') +
            '</div>' +
            '<form class="fl-voz entra" style="--d:.5s" data-voz>' +
                '<button type="button" class="fl-mic" data-mic aria-label="Hablar con Fliia (simulado)" hidden><span></span></button>' +
                '<label class="solo-lectores" for="fl-frase">Dile a Fliia qué ha pasado</label>' +
                '<input id="fl-frase" autocomplete="off" placeholder="Dile a Fliia qué ha pasado…" />' +
                '<button type="submit" class="fl-enviar">Registrar</button>' +
            '</form>' +
            '<div class="fl-ejemplos entra" style="--d:.56s">' + e.ejemplos.map(function (t) { return '<button type="button" data-ejemplo hidden>' + esc(t) + '</button>'; }).join('') + '</div>' +
            '<p class="fl-msg" data-msg aria-live="polite"></p>' +
            avisoSim('familia ficticia y datos inventados. En la aplicación real, esto también se puede hacer con la voz.') +
        '</section>' +
        '<section class="x-despues"><div class="x-despues-texto aparece">' +
            '<h2>Una economía, muchas vidas.</h2>' +
            '<p>' + esc(p.problema) + '</p>' +
            '<p>' + esc(p.vision) + '</p>' +
        '</div></section>';
    }

    /* ---------- OUTBILL: del documento suelto a la gestoría ---------- */
    function formatoOutbill(e, emp, v) { return (e.empresas[emp].moneda === 'GBP' ? gbp2 : eur2).format(v); }
    function cadenaOutbill(p) {
        var e = p.escena;
        var tarjeta = function (d) {
            return '<li class="ob-doc" data-doc="' + esc(d.id) + '" data-emp="' + d.empresa + '">' +
                '<span class="ob-tipo">' + esc(d.tipo) + '</span><strong>' + esc(d.emisor) + '</strong>' +
                '<span class="ob-total">' + formatoOutbill(e, d.empresa, d.total) + '</span>' +
                '<span class="ob-campos"><span>' + esc(e.empresas[d.empresa].n) + '</span><span>' + esc(d.cat) + '</span><span>' + e.empresas[d.empresa].impuesto + ' ' + formatoOutbill(e, d.empresa, d.impuesto) + '</span></span>' +
                (d.revisar ? '<span class="ob-revisar">Revisar: ' + esc(d.revisar) + '</span>' : '') +
            '</li>';
        };
        var paquete = Object.keys(e.empresas).map(function (k) {
            var docs = e.documentos.filter(function (d) { return d.empresa === k; });
            var imp = docs.reduce(function (t, d) { return t + d.impuesto; }, 0);
            return '<div class="ob-carpeta" data-carpeta="' + k + '"><strong>' + esc(e.empresas[k].n) + '</strong>' +
                '<span><b data-n>' + docs.length + '</b> de ' + docs.length + ' documentos</span>' +
                '<span>' + e.empresas[k].impuesto + ' soportado: <b data-imp>' + formatoOutbill(e, k, imp) + '</b></span></div>';
        }).join('');
        return '<section class="ob-escena ob-secundaria" id="documentos" aria-labelledby="ob-nombre">' +
            '<header class="ob-cabecera">' +
                '<div><p class="ob-et aparece">Experiencia · lectura de documentos</p><h2 class="ob-nombre aparece" id="ob-nombre">' + esc(e.lemaDocs) + '</h2></div>' +
                '<div class="ob-contadores aparece" aria-live="polite">' +
                    '<div class="ob-contador grande"><span>Listos para la gestoría</span><strong><b data-listos>0</b> / ' + e.documentos.length + '</strong></div>' +
                    '<div class="ob-contador"><span>Datos tecleados a mano</span><strong>0</strong></div>' +
                '</div>' +
            '</header>' +
            '<div class="ob-cadena aparece">' +
            e.etapas.map(function (et, k) {
                return '<section class="ob-etapa" data-etapa="' + k + '" aria-labelledby="ob-et-' + k + '">' +
                    '<h2 id="ob-et-' + k + '"><span>' + String(k + 1).padStart(2, '0') + '</span>' + esc(et) + '</h2>' +
                    (k === 0 ? '<ol class="ob-pila">' + e.documentos.map(tarjeta).join('') + '</ol>' :
                     k === 4 ? '<div class="ob-paquete">' + paquete + '</div>' : '<ol class="ob-pila"></ol>') +
                '</section>';
            }).join('') +
            '</div>' +
            '<div class="ob-controles" data-controles hidden>' +
                '<button type="button" class="ob-boton" data-uno>Procesar el siguiente documento</button>' +
                '<button type="button" class="ob-boton principal" data-todo>Procesarlo todo</button>' +
                '<button type="button" class="ob-boton sec" data-reset>Reiniciar</button>' +
            '</div>' +
            '<p class="ob-msg" data-msg aria-live="polite"></p>' +
            avisoSim('documentos y empresas ficticios. ' + p.aviso) +
        '</section>';
    }

    /* ---------- AUTOMOTIVE FINANCE: tu día bajo control (mercado uruguayo) ---------- */
    var uy = { USD: new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
               UYU: new Intl.NumberFormat('es-UY', { style: 'currency', currency: 'UYU', maximumFractionDigits: 0 }) };
    function dineroUY(moneda, v) { return uy[moneda].format(v); }
    /* Importes por moneda, sin sumar dólares y pesos */
    function porMoneda(totales) {
        var partes = ['USD', 'UYU'].filter(function (m) { return totales[m]; }).map(function (m) { return dineroUY(m, totales[m]); });
        return partes.length ? partes.join(' · ') : dineroUY('USD', 0);
    }
    function escenaAutomotive(p, raiz, o) {
        var e = p.escena, conPortada = o && o.conPortada;
        var porCobrar = {};
        e.tareas.forEach(function (t) { if (t.tipo !== 'aviso') porCobrar[t.moneda] = (porCobrar[t.moneda] || 0) + t.importe; });
        var atencion = e.tareas.filter(function (t) { return t.tipo !== 'cobro'; }).length;
        var accion = { cobro: 'Registrar el cobro', retraso: 'Revisar el historial y preparar el aviso de atraso', aviso: 'Preparar un recordatorio amable' };
        return '<section class="am-escena" id="escena" aria-labelledby="am-nombre">' +
            '<header class="am-cabecera">' +
                (conPortada ? '<div><h2 class="am-nombre aparece" id="am-nombre">' + esc(e.lema) + '</h2></div>' :
                '<div>' + rolHTML(p) + '<h1 class="am-nombre entra" id="am-nombre" style="--d:.18s">' + esc(p.nombre) + '</h1>' +
                '<p class="am-lema entra" style="--d:.26s">' + esc(e.lema) + '</p></div>') +
                '<p class="am-fecha entra" style="--d:.3s">' + esc(e.fecha) + '<span>' + esc(e.lugar) + '</span></p>' +
            '</header>' +
            '<div class="am-kpis entra" style="--d:.36s" aria-live="polite">' +
                '<div class="am-kpi grande"><span>Por cobrar hoy</span><strong data-kpi="pendiente">' + porMoneda(porCobrar) + '</strong></div>' +
                '<div class="am-kpi"><span>Cobrado hoy</span><strong data-kpi="cobrado">' + porMoneda({}) + '</strong></div>' +
                '<div class="am-kpi"><span>Requieren atención</span><strong data-kpi="atencion">' + atencion + '</strong></div>' +
                '<div class="am-kpi"><span>Jornada</span><strong><b data-kpi="hechas">0</b> / ' + e.tareas.length + '</strong><i class="am-barra"><i data-kpi="barra"></i></i></div>' +
            '</div>' +
            '<ol class="am-dia entra" style="--d:.44s" aria-label="Tareas del día">' +
            e.tareas.map(function (t) {
                return '<li class="am-tarea" data-tarea="' + esc(t.id) + '" data-tipo="' + t.tipo + '">' +
                    '<button type="button" class="am-tarea-cab" data-elegir="' + esc(t.id) + '" aria-expanded="false">' +
                        '<span class="am-hora">' + esc(t.hora) + '</span>' +
                        '<span class="am-punto" aria-hidden="true"></span>' +
                        '<span class="am-cliente">' + esc(t.cliente) + ' <em>' + esc(t.vehiculo) + '</em></span>' +
                        '<span class="am-texto">' + esc(t.texto) + ' · cuota ' + t.cuota + ' · ' + dineroUY(t.moneda, t.importe) + '</span>' +
                    '</button>' +
                    '<div class="am-acciones" data-acciones><p class="am-accion-txt">' + esc(accion[t.tipo]) + '.</p></div>' +
                '</li>';
            }).join('') +
            '</ol>' +
            '<div class="am-final" data-final hidden><strong>Tu día, bajo control.</strong><span data-final-txt></span></div>' +
            avisoSim('automotora, clientes y cuotas ficticios. La demo no envía ningún mensaje: se preparan para enviarlos por WhatsApp o email.') +
        '</section>';
    }

    /* ---------- NÁUTICO: el valor de tu red ---------- */
    function escenaNautico(p, raiz, o) {
        var e = p.escena, conPortada = o && o.conPortada;
        return '<section class="nt-escena" id="escena" aria-labelledby="nt-nombre">' +
            '<div class="nt-mapa" data-mapa aria-hidden="true"></div>' +
            (conPortada ?
            '<header class="nt-cabecera"><h2 class="nt-nombre nt-nombre-sec aparece" id="nt-nombre">' + esc(e.lema) + '</h2></header>' :
            '<header class="nt-cabecera">' + rolHTML(p) +
                '<h1 class="nt-nombre entra" id="nt-nombre" style="--d:.18s">' + esc(p.nombre) + '</h1>' +
                '<p class="nt-lema entra" style="--d:.26s">' + esc(e.lema) + '</p>' +
            '</header>') +
            '<div class="nt-contadores entra" style="--d:.32s" aria-live="polite">' +
                '<div><strong data-c="contactos">0</strong><span>Contactos</span></div>' +
                '<div><strong data-c="entidades">0</strong><span>Empresas y barcos</span></div>' +
                '<div><strong data-c="conexiones">0</strong><span>Conexiones</span></div>' +
            '</div>' +
            '<div class="nt-tarjetas entra" style="--d:.4s">' +
                '<p class="nt-et">Tarjetas recogidas en el ' + esc(e.evento) + '. Pulsa una para digitalizarla.</p>' +
                '<ul>' + e.tarjetas.map(function (t) {
                    return '<li><button type="button" class="nt-tarjeta" data-tarjeta="' + esc(t.id) + '">' +
                        '<strong>' + esc(t.n) + '</strong><span>' + esc(t.cargo) + '</span>' +
                        '<em>' + esc(t.empresa || t.barco) + ' · ' + esc(t.ciudad) + '</em></button></li>';
                }).join('') + '</ul>' +
            '</div>' +
            '<div class="nt-busqueda entra" style="--d:.48s">' +
                '<p class="nt-et">Cuando surge una oportunidad</p>' +
                '<button type="button" class="nt-buscar" data-buscar disabled>' + esc(e.busqueda.texto) + '</button>' +
                '<p class="nt-resultado" data-resultado aria-live="polite"></p>' +
            '</div>' +
            avisoSim('personas, empresas, barcos y evento ficticios.') +
        '</section>' +
        '<section class="x-despues"><div class="x-despues-texto aparece">' +
            '<h2>Cada contacto, con su contexto.</h2>' +
            '<p>' + esc(p.problema) + '</p>' +
            '<p>' + esc(p.ejemplo) + '</p>' +
        '</div></section>';
    }


    /* ---------- OUTBILL: todas tus empresas, todas tus cuentas, un solo lugar ---------- */
    var gbp0 = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });
    function dineroOutbill(n, v) { return (n.moneda === 'GBP' ? gbp0 : eur0).format(v); }
    function estadoNegocio(n, pendientes) {
        return pendientes > 0 ? { ok: false, txt: (pendientes === 1 ? 'Falta 1 movimiento' : 'Faltan ' + pendientes + ' movimientos') + ' por conciliar' } : { ok: true, txt: 'Lista para la gestoría' };
    }
    /* Una empresa: lo que se ve al elegirla en el selector */
    function detalleNegocio(n, pendientes, periodo) {
        var est = estadoNegocio(n, pendientes);
        return '<article class="obh-detalle' + (est.ok ? ' ok' : '') + '" data-detalle="' + esc(n.id) + '">' +
            '<header><strong>' + esc(n.n) + '</strong><span>' + esc(n.pais) + ' · ' + esc(n.moneda) + ' · ' + esc(periodo.toLowerCase()) + '</span></header>' +
            '<div class="obh-cifras"><div><span>Ingresos</span><b>' + dineroOutbill(n, n.ingresos) + '</b></div><div><span>Gastos</span><b>' + dineroOutbill(n, n.gastos) + '</b></div><div class="res"><span>Resultado</span><b>' + dineroOutbill(n, n.ingresos - n.gastos) + '</b></div></div>' +
            '<p class="obh-estado">' + esc(est.txt) + '</p>' +
            (pendientes ? '<button type="button" class="ob-boton principal" data-conciliar="' + esc(n.id) + '" hidden>Conciliar ' + (pendientes === 1 ? 'el movimiento pendiente' : 'los ' + pendientes + ' movimientos pendientes') + '</button>' :
                '<p class="obh-listo">✓ Documentos revisados, banco conciliado e ' + esc(n.impuesto) + ' estimado: listo para exportar a la gestoría.</p>') +
        '</article>';
    }
    function escenaOutbill(p) {
        var e = p.escena;
        var entradas = [
            { id: 'recibidas', t: 'Tickets y facturas', s: 'Lectura con IA' },
            { id: 'emitidas', t: 'Facturas emitidas', s: 'Facturación' },
            { id: 'banco', t: 'Movimientos bancarios', s: 'Conciliación desde extractos' },
            { id: 'holded', t: 'Datos de Holded', s: 'Importación de archivos' }
        ];
        var salidas = [
            { id: 'contabilidad', t: 'Contabilidad', s: 'Libro contable de la empresa' },
            { id: 'impuestos', t: 'Impuestos preparados', s: 'Estimación orientativa' },
            { id: 'gestoria', t: 'Paquete para la gestoría', s: 'Datos y justificantes para exportar' }
        ];
        var n0 = e.negocios[0];
        return '<section class="obh-escena" id="escena" aria-labelledby="obh-titulo">' +
            '<header class="obh-cabecera">' + rolHTML(p) +
                '<h1 class="obh-titulo entra" id="obh-titulo" style="--d:.18s"><span class="obh-marca">' + esc(p.nombre) + '</span>' + esc(e.lema) + '</h1>' +
                '<p class="obh-beneficio entra" style="--d:.28s">' + esc(e.beneficio) + '</p>' +
            '</header>' +
            '<div class="obh-tablero entra" style="--d:.38s">' +
                '<section class="obh-col obh-entradas" aria-labelledby="obh-in"><h2 id="obh-in">Lo que entra</h2><ul>' +
                entradas.map(function (x) {
                    return '<li data-in="' + x.id + '"><span class="obh-ico" aria-hidden="true"></span><div><strong>' + esc(x.t) + '</strong><span>' + esc(x.s) + '</span></div><b data-v="' + x.id + '"></b></li>';
                }).join('') + '</ul></section>' +
                '<section class="obh-centro" aria-labelledby="obh-emp"><h2 id="obh-emp">' + esc(e.periodo) + ' · tus empresas</h2>' +
                    '<div class="obh-tabs" role="tablist" aria-label="Empresa activa">' +
                        e.negocios.map(function (n, k) { return '<button type="button" role="tab" data-tab="' + esc(n.id) + '" aria-selected="' + (k === 0) + '"><span>' + esc(n.n) + '</span><em>' + esc(n.pais) + '</em></button>'; }).join('') +
                    '</div>' +
                    '<div class="obh-panel" data-panel>' + e.negocios.map(function (n) { return detalleNegocio(n, n.pendientes, e.periodo); }).join('') + '</div>' +
                '</section>' +
                '<section class="obh-col obh-salidas" aria-labelledby="obh-out"><h2 id="obh-out">Lo que obtienes</h2><ul>' +
                salidas.map(function (x) {
                    return '<li data-out="' + x.id + '"><div><strong>' + esc(x.t) + '</strong><span data-sub="' + x.id + '">' + esc(x.s) + '</span></div><b data-o="' + x.id + '"></b></li>';
                }).join('') + '</ul></section>' +
            '</div>' +
            avisoSim('empresas y cifras ficticias. ' + p.aviso) +
        '</section>' + cadenaOutbill(p);
    }

    var experiencias = { fliia: escenaFliia, outbill: escenaOutbill, automotive: escenaAutomotive, nautico: escenaNautico };

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

        var propia = p.experiencia && experiencias[p.experiencia];
        var conPortada = !!(propia && p.portada);
        if (conPortada || (!p.centro && !propia)) html += '<section class="u-hero" id="inicio">' +
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
            '<a href="' + (propia ? '#escena' : p.centro ? '#centro' : '#problema') + '" class="u-bajar" aria-label="Empezar">↓</a>' +
        '</section>';
        if (propia) html += propia(p, raiz, { conPortada: conPortada });

        if (p.centro) html += centroTimon(p) + despuesTimon(p, raiz);
        else if (!propia) {
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
        }

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
        /* Tarjeta con la identidad de su universo: su color, su fondo y su motivo gráfico */
        function enlaceUniverso(p) {
            return '<a class="mini-entrar" href="' + esc(p.pagina) + '" data-entrar="' + esc(p.id) + '">Entrar en el universo ' + esc(p.nombre) + ' <span aria-hidden="true">→</span></a>';
        }
        function tarjeta(p, i, extra) {
            var grande = p.rol === 'caso' || p.rol === 'insignia';
            var claro = /^#f|^#ff/i.test(p.tema.fondo);
            return '<article class="mini reveal' + (grande ? ' grande' : '') + (claro ? ' claro' : '') + '" data-proyecto="' + esc(p.id) + '" style="--d:' + (i * 0.07) + 's;--acento:' + esc(p.tema.color) + ';--fondo-p:' + esc(p.tema.fondo) + '">' +
                '<div class="mini-visual" aria-hidden="true">' + (escenas[p.id] || '') + '</div>' +
                '<div class="mini-cuerpo">' +
                    '<span class="mini-rol"' + (/^[A-Z][a-z]+ [A-Z]/.test(p.rolEtiqueta) ? ' lang="en"' : '') + '>' + esc(p.rolEtiqueta) + '</span>' +
                    '<div class="mini-top"><h3>' + esc(p.nombre) + '</h3><span class="estado">' + esc(p.estado) + '</span></div>' +
                    '<p class="mini-claim">' + esc(p.claim) + '</p>' +
                    (extra || '<p class="mini-texto">' + esc(p.solucionCorta) + '</p>') +
                    '<div class="mini-acciones">' + enlaceUniverso(p) +
                        (p.url ? '<a class="enlace-externo" href="' + esc(p.url) + '" target="_blank" rel="noopener" data-evento="web-' + esc(p.id) + '">' + esc(p.url.replace(/^https?:\/\//, '')) + ' ↗</a>' : '') +
                        (p.rol === 'caso' ? '<a class="enlace-externo" href="#contacto" data-evento="cta-caso-' + esc(p.id) + '">¿Qué proceso de tu empresa podríamos transformar? ↗</a>' : '') +
                    '</div>' +
                '</div>' +
            '</article>';
        }
        function respuestasCaso(p) {
            var r = (p.caso && p.caso.pares || []).map(function (x) { return x.despues.replace(/\.$/, ''); });
            return '<ul class="mini-tags">' + r.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
        }
        var casos = proyectos.filter(function (p) { return p.rol === 'caso'; });
        var resto = proyectos.filter(function (p) { return p.rol !== 'caso'; });
        return {
            caso: casos.map(function (p, i) { return tarjeta(p, i, respuestasCaso(p)); }).join(''),
            tarjetas: resto.map(function (p, i) { return tarjeta(p, i + 1); }).join('')
        };
    }

    var api = { esc: esc, escenas: escenas, universo: universo, portada: portada, modeloTimon: modeloTimon, lecturaTimon: lecturaTimon, valorTimon: valorTimon, nombreMes: nombreMes,
        modeloFliia: modeloFliia, respuestaDecision: respuestaDecision, formatoOutbill: formatoOutbill,
        dineroOutbill: dineroOutbill, estadoNegocio: estadoNegocio, detalleNegocio: detalleNegocio,
        dineroUY: dineroUY, porMoneda: porMoneda };
    raizGlobal.DFS_PLANTILLAS = api;
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
