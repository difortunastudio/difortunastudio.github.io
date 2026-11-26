/* =====================================================================
   GENERADOR DE CONTENIDO · Difortuna Studio
   ---------------------------------------------------------------------
   Escribe en HTML el contenido que vive en proyectos.js, para que sea
   legible sin JavaScript (buscadores, herramientas de IA, lectores).

   Uso, cada vez que cambies proyectos.js:   node generar.mjs

   Genera:
     · proyectos/<id>.html   (los cinco universos, con sus metadatos)
     · index.html            (caso destacado y tarjetas del portfolio)
     · sitemap.xml
   No necesita instalar nada: solo Node.
   ===================================================================== */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.dirname(fileURLToPath(import.meta.url));
const DOMINIO = 'https://difortunastudio.com/';
const HOY = new Date().toISOString().slice(0, 10);
const leer = (f) => fs.readFileSync(path.join(RAIZ, f), 'utf8');
const escribir = (f, t) => fs.writeFileSync(path.join(RAIZ, f), t);

/* Cargar datos y plantillas tal como los carga el navegador */
const ctx = { console };
ctx.window = ctx;
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(leer('proyectos.js'), ctx, { filename: 'proyectos.js' });
vm.runInContext(leer('proyectos/plantillas.js'), ctx, { filename: 'plantillas.js' });
const proyectos = ctx.PROYECTOS;
const P = ctx.DFS_PLANTILLAS;
const esc = P.esc;

function recortar(t, max) {
    if (t.length <= max) return t;
    const corte = t.slice(0, max - 1);
    return corte.slice(0, corte.lastIndexOf(' ')) + '…';
}

/* ---------- Universos ---------- */
for (const p of proyectos) {
    const url = DOMINIO + p.pagina;
    const titulo = `${p.nombre} · ${p.claim} | Difortuna Studio`;
    const descripcion = recortar(`${p.claim}. ${p.solucion}`, 160);
    const ld = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'CreativeWork',
                name: p.nombre,
                headline: `${p.nombre}: ${p.claim}`,
                description: `${p.problema} ${p.solucion}`,
                url,
                inLanguage: 'es',
                genre: p.sector,
                keywords: p.sectores.join(', '),
                creativeWorkStatus: p.estado,
                author: { '@type': 'Person', name: 'Fiorella Gallo Di Fortuna', jobTitle: 'AI Product Builder & Founder', url: DOMINIO },
                isPartOf: { '@type': 'WebSite', name: 'Difortuna Studio', url: DOMINIO }
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Difortuna Studio', item: DOMINIO },
                    { '@type': 'ListItem', position: 2, name: 'Proyectos', item: DOMINIO + '#proyectos' },
                    { '@type': 'ListItem', position: 3, name: p.nombre, item: url }
                ]
            }
        ]
    };

    const html = `<!DOCTYPE html>
<html lang="es" class="sin-js">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Página generada por generar.mjs a partir de proyectos.js. No editar a mano. -->
    <title>${esc(titulo)}</title>
    <meta name="description" content="${esc(descripcion)}" />
    <link rel="canonical" href="${url}" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="${esc(p.tema.fondo)}" />
    <link rel="icon" type="image/svg+xml" href="../favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32.png" />
    <link rel="apple-touch-icon" href="../apple-touch-icon.png" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Difortuna Studio" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${esc(p.nombre)} · ${esc(p.claim)}" />
    <meta property="og:description" content="${esc(descripcion)}" />
    <meta property="og:image" content="${DOMINIO}og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Fiorella Gallo Di Fortuna · Difortuna Studio" />
    <meta property="og:locale" content="es_ES" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(p.nombre)} · ${esc(p.claim)}" />
    <meta name="twitter:description" content="${esc(descripcion)}" />
    <meta name="twitter:image" content="${DOMINIO}og.png" />

    <script type="application/ld+json">${JSON.stringify(ld)}</script>
    <script>document.documentElement.className = "js";</script>
    <link rel="stylesheet" href="proyecto.css" />
</head>
<body data-proyecto="${esc(p.id)}">
    <a href="${p.centro ? '#centro' : p.experiencia ? '#escena' : '#problema'}" class="saltar">Saltar al contenido</a>
    <header class="barra">
        <div class="barra-inner">
            <a href="../index.html#proyectos" class="volver" data-salir="portfolio">← Portfolio</a>
            <a href="../index.html" class="barra-marca" data-salir="portfolio">Difortuna Studio</a>
            <a href="../index.html#contacto" class="barra-cta" data-evento="cta-${esc(p.id)}-barra">Hablemos ↗</a>
        </div>
    </header>
    <main id="universo">
${P.universo(p, proyectos)}
    </main>
    <script src="../proyectos.js"></script>
${p.centro || p.experiencia ? '    <script src="plantillas.js"></script>\n' : ''}    <script src="proyecto.js"></script>
</body>
</html>
`;
    escribir(p.pagina, html);
    console.log('✓', p.pagina);
}

/* ---------- Portada ---------- */
let portada = leer('index.html');
const bloques = P.portada(proyectos);
function sustituir(texto, marca, contenido) {
    const re = new RegExp(`(<!-- generado:${marca} -->)[\\s\\S]*?(<!-- /generado:${marca} -->)`);
    if (!re.test(texto)) throw new Error(`No encuentro la marca generado:${marca} en index.html`);
    return texto.replace(re, (_, a, b) => a + contenido + b);
}
portada = sustituir(portada, 'caso', bloques.caso);
portada = sustituir(portada, 'tarjetas', bloques.tarjetas);
escribir('index.html', portada);
console.log('✓ index.html');

/* ---------- Sitemap ---------- */
const urls = ['', ...proyectos.map((p) => p.pagina), 'aviso-legal.html'];
escribir('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${DOMINIO}${u}</loc>\n    <lastmod>${HOY}</lastmod>\n  </url>`).join('\n')}
</urlset>
`);
console.log('✓ sitemap.xml');
