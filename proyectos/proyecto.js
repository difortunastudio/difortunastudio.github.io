/* =====================================================================
   UNIVERSOS DE PRODUCTO
   El contenido lo escribe generar.mjs en el HTML. Este script añade la
   experiencia: transiciones, apariciones y demos interactivas.
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

    /* El contenido de la página ya viene escrito en el HTML (generar.mjs). */

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

    if (caja && demos[p.demo]) demos[p.demo]();

    /* =============================================================
       TIMÓN · CENTRO DE MANDO
       La esfera gira para traer la pregunta elegida hacia el panel.
       Todas las vistas comparten la misma empresa ficticia.
       ============================================================= */
    if (p.centro && window.DFS_PLANTILLAS) iniciarCentro();
    if (p.experiencia && window.DFS_PLANTILLAS) {
        var exp = { fliia: expFliia, outbill: expOutbill, automotive: expAutomotive, nautico: expNautico }[p.experiencia];
        if (exp) { document.body.classList.add('exp-viva'); exp(window.DFS_PLANTILLAS, p.escena); }
    }

    function mostrarOcultos(raizEl) {
        raizEl.querySelectorAll('[hidden][data-mic], [hidden][data-ejemplo], [hidden][data-decidir], [hidden][data-controles]').forEach(function (el) { el.hidden = false; });
    }

    /* =============================================================
       FLIIA · una economía viva que responde a lo que dices
       ============================================================= */
    function expFliia(P, e) {
        var escena = document.getElementById('escena');
        mostrarOcultos(escena);
        var extra = { ingresos: 0, gastos: 0 }, movs = [];
        var cifra = escena.querySelector('[data-cifra]'), sub = escena.querySelector('[data-sub]');
        var msg = escena.querySelector('[data-msg]'), input = document.getElementById('fl-frase');
        var e0 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
        var e2 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });
        var planetas = escena.querySelectorAll('[data-planeta]'), detalles = escena.querySelectorAll('.fl-detalle');
        var actual = null, ultimo = P.modeloFliia(e).puedes;

        function abrir(id) {
            actual = actual === id ? null : id;
            planetas.forEach(function (a) { a.setAttribute('aria-expanded', a.getAttribute('data-planeta') === actual ? 'true' : 'false'); });
            detalles.forEach(function (d) { d.hidden = d.id !== 'fl-' + actual; });
            escena.classList.toggle('con-detalle', !!actual);
            if (actual) medir('fliia-' + actual, true);
        }
        planetas.forEach(function (a) {
            a.addEventListener('click', function (ev) { ev.preventDefault(); abrir(a.getAttribute('data-planeta')); });
        });
        detalles.forEach(function (d) {
            d.hidden = true;
            var cerrar = document.createElement('button');
            cerrar.type = 'button'; cerrar.className = 'fl-cerrar'; cerrar.setAttribute('aria-label', 'Cerrar'); cerrar.textContent = '✕';
            cerrar.addEventListener('click', function () { abrir(actual); });
            d.insertBefore(cerrar, d.firstChild);
        });

        function pintar(pulso) {
            var m = P.modeloFliia(e, extra);
            animarCifra(cifra, ultimo, m.puedes, function (v) { return e0.format(v); });
            ultimo = m.puedes;
            sub.textContent = m.puedes >= 0 ? 'sin tocar tu colchón de ' + e0.format(e.colchon) : 'tendrías que tocar el colchón';
            escena.querySelector('[data-valor="dia"]').textContent = e0.format(m.variables) + ' gastados';
            escena.querySelector('[data-futuro]').textContent = P.frasesSueno(e, m);
            escena.querySelector('[data-valor="suenos"]').textContent = m.meses ? 'en ' + m.meses + (m.meses === 1 ? ' mes' : ' meses') : 'en pausa';
            escena.querySelector('[data-movs]').innerHTML = movs.slice(0, 4).map(function (x) {
                return '<li><span>' + esc(x.c) + '</span><b>' + (x.v > 0 ? '+' : '') + e2.format(x.v) + '</b></li>';
            }).join('');
            if (pulso && !sinMovimiento) {
                escena.classList.remove('pulso'); void escena.offsetWidth; escena.classList.add('pulso');
                pulso.forEach(function (id) {
                    var pl = escena.querySelector('[data-planeta="' + id + '"]').parentNode;
                    pl.classList.remove('late'); void pl.offsetWidth; pl.classList.add('late');
                });
            }
            return m;
        }

        var categorias = [
            [/s[uú]per|mercado|compra|fruta|panader/i, 'Supermercado'],
            [/cena|comida|restaurante|caf[eé]|bar\b/i, 'Restauración'],
            [/gasolina|parking|taxi|tren|metro|bus/i, 'Transporte'],
            [/farmacia|m[eé]dico|dentista/i, 'Salud']
        ];
        function registrar(texto) {
            var mm = texto.match(/(\d{1,6}(?:[.,]\d{1,2})?)\s*(?:€|eur|euros?)?/i);
            if (!mm) { msg.textContent = 'No encuentro el importe. Prueba con algo como «Gasté 12 € en la farmacia».'; return; }
            var importe = parseFloat(mm[1].replace(',', '.'));
            if (!(importe > 0) || importe > 100000) { msg.textContent = 'Prueba con un importe entre 1 € y 100.000 €.'; return; }
            var ingreso = /ingres|cobr|me han pagado|n[oó]mina|recib/i.test(texto);
            var concepto = ingreso ? 'Ingreso extra' : 'Gasto';
            categorias.forEach(function (c) { if (concepto === 'Gasto' && c[0].test(texto)) concepto = c[1]; });
            if (ingreso) extra.ingresos += importe; else extra.gastos += importe;
            movs.unshift({ c: concepto, v: ingreso ? importe : -importe });
            var m = pintar(['dia', 'suenos']);
            msg.textContent = (ingreso ? 'Ingreso de ' : 'Gasto de ') + e2.format(importe) + ' registrado. ' +
                (m.puedes >= 0 ? 'Puedes gastar ' + e0.format(m.puedes) + ' este mes' : 'Este mes tendrías que tocar el colchón') +
                (m.meses ? ' y el viaje queda a ' + m.meses + (m.meses === 1 ? ' mes.' : ' meses.') : '.');
            medir('demo-fliia', true);
        }

        escena.querySelector('[data-voz]').addEventListener('submit', function (ev) {
            ev.preventDefault();
            if (input.value.trim()) { registrar(input.value.trim()); input.value = ''; }
        });
        escena.querySelectorAll('[data-ejemplo]').forEach(function (b) {
            b.addEventListener('click', function () { registrar(b.textContent); });
        });

        /* Micrófono simulado: escribe una frase como si se dictara */
        var dictados = e.ejemplos.slice(), nDict = 0, escuchando = false;
        escena.querySelector('[data-mic]').addEventListener('click', function () {
            if (escuchando) return;
            escuchando = true;
            var boton = this, frase = dictados[nDict++ % dictados.length], k = 0;
            boton.classList.add('escuchando');
            input.value = '';
            input.placeholder = 'Escuchando… (simulado)';
            var t = setInterval(function () {
                input.value = frase.slice(0, ++k);
                if (k >= frase.length) {
                    clearInterval(t);
                    setTimeout(function () {
                        boton.classList.remove('escuchando');
                        input.placeholder = 'Dile a Fliia qué ha pasado…';
                        registrar(input.value); input.value = ''; escuchando = false;
                    }, 350);
                }
            }, sinMovimiento ? 0 : 38);
        });

        escena.querySelector('[data-decidir]').addEventListener('click', function () {
            var m = P.modeloFliia(e, extra), despues = m.puedes - e.decision.importe;
            var conDecision = P.modeloFliia(e, { ingresos: extra.ingresos, gastos: extra.gastos + e.decision.importe });
            escena.querySelector('[data-respuesta]').textContent = despues >= 0 ?
                'Sí. Después de la compra podrías gastar ' + e0.format(despues) + ' este mes sin tocar el colchón. ' + P.frasesSueno(e, conDecision) :
                'Mejor esperar: faltarían ' + e0.format(-despues) + ' para no tocar el colchón y el viaje quedaría en pausa este mes.';
            medir('fliia-decision', true);
        });
        pintar();
    }

    /* =============================================================
       OUTBILL · la pila de documentos se convierte en orden
       ============================================================= */
    function expOutbill(P, e) {
        var escena = document.getElementById('escena');
        mostrarOcultos(escena);
        var pilas = Array.prototype.map.call(escena.querySelectorAll('.ob-etapa'), function (et) { return et.querySelector('.ob-pila'); });
        var listos = escena.querySelector('[data-listos]'), msg = escena.querySelector('[data-msg]');
        var paso = sinMovimiento ? 0 : 520, enCurso = 0, hechos = 0, cola = [];
        var original = pilas[0].innerHTML;

        function carpetas() {
            Object.keys(e.empresas).forEach(function (k) {
                var docs = e.documentos.filter(function (d) { return d.empresa === k; });
                var dentro = docs.filter(function (d) { return d.listo; });
                var c = escena.querySelector('[data-carpeta="' + k + '"]');
                c.querySelector('[data-n]').textContent = dentro.length;
                c.querySelector('[data-imp]').textContent = P.formatoOutbill(e, k, dentro.reduce(function (t, d) { return t + d.impuesto; }, 0));
                c.classList.toggle('llena', dentro.length === docs.length);
            });
            listos.textContent = hechos;
        }
        function mover(li, etapa) {
            li.classList.remove('entra-doc'); void li.offsetWidth;
            pilas[etapa].appendChild(li);
            li.classList.add('entra-doc');
            li.setAttribute('data-en', etapa);
        }
        function procesar(li, fin) {
            var d = e.documentos.filter(function (x) { return x.id === li.getAttribute('data-doc'); })[0];
            enCurso++;
            mover(li, 1); li.classList.add('leyendo');
            setTimeout(function () {
                li.classList.remove('leyendo'); li.classList.add('leido');
                mover(li, 2); li.classList.add('ordenado');
                setTimeout(function () {
                    mover(li, 3);
                    var terminar = function () {
                        li.classList.add('revisado');
                        setTimeout(function () {
                            li.classList.add('archivado');
                            setTimeout(function () {
                                li.remove(); d.listo = true; hechos++; enCurso--; carpetas();
                                if (hechos === e.documentos.length) {
                                    msg.textContent = 'Todo listo: la documentación de las dos empresas está ordenada y preparada para la gestoría, sin teclear un solo dato.';
                                    escena.classList.add('completo');
                                }
                                if (fin) fin();
                            }, paso * 0.6);
                        }, paso * 0.6);
                    };
                    if (d.revisar) {
                        li.classList.add('pide-revision');
                        var b = document.createElement('button');
                        b.type = 'button'; b.className = 'ob-confirmar'; b.textContent = 'Confirmar';
                        b.addEventListener('click', function () { b.remove(); li.classList.remove('pide-revision'); msg.textContent = ''; terminar(); });
                        li.appendChild(b);
                        msg.textContent = 'Un documento necesita tu revisión: ' + d.emisor + ' (' + d.revisar.toLowerCase() + ').';
                        b.focus({ preventScroll: true });
                    } else setTimeout(terminar, paso * 0.5);
                }, paso);
            }, paso * 1.4);
        }
        function siguiente(fin) {
            var li = pilas[0].querySelector('.ob-doc');
            if (li) { procesar(li, fin); medir('demo-outbill', true); return true; }
            return false;
        }
        escena.querySelector('[data-uno]').addEventListener('click', function () { siguiente(); });
        escena.querySelector('[data-todo]').addEventListener('click', function () {
            var n = 0;
            while (siguiente()) { n++; if (n > 20) break; }
            /* escalonar la salida */
            Array.prototype.forEach.call(escena.querySelectorAll('.ob-doc'), function (li, k) { li.style.transitionDelay = (k * 60) + 'ms'; });
        });
        escena.querySelector('[data-reset]').addEventListener('click', function () {
            if (enCurso) return;
            pilas.forEach(function (p, k) { if (p) p.innerHTML = k === 0 ? original : ''; });
            e.documentos.forEach(function (d) { d.listo = false; });
            hechos = 0; msg.textContent = ''; escena.classList.remove('completo'); carpetas();
        });
        e.documentos.forEach(function (d) { d.listo = false; });
        carpetas();
    }

    /* =============================================================
       AUTOMOTIVE · una jornada que avanza con cada acción
       ============================================================= */
    function expAutomotive(P, e) {
        var escena = document.getElementById('escena');
        var e0 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
        var estado = { cobrado: 0, pendiente: 0, atencion: 0, hechas: 0, seguimiento: 0, avisos: 0 };
        e.tareas.forEach(function (t) {
            if (t.tipo !== 'aviso') estado.pendiente += t.importe;
            if (t.tipo !== 'cobro') estado.atencion++;
        });
        var kpi = function (k) { return escena.querySelector('[data-kpi="' + k + '"]'); };
        function pintar() {
            kpi('pendiente').textContent = e0.format(estado.pendiente);
            kpi('cobrado').textContent = e0.format(estado.cobrado);
            kpi('atencion').textContent = estado.atencion;
            kpi('hechas').textContent = estado.hechas;
            kpi('barra').style.width = (estado.hechas / e.tareas.length * 100) + '%';
            if (estado.hechas === e.tareas.length) {
                var f = escena.querySelector('[data-final]');
                f.hidden = false;
                escena.querySelector('[data-final-txt]').textContent = 'Cobrado hoy: ' + e0.format(estado.cobrado) + '. ' +
                    (estado.seguimiento ? estado.seguimiento + ' cuota en seguimiento, con la gestión registrada. ' : '') +
                    (estado.avisos ? estado.avisos + ' aviso programado.' : '');
            }
        }
        function elegir(id) {
            escena.querySelectorAll('.am-tarea').forEach(function (li) {
                var si = li.getAttribute('data-tarea') === id;
                li.classList.toggle('actual', si);
                li.querySelector('.am-tarea-cab').setAttribute('aria-expanded', si ? 'true' : 'false');
            });
        }
        function hecha(li, texto) {
            li.classList.add('hecha'); li.classList.remove('actual');
            li.querySelector('[data-acciones]').innerHTML = '<p class="am-ok">✓ ' + esc(texto) + '</p>';
            estado.hechas++;
            var sig = escena.querySelector('.am-tarea:not(.hecha)');
            if (sig) elegir(sig.getAttribute('data-tarea'));
            pintar();
            medir('demo-automotive', true);
        }
        e.tareas.forEach(function (t) {
            var li = escena.querySelector('[data-tarea="' + t.id + '"]'), acc = li.querySelector('[data-acciones]');
            li.querySelector('[data-elegir]').addEventListener('click', function () { if (!li.classList.contains('hecha')) elegir(t.id); });
            if (t.tipo === 'cobro') {
                acc.innerHTML = '<p class="am-accion-txt">El cliente ha pagado la cuota ' + t.cuota + '.</p><button type="button" class="am-boton">Registrar cobro de ' + e0.format(t.importe) + '</button>';
                acc.querySelector('button').addEventListener('click', function () {
                    estado.cobrado += t.importe; estado.pendiente -= t.importe;
                    hecha(li, 'Cobro de ' + e0.format(t.importe) + ' registrado');
                });
            } else if (t.tipo === 'retraso') {
                acc.innerHTML = '<p class="am-accion-txt">La cuota ' + t.cuota + ' venció hace ' + t.dias + ' días y no consta como pagada.</p>' +
                    '<div class="am-botones"><button type="button" class="am-boton sec" data-hist>Ver historial</button><button type="button" class="am-boton" data-prep>Preparar comunicación</button></div>' +
                    '<ul class="am-historial" hidden>' + t.historial.map(function (h) { return '<li>' + esc(h) + '</li>'; }).join('') + '</ul><div data-carta></div>';
                acc.querySelector('[data-hist]').addEventListener('click', function () {
                    var ul = acc.querySelector('.am-historial'); ul.hidden = !ul.hidden;
                    this.textContent = ul.hidden ? 'Ver historial' : 'Ocultar historial';
                });
                acc.querySelector('[data-prep]').addEventListener('click', function () {
                    this.remove();
                    acc.querySelector('[data-carta]').innerHTML =
                        '<div class="am-carta">Hola, ' + esc(t.cliente) + ':\n\nTe escribimos porque la cuota n.º ' + t.cuota + ' de la financiación de tu vehículo, por importe de ' + e0.format(t.importe) + ', venció el 5 de marzo y todavía no consta como pagada.\n\nSi ya la has abonado, puedes ignorar este mensaje. Si necesitas organizar el pago, estamos a tu disposición.\n\nUn saludo.</div>' +
                        '<button type="button" class="am-boton" data-reg>Registrar gestión</button>';
                    acc.querySelector('[data-reg]').addEventListener('click', function () {
                        estado.atencion--; estado.seguimiento++;
                        hecha(li, 'Comunicación preparada y gestión registrada en el historial');
                    });
                });
            } else if (t.tipo === 'aviso') {
                acc.innerHTML = '<p class="am-accion-txt">La cuota ' + t.cuota + ' (' + e0.format(t.importe) + ') vence el 18 de marzo.</p><button type="button" class="am-boton">Programar aviso para el 17 de marzo</button>';
                acc.querySelector('button').addEventListener('click', function () {
                    estado.atencion--; estado.avisos++;
                    hecha(li, 'Aviso programado para el 17 de marzo');
                });
            }
        });
        elegir(e.tareas[0].id);
        pintar();
    }

    /* =============================================================
       NÁUTICO · una red que crece con cada tarjeta
       ============================================================= */
    function expNautico(P, e) {
        var escena = document.getElementById('escena');
        var mapa = escena.querySelector('[data-mapa]');
        var pos = {
            yo: [600, 300], evento: [600, 100],
            marta: [800, 200], jordi: [390, 200], ana: [400, 385], luca: [1000, 310],
            'Astillero Demo': [1010, 165], 'M/Y Demo One': [200, 280], 'Broker Demo': [200, 380]
        };
        var nodos = { yo: { t: 'yo', n: 'Tú' }, evento: { t: 'evento', n: e.evento } };
        var enlaces = [['yo', 'evento']];
        var ruta = [], resaltados = {};

        function forma(id, n) {
            var x = pos[id][0], y = pos[id][1], cls = 'nt-n nt-' + n.t + (n.nuevo ? ' nuevo' : '') + (ruta.indexOf(id) > -1 ? ' ruta' : '');
            var f = n.t === 'empresa' ? '<rect x="' + (x - 13) + '" y="' + (y - 13) + '" width="26" height="26" rx="5"/>' :
                n.t === 'barco' ? '<path d="M' + x + ' ' + (y - 15) + 'L' + (x + 15) + ' ' + (y + 12) + 'H' + (x - 15) + 'Z"/>' :
                n.t === 'evento' ? '<path d="M' + x + ' ' + (y - 16) + 'L' + (x + 16) + ' ' + y + 'L' + x + ' ' + (y + 16) + 'L' + (x - 16) + ' ' + y + 'Z"/>' :
                '<circle cx="' + x + '" cy="' + y + '" r="' + (n.t === 'yo' ? 16 : 11) + '"/>';
            return '<g class="' + cls + '">' + f + '<text x="' + x + '" y="' + (y + (n.t === 'yo' ? 36 : 32)) + '">' + esc(n.n) + '</text>' +
                (n.sub ? '<text class="sub" x="' + x + '" y="' + (y + 48) + '">' + esc(n.sub) + '</text>' : '') + '</g>';
        }
        function dibujar() {
            var enRuta = function (a, b) { return !!(resaltados[a + '|' + b] || resaltados[b + '|' + a]); };
            var estrecho = window.matchMedia('(max-width: 900px)').matches;
            mapa.innerHTML = '<svg viewBox="' + (estrecho ? '70 45 1060 420' : '0 0 1200 700') + '" preserveAspectRatio="xMidYMid meet">' +
                '<g class="nt-olas"><path d="M0 640C200 600 380 680 600 640S980 590 1200 650"/><path d="M0 675C220 635 400 715 620 675S1000 625 1200 685"/></g>' +
                enlaces.map(function (l) {
                    var a = pos[l[0]], b = pos[l[1]];
                    return '<line class="nt-l' + (l[2] ? ' nuevo' : '') + (enRuta(l[0], l[1]) ? ' ruta' : '') + '" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>';
                }).join('') +
                Object.keys(nodos).map(function (k) { return forma(k, nodos[k]); }).join('') + '</svg>';
            Object.keys(nodos).forEach(function (k) { nodos[k].nuevo = false; });
            enlaces.forEach(function (l) { l[2] = false; });
            var personas = Object.keys(nodos).filter(function (k) { return nodos[k].t === 'persona'; }).length;
            var entidades = Object.keys(nodos).filter(function (k) { return nodos[k].t === 'empresa' || nodos[k].t === 'barco'; }).length;
            escena.querySelector('[data-c="contactos"]').textContent = personas;
            escena.querySelector('[data-c="entidades"]').textContent = entidades;
            escena.querySelector('[data-c="conexiones"]').textContent = enlaces.length - 1;
        }
        function enlazar(a, b) { enlaces.push([a, b, true]); }

        escena.querySelectorAll('[data-tarjeta]').forEach(function (b) {
            b.addEventListener('click', function () {
                if (b.disabled) return;
                var t = e.tarjetas.filter(function (x) { return x.id === b.getAttribute('data-tarjeta'); })[0];
                b.disabled = true; b.classList.add('escaneando');
                setTimeout(function () {
                    b.classList.remove('escaneando'); b.classList.add('digitalizada');
                    nodos[t.id] = { t: 'persona', n: t.n, sub: t.cargo, nuevo: true };
                    enlazar('yo', t.id); enlazar(t.id, 'evento');
                    var ent = t.empresa || t.barco;
                    if (!nodos[ent]) nodos[ent] = { t: t.empresa ? 'empresa' : 'barco', n: ent, nuevo: true };
                    enlazar(t.id, ent);
                    ruta = []; resaltados = {};
                    dibujar();
                    escena.querySelector('[data-buscar]').disabled = false;
                    medir('demo-nautico', true);
                }, sinMovimiento ? 0 : 900);
            });
        });
        escena.querySelector('[data-buscar]').addEventListener('click', function () {
            var destino = e.busqueda.destino;
            var res = escena.querySelector('[data-resultado]');
            var quienes = e.tarjetas.filter(function (t) { return nodos[t.id] && t.empresa === destino; });
            if (!quienes.length) {
                ruta = []; resaltados = {};
                res.textContent = 'Todavía no hay nadie de ' + destino + ' en tu red. Digitaliza más tarjetas de la feria.';
            } else {
                ruta = ['yo', destino]; resaltados = {};
                quienes.forEach(function (t) { ruta.push(t.id); resaltados['yo|' + t.id] = 1; resaltados[t.id + '|' + destino] = 1; });
                res.textContent = quienes.map(function (t) { return t.n + ' (' + t.cargo + ', ' + t.ciudad + ')'; }).join(' y ') +
                    (quienes.length > 1 ? ' trabajan' : ' trabaja') + ' en ' + destino + '. ' + (quienes.length > 1 ? 'Los conociste' : 'La conociste') + ' en el ' + e.evento + ': ya tienes por dónde empezar.';
            }
            dibujar();
            medir('nautico-oportunidad', true);
        });
        dibujar();
    }

    function iniciarCentro() {
        var P = window.DFS_PLANTILLAS, c = p.centro, e = c.empresa;
        var centro = document.getElementById('centro');
        var anillo = centro.querySelector('.tm-anillo');
        var display = centro.querySelector('.tm-display');
        var displayEt = centro.querySelector('.tm-display-et');
        function mostrar(m) {
            var q = c.preguntas.filter(function (x) { return x.id === actual; })[0];
            var v = P.valorTimon(actual, m, estado.modoDep);
            display.textContent = v.esfera;
            displayEt.textContent = q.etiqueta.toUpperCase();
            document.getElementById('q-' + actual).querySelector('.tm-valor').textContent = v.valor;
        }
        var tabs = Array.prototype.slice.call(centro.querySelectorAll('[role="tab"]'));
        var paneles = Array.prototype.slice.call(centro.querySelectorAll('[role="tabpanel"]'));
        var nodos = Array.prototype.slice.call(centro.querySelectorAll('.tm-nodo'));
        var e0 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
        var e2 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
        var corto = function (v) { return Math.abs(v) >= 1000 ? (Math.round(v / 1000) + ' k€') : e0.format(v); };
        var base = P.modeloTimon(e);
        var estado = { reservas: e.reservas, modoDep: 'euros', estructura: e.estructura, horas: e.horasPersona, cliente: null, reparto: Math.round(base.repartible / 10000) * 10000 };
        var actual = null;

        centro.classList.add('interactivo');

        function lectura(id, m) { return P.lecturaTimon(id, e, m, base); }
        function panel(id) { return document.getElementById('q-' + id); }
        function ponLectura(id, m) { panel(id).querySelector('.tm-lectura').textContent = lectura(id, m); }
        function rango(id, etiqueta, min, max, paso, valor, formato) {
            return '<div class="demo-control tm-control"><label for="' + id + '"><span>' + etiqueta + '</span><strong id="' + id + '-v">' + formato(valor) + '</strong></label>' +
                '<input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + paso + '" value="' + valor + '" /></div>';
        }

        /* ---------- Las seis vistas ---------- */
        var vistas = {
            socios: function (viz) {
                viz.innerHTML = rango('tv-res', 'Destinar a reservas', 0, 40, 5, estado.reservas, function (v) { return v + ' %'; }) +
                    '<div class="tm-orbes" id="tv-orbes"></div><div class="tm-alerta" id="tv-alerta" hidden></div>';
                var r = viz.querySelector('#tv-res');
                function pintar() {
                    estado.reservas = +r.value;
                    viz.querySelector('#tv-res-v').textContent = r.value + ' %';
                    var m = P.modeloTimon(e, { reservas: estado.reservas });
                    var max = P.modeloTimon(e, { reservas: 0 }).socios[0].importe;
                    viz.querySelector('#tv-orbes').innerHTML = m.socios.map(function (s) {
                        var t = 56 + 74 * Math.sqrt(s.importe / max);
                        return '<div class="tm-orbe"><span style="width:' + t + 'px;height:' + t + 'px"><b>' + s.pct + '%</b></span><strong>' + e0.format(s.importe) + '</strong><em>' + s.n + '</em></div>';
                    }).join('') + '<div class="tm-orbe res"><span style="width:56px;height:56px"><b>Res.</b></span><strong>' + e0.format(m.beneficio - m.repartible) + '</strong><em>Reservas</em></div>';
                    var al = viz.querySelector('#tv-alerta');
                    al.hidden = m.repartible <= m.maxReparto;
                    al.innerHTML = 'Hay beneficio, pero la tesorería solo permite repartir hoy ' + e0.format(m.maxReparto) + '. <button type="button" data-ir="tesoreria">Ver tesorería →</button>';
                    ponLectura('socios', m);
                    return m;
                }
                r.addEventListener('input', function () { mostrar(pintar()); usadaCentro(); });
                return pintar;
            },

            departamentos: function (viz) {
                viz.innerHTML = '<div class="tm-conmuta" role="group" aria-label="Unidad"><button type="button" data-modo="euros">En euros</button><button type="button" data-modo="pct">En % de sus ingresos</button></div><div id="tv-deps"></div>';
                function pintar() {
                    var m = base;
                    viz.querySelectorAll('[data-modo]').forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-modo') === estado.modoDep ? 'true' : 'false'); });
                    var maxIng = Math.max.apply(null, m.deps.map(function (d) { return d.ingresos; }));
                    viz.querySelector('#tv-deps').innerHTML = m.deps.map(function (d) {
                        var mejor = (estado.modoDep === 'euros' ? m.mejorEuros : m.mejorPct).n === d.n;
                        if (estado.modoDep === 'euros') {
                            return '<div class="tm-barra' + (mejor ? ' mejor' : '') + '"><span class="et">' + d.n + '</span>' +
                                '<span class="pista"><i class="coste" style="width:' + (d.costes / maxIng * 100) + '%"></i><i class="margen" style="width:' + (d.margen / maxIng * 100) + '%"></i></span>' +
                                '<span class="v">' + e0.format(d.margen) + '</span></div>';
                        }
                        return '<div class="tm-barra' + (mejor ? ' mejor' : '') + '"><span class="et">' + d.n + '</span>' +
                            '<span class="pista"><i class="margen" style="width:' + (d.pct / 0.5 * 100) + '%"></i></span><span class="v">' + Math.round(d.pct * 100) + ' %</span></div>';
                    }).join('') + '<p class="tm-leyenda"><i class="coste"></i> Costes directos <i class="margen"></i> Margen</p>';
                    ponLectura('departamentos', m);
                    return m;
                }
                viz.addEventListener('click', function (ev) {
                    var b = ev.target.closest('[data-modo]');
                    if (b) { estado.modoDep = b.getAttribute('data-modo'); mostrar(pintar()); usadaCentro(); }
                });
                return pintar;
            },

            costes: function (viz) {
                viz.innerHTML = rango('tv-est', 'Costes de estructura anuales', 180000, 320000, 10000, estado.estructura, e0.format) +
                    '<svg class="tm-grafico" viewBox="0 0 520 220" id="tv-pm" role="img" aria-label="Facturación acumulada frente al punto muerto"></svg>';
                var r = viz.querySelector('#tv-est');
                function pintar() {
                    estado.estructura = +r.value;
                    viz.querySelector('#tv-est-v').textContent = e0.format(estado.estructura);
                    var m = P.modeloTimon(e, { estructura: estado.estructura });
                    var X = function (i) { return 40 + i * 38; }, Y = function (v) { return 190 - v / m.ingresos * 170; };
                    var pts = [];
                    for (var i = 0; i <= 12; i++) pts.push(X(i) + ',' + Y(m.ingresos / 12 * i));
                    var yPM = Y(Math.min(m.puntoMuerto, m.ingresos));
                    var mesX = X(Math.min(12, m.puntoMuerto / (m.ingresos / 12)));
                    var letras = 'EFMAMJJASOND';
                    viz.querySelector('#tv-pm').innerHTML =
                        '<line x1="40" y1="190" x2="496" y2="190" class="eje"/>' +
                        letras.split('').map(function (l, k) { return '<text x="' + X(k + 1) + '" y="208" class="mes' + (k + 1 === m.mesPM ? ' activo' : '') + '">' + l + '</text>'; }).join('') +
                        '<polyline points="' + pts.join(' ') + '" class="linea"/>' +
                        '<line x1="40" x2="496" y1="' + yPM + '" y2="' + yPM + '" class="umbral"/>' +
                        '<text x="44" y="' + (yPM - 8) + '" class="nota">Punto muerto · ' + e0.format(m.puntoMuerto) + '</text>' +
                        (m.mesPM <= 12 ? '<circle cx="' + mesX + '" cy="' + yPM + '" r="7" class="cruce"/>' : '');
                    ponLectura('costes', m);
                    return m;
                }
                r.addEventListener('input', function () { mostrar(pintar()); usadaCentro(); });
                return pintar;
            },

            hora: function (viz) {
                viz.innerHTML = rango('tv-h', 'Horas productivas por persona al año', 1200, 1700, 50, estado.horas, function (v) { return new Intl.NumberFormat('es-ES').format(v) + ' h'; }) + '<div id="tv-hora"></div>';
                var r = viz.querySelector('#tv-h');
                function pintar() {
                    estado.horas = +r.value;
                    viz.querySelector('#tv-h-v').textContent = new Intl.NumberFormat('es-ES').format(estado.horas) + ' h';
                    var m = P.modeloTimon(e, { horas: estado.horas }), max = 100;
                    viz.querySelector('#tv-hora').innerHTML =
                        '<div class="tm-barra"><span class="et">Coste por hora</span><span class="pista"><i class="coste" style="width:' + (m.costeHora / max * 100) + '%"></i></span><span class="v">' + e2.format(m.costeHora) + '</span></div>' +
                        '<div class="tm-barra mejor"><span class="et">Precio medio por hora</span><span class="pista"><i class="margen" style="width:' + (m.precioHora / max * 100) + '%"></i></span><span class="v">' + e2.format(m.precioHora) + '</span></div>';
                    ponLectura('hora', m);
                    return m;
                }
                r.addEventListener('input', function () { mostrar(pintar()); usadaCentro(); });
                return pintar;
            },

            cliente: function (viz) {
                viz.innerHTML = '<div class="tm-conmuta" role="group" aria-label="Cliente que se pierde"><button type="button" data-cli="">Ninguno</button>' +
                    e.clientes.map(function (cl) { return '<button type="button" data-cli="' + esc(cl.n) + '">' + esc(cl.n) + ' · ' + e0.format(cl.ingresos) + '</button>'; }).join('') +
                    '</div><div id="tv-cli"></div>';
                function pintar() {
                    viz.querySelectorAll('[data-cli]').forEach(function (b) { b.setAttribute('aria-pressed', (b.getAttribute('data-cli') || null) === estado.cliente ? 'true' : 'false'); });
                    var m = P.modeloTimon(e, { clienteFuera: estado.cliente });
                    var fila = function (et, a, b) {
                        return '<tr><th scope="row">' + et + '</th><td>' + a + '</td><td' + (a !== b ? ' class="cambia"' : '') + '>' + b + '</td></tr>';
                    };
                    viz.querySelector('#tv-cli').innerHTML = '<table class="tm-tabla"><thead><tr><th></th><th>Hoy</th><th>' + (estado.cliente ? 'Sin ' + esc(estado.cliente) : 'Escenario') + '</th></tr></thead><tbody>' +
                        fila('Ingresos', e0.format(base.ingresos), e0.format(m.ingresos)) +
                        fila('Beneficio', e0.format(base.beneficio), e0.format(m.beneficio)) +
                        fila('Costes cubiertos en', P.nombreMes(base.mesPM), P.nombreMes(m.mesPM)) +
                        fila('Para ' + e.socios[0].n, e0.format(base.socios[0].importe), e0.format(m.socios[0].importe)) +
                        '</tbody></table>';
                    ponLectura('cliente', m);
                    return m;
                }
                viz.addEventListener('click', function (ev) {
                    var b = ev.target.closest('[data-cli]');
                    if (b) { estado.cliente = b.getAttribute('data-cli') || null; mostrar(pintar()); usadaCentro(); }
                });
                return pintar;
            },

            tesoreria: function (viz) {
                viz.innerHTML = rango('tv-rep', 'Reparto de beneficios hoy', 0, 180000, 10000, estado.reparto, e0.format) +
                    '<svg class="tm-grafico" viewBox="0 0 520 220" id="tv-tes" role="img" aria-label="Saldo de tesorería previsto en los próximos seis meses"></svg><p class="tm-estado" id="tv-tes-est"></p>';
                var r = viz.querySelector('#tv-rep');
                function pintar() {
                    estado.reparto = +r.value;
                    viz.querySelector('#tv-rep-v').textContent = e0.format(estado.reparto);
                    var m = base, serie = m.proyeccion(estado.reparto);
                    var top = Math.max(Math.max.apply(null, serie), m.colchon) * 1.3, X = function (i) { return 50 + i * 74; }, Y = function (v) { return 190 - Math.max(0, v) / top * 170; };
                    var minimo = Math.min.apply(null, serie), ok = minimo >= m.colchon;
                    viz.querySelector('#tv-tes').innerHTML =
                        '<line x1="40" y1="' + Y(0) + '" x2="510" y2="' + Y(0) + '" class="eje"/>' +
                        '<rect x="40" y="' + Y(m.colchon) + '" width="470" height="' + (Y(0) - Y(m.colchon)) + '" class="zona"/>' +
                        '<line x1="40" x2="510" y1="' + Y(m.colchon) + '" y2="' + Y(m.colchon) + '" class="umbral alerta"/>' +
                        '<text x="44" y="' + (Y(m.colchon) + 16) + '" class="nota">Colchón mínimo · ' + e0.format(m.colchon) + '</text>' +
                        '<polyline points="' + serie.map(function (v, i) { return X(i) + ',' + Y(v); }).join(' ') + '" class="linea"/>' +
                        serie.map(function (v, i) { return '<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="5" class="punto' + (v < m.colchon ? ' mal' : '') + '"/><text x="' + X(i) + '" y="210" class="mes">' + (i === 0 ? 'Hoy' : '+' + i) + '</text>'; }).join('');
                    var est = viz.querySelector('#tv-tes-est');
                    est.className = 'tm-estado ' + (ok ? 'bien' : 'mal');
                    est.textContent = ok ? 'La tesorería aguanta: el saldo no baja de ' + e0.format(minimo) + '.' :
                        'Con este reparto, el saldo bajaría a ' + e0.format(minimo) + ': por debajo del colchón.';
                    ponLectura('tesoreria', m);
                    return m;
                }
                r.addEventListener('input', function () { mostrar(pintar()); usadaCentro(); });
                return pintar;
            }
        };

        var pintores = {};
        paneles.forEach(function (pn) {
            var id = pn.id.replace('q-', '');
            if (vistas[id]) pintores[id] = vistas[id](pn.querySelector('.tm-viz'));
        });

        function usadaCentro() { medir('timon-simulacion', true); }

        function elegir(id, foco) {
            if (!pintores[id]) return;
            actual = id;
            var k = 0;
            tabs.forEach(function (t, i) {
                var si = t.getAttribute('data-q') === id;
                if (si) k = i;
                t.setAttribute('aria-selected', si ? 'true' : 'false');
                t.setAttribute('tabindex', si ? '0' : '-1');
                if (si && foco) t.focus();
            });
            paneles.forEach(function (pn) { pn.hidden = pn.id !== 'q-' + id; });
            nodos.forEach(function (n) { n.classList.toggle('activo', n.getAttribute('data-q') === id); });
            anillo.style.setProperty('--giro', (-(360 / nodos.length) * k) + 'deg');
            mostrar(pintores[id]());
            medir('timon-pregunta-' + id, true);
        }

        tabs.forEach(function (t, i) {
            t.addEventListener('click', function (ev) { ev.preventDefault(); elegir(t.getAttribute('data-q')); });
            t.addEventListener('keydown', function (ev) {
                var d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[ev.key];
                if (ev.key === 'Home') d = -i; if (ev.key === 'End') d = tabs.length - 1 - i;
                if (d === undefined) return;
                ev.preventDefault();
                elegir(tabs[(i + d + tabs.length) % tabs.length].getAttribute('data-q'), true);
            });
        });
        nodos.forEach(function (n) {
            n.addEventListener('click', function () { elegir(n.getAttribute('data-q')); });
        });
        centro.addEventListener('click', function (ev) {
            var b = ev.target.closest('[data-ir]');
            if (b) elegir(b.getAttribute('data-ir'), true);
        });

        elegir(c.preguntas[0].id);
    }
})();
