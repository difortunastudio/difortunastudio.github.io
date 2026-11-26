/* =====================================================================
   PROYECTOS DE DIFORTUNA STUDIO
   ---------------------------------------------------------------------
   Único sitio donde se editan los proyectos. La página principal
   (tarjetas y caso de estudio) y las páginas de cada universo
   (proyectos/*.html) leen esta lista.

   ⚠️ Después de editar este archivo, ejecuta:  node generar.mjs
      (escribe el contenido en el HTML de la portada y de los universos).

   ⚠️ Capturas: solo imágenes ANONIMIZADAS en img/proyectos/<id>/.
      Las originales con datos reales van en _privado/ (ignorada por git).
   ===================================================================== */

/* Nombre provisional del proyecto náutico: cámbialo solo aquí. */
window.NOMBRE_NAUTICO = "Binako";

window.PROYECTOS = [
    /* ------------------------------------------------------------- */
    {
        id: "fliia",
        pagina: "proyectos/fliia.html",
        nombre: "Fliia",
        rol: "insignia",
        rolEtiqueta: "Flagship Product",
        claim: "Inteligencia económica familiar",
        sectores: ["Fintech", "B2C", "AI", "SaaS"],
        sector: "Economía familiar y fintech",
        estado: "Beta",
        url: "https://fliia.es",
        titular: "Fliia es una actividad empresarial de Fliia Tech SLU.",
        tema: { color: "#8b7cf6", fondo: "#f5f2fd" },

        problemaCorto: "La economía familiar está repartida entre cuentas, aplicaciones, hojas de cálculo y conversaciones.",
        solucionCorta: "Un espacio que conecta el día a día, el patrimonio, las previsiones, los objetivos y la economía compartida.",
        problema: "La economía familiar está fragmentada entre cuentas, aplicaciones, hojas de cálculo, conversaciones y decisiones. Las herramientas tradicionales obligan a las familias a adaptarse a sistemas que no siempre representan su realidad.",
        solucion: "Un espacio que conecta la gestión cotidiana, el patrimonio, las previsiones, los objetivos y la economía compartida.",
        diseno: [
            { titulo: "Hablar en lugar de rellenar", texto: "Registrar un movimiento debería ser tan sencillo como decirlo. El lenguaje natural reduce la fricción que hace que la gente abandone el control de su economía." },
            { titulo: "Todo en un mismo espacio", texto: "El día a día, el patrimonio, las previsiones y los objetivos dejan de vivir en lugares distintos y pasan a formar parte de una misma visión." },
            { titulo: "Compartir sin mezclarlo todo", texto: "Con los Kipus, cada persona puede compartir una economía común con otras —el hogar, un viaje, los cuidados de unos padres— respetando la privacidad de su economía personal." }
        ],
        funcionalidades: [
            { titulo: "Dashboard orbital", texto: "Una vista central de la situación económica de la familia.", captura: "dashboard" },
            { titulo: "Interacción por voz", texto: "Registrar movimientos y consultar información hablando, en lenguaje natural.", captura: "voz" },
            { titulo: "Día a día", texto: "Los ingresos y gastos cotidianos, organizados sin esfuerzo.", captura: "dia-a-dia" },
            { titulo: "Sueños", texto: "Los objetivos de la familia, conectados con su economía real.", captura: "suenos" },
            { titulo: "Patrimonio", texto: "Una visión del patrimonio familiar.", captura: "patrimonio" },
            { titulo: "Decisiones económicas", texto: "Apoyo para pensar las decisiones económicas antes de tomarlas.", captura: "decisiones" },
            {
                titulo: "KIPU",
                texto: "Espacios económicos compartidos e independientes. Una economía común con otras personas, sin compartir toda tu información financiera privada. Puedes formar parte de varios Kipus sin mezclar tu vida financiera.",
                ejemplos: [
                    "Una pareja que comparte los gastos del hogar.",
                    "Hermanos que gestionan los gastos y cuidados de sus padres.",
                    "Un grupo de amigos que organiza un viaje.",
                    "Una familia con una segunda residencia.",
                    "Personas que comparten piso."
                ],
                captura: "kipus"
            }
        ],
        valor: [
            "Menos fricción para registrar lo que ocurre cada día.",
            "Una visión completa para decidir con calma.",
            "Una economía familiar que se gestiona en compañía."
        ],
        vision: "Evolucionar hacia un sistema económico adaptativo, capaz de ofrecer experiencias personalizadas según las necesidades de cada persona y familia.",
        demo: null,
        capturas: {},
        experiencia: "fliia",
        portada: true,      /* portada original (V1) y, debajo, la experiencia (V2) */
        /* Escena: una familia FICTICIA. Las cifras se calculan a partir de aquí. */
        escena: {
            lema: "Claridad para hoy. Posibilidades para mañana.",
            ingresos: 3200,
            fijos: 1650,                 /* alquiler, suministros, colegio… */
            variables: 640,              /* lo gastado ya este mes */
            cajitas: 300,                /* lo apartado en cajitas (por ejemplo, un colchón) */
            sueno: { n: "Viaje en familia", objetivo: 3000, ahorrado: 1800 },
            patrimonio: [["Dinero en cuentas", 12400], ["Inversión", 21200], ["Vehículo", 15000]],
            /* saldo > 0: tienes a favor · saldo < 0: debes */
            kipus: [
                { n: "Casa de la playa", con: ["Ana", "Luis"], saldo: 40 },
                { n: "Cuidado de mamá", con: ["Pablo"], saldo: -25 }
            ],
            decision: { pregunta: "¿Podemos permitirnos un sofá de 900 €?", importe: 900 },
            ejemplos: ["Gasté 23,50 € en el súper", "45 € de cena con amigos", "Me han ingresado 300 € de un trabajo extra"]
        }   /* p. ej. { dashboard: { src: "img/proyectos/fliia/dashboard.webp", alt: "…" } } */
    },

    /* ------------------------------------------------------------- */
    {
        id: "timon",
        pagina: "proyectos/timon.html",
        nombre: "TIMÓN",
        rol: "caso",
        rolEtiqueta: "Featured Case Study",
        claim: "Inteligencia financiera empresarial",
        sectores: ["Fintech", "B2B", "Business Intelligence"],
        sector: "Inteligencia financiera empresarial",
        estado: "Solución interna",
        origen: "Desarrollado para un estudio creativo con varios socios y departamentos. Los datos de la empresa se mantienen confidenciales.",
        tema: { color: "#4f8cff", fondo: "#040a1c" },

        problemaCorto: "Disponer de información contable no significa disponer de información suficiente para decidir.",
        solucionCorta: "Una capa de inteligencia financiera que convierte la información económica en herramientas de gestión y decisión.",
        problema: "Disponer de información contable no significa disponer de información suficiente para tomar decisiones empresariales. En una empresa con varios socios y departamentos, las preguntas que importan no tienen una respuesta directa en el sistema contable.",
        solucion: "Una capa de inteligencia financiera que transforma la información económica en herramientas de gestión y decisión.",
        caso: {
            intro: "Una empresa con varios socios y departamentos tenía su contabilidad al día, pero las preguntas que importaban para gestionarla no tenían una respuesta directa en el sistema contable.",
            pares: [
                { antes: "¿Qué rentabilidad aporta cada departamento?", despues: "Rentabilidad por departamento." },
                { antes: "¿Cuánto corresponde a cada socio?", despues: "Cálculo y reparto de remuneraciones entre socios." },
                { antes: "¿Cuánto tenemos que facturar para cubrir costes?", despues: "Punto muerto y coste por hora." },
                { antes: "¿Con qué tesorería contamos y qué viene?", despues: "Tesorería y previsiones." },
                { antes: "¿Qué pasa si bajan los ingresos?", despues: "Simulador de escenarios." },
                { antes: "¿Cuánto ha aportado cada socio?", despues: "Equilibrio entre socios." }
            ],
            cierre: "TIMÓN no sustituye a la contabilidad: se apoya en ella y la convierte en información útil para gestionar y decidir."
        },
        diseno: [
            { titulo: "Respetar lo que ya existe", texto: "La contabilidad sigue siendo la fuente. TIMÓN se construye encima, sin obligar a cambiar de sistema." },
            { titulo: "Modelar la empresa real", texto: "Socios, departamentos, costes y reparto: el modelo refleja cómo funciona la empresa, no cómo lo haría una herramienta genérica." },
            { titulo: "Todo en una sola vista", texto: "El universo orbital reúne rentabilidad, costes, tesorería y previsiones para quien tiene que decidir." }
        ],
        funcionalidades: [
            { titulo: "Universo TIMÓN", texto: "Una vista orbital que conecta toda la información financiera de la empresa.", captura: "universo" },
            { titulo: "Rentabilidad por departamentos", texto: "Qué aporta cada área a la empresa.", captura: "rentabilidad" },
            { titulo: "Punto muerto", texto: "Cuánto hay que facturar para cubrir la estructura.", captura: "punto-muerto" },
            { titulo: "Coste por hora", texto: "El coste real de cada hora de trabajo.", captura: "coste-hora" },
            { titulo: "Tesorería", texto: "Control de la liquidez de la empresa.", captura: "tesoreria" },
            { titulo: "Previsiones", texto: "Una mirada hacia los próximos meses.", captura: "previsiones" },
            { titulo: "Simulador de escenarios", texto: "Plantear un cambio y ver su efecto en el beneficio y la caja.", captura: "decisiones" },
            { titulo: "Preguntas rápidas", texto: "Preguntas por voz o por texto que llevan al panel adecuado.", captura: "consultas" },
            { titulo: "Remuneraciones entre socios", texto: "Un sistema de cálculo y reparto transparente.", captura: "socios" }
        ],
        valor: [
            "Decisiones apoyadas en datos, no en intuiciones.",
            "Transparencia económica entre socios.",
            "Una visión de la empresa por departamentos."
        ],
        demo: null,   /* TIMÓN usa el centro de mando (centro) en lugar de la demo */
        capturas: {},

        /* Centro de mando: una empresa FICTICIA con datos coherentes entre
           todas las vistas. Las cifras se calculan a partir de estos datos. */
        centro: {
            lema: "De los datos contables a las decisiones empresariales.",
            intro: "Elige una pregunta y explora cómo responde TIMÓN.",
            empresa: {
                nombre: "Estudio Ficticio",
                personas: 12,
                horasPersona: 1400,          /* horas productivas al año por persona */
                estructura: 240000,          /* costes de estructura anuales */
                reservas: 10,                /* % del beneficio a reservas */
                /* Cada socio recibe el resultado de su departamento (como en TIMÓN) */
                socios: [
                    { n: "Socia A", dep: "Diseño" },
                    { n: "Socio B", dep: "Desarrollo" },
                    { n: "Socia C", dep: "Consultoría" }
                ],
                facturado: { importe: 610000, fecha: "30 de junio" },
                departamentos: [
                    { n: "Diseño", ingresos: 480000, costes: 330000 },
                    { n: "Desarrollo", ingresos: 520000, costes: 340000 },
                    { n: "Consultoría", ingresos: 200000, costes: 110000 }
                ],
                bajas: [60000, 120000, 180000],   /* escenarios de bajada de ingresos */
                tesoreria: {
                    saldo: 210000,
                    colchon: 60000,          /* saldo mínimo que la empresa quiere mantener */
                    flujos: [-20000, 15000, -35000, 10000, 5000, -10000]   /* próximas 13 semanas, por quincenas */
                }
            },
            preguntas: [
                { id: "socios", corto: "Socios", etiqueta: "Repartible", pregunta: "¿Cuánto puedo pagar a mis socios?", funcion: "Reparto entre socios según su departamento", antes: "La contabilidad muestra el beneficio, no cuánto corresponde a cada socio." },
                { id: "departamentos", corto: "Rentabilidad", etiqueta: "Más rentable", pregunta: "¿Qué departamento es más rentable?", funcion: "Rentabilidad por departamentos", antes: "La contabilidad agrupa el resultado de la empresa, no el de cada área." },
                { id: "costes", corto: "Punto muerto", etiqueta: "Costes del año", pregunta: "¿Cubrimos los costes del año?", funcion: "Punto muerto", antes: "La contabilidad cuenta lo facturado, no cuánto falta para cubrir la estructura." },
                { id: "hora", corto: "Coste/hora", etiqueta: "Coste por hora", pregunta: "¿Cuánto nos cuesta realmente una hora de trabajo?", funcion: "Coste por hora", antes: "Las nóminas y los gastos están registrados, pero no convertidos en el coste de una hora." },
                { id: "cliente", corto: "Escenarios", etiqueta: "Beneficio previsto", pregunta: "¿Qué pasa si bajan los ingresos?", funcion: "Simulador de escenarios", antes: "La contabilidad mira hacia atrás. Esta pregunta mira hacia delante." },
                { id: "tesoreria", corto: "Tesorería", etiqueta: "Reparto posible hoy", pregunta: "¿Podemos repartir beneficios sin comprometer la tesorería?", funcion: "Previsión de tesorería y colchón", antes: "Que haya beneficio no significa que haya liquidez para repartirlo." }
            ]
        }
    },

    /* ------------------------------------------------------------- */
    {
        id: "outbill",
        pagina: "proyectos/outbill.html",
        nombre: "Outbill",
        rolEtiqueta: "Producto propio",
        claim: "Todas tus empresas. Todas tus cuentas. Un solo lugar.",
        sectores: ["Gestión administrativa", "Fiscal y contable", "Multiempresa"],
        sector: "Gestión administrativa, fiscal y contable",
        estado: "Uso privado",
        origen: "Desarrollado inicialmente para gestionar actividades empresariales en España y Reino Unido.",
        aviso: "Las estimaciones fiscales son orientativas. Outbill no sustituye el asesoramiento de una gestoría ni garantiza el cumplimiento fiscal.",
        tema: { color: "#2563eb", fondo: "#ffffff" },

        problemaCorto: "Varias empresas o actividades significan duplicar herramientas, tareas, documentación y procesos fiscales.",
        solucionCorta: "Una plataforma de gestión administrativa, fiscal y contable para pequeñas empresas y autónomos, con varias empresas en un solo lugar.",
        problema: "Gestionar varias empresas o actividades implica duplicar herramientas, tareas administrativas, documentación y procesos fiscales, y adaptarse a contextos distintos en cada país.",
        solucion: "Una plataforma de gestión administrativa, fiscal y contable para pequeñas empresas y autónomos, con capacidad multiempresa y adaptación a España y Reino Unido.",
        diseno: [
            { titulo: "Una sola plataforma, varias empresas", texto: "Cada empresa conserva su contexto, pero la gestión se hace desde un mismo lugar." },
            { titulo: "Adaptarse al contexto de cada negocio", texto: "Los procesos administrativos se ajustan a cada empresa y a su país." },
            { titulo: "Preparar, no sustituir", texto: "La gestoría sigue siendo clave. Outbill ordena la información y la prepara para ella." }
        ],
        funcionalidades: [
            { titulo: "Lectura de tickets y facturas con IA", texto: "Los documentos se leen y se registran sin teclear sus datos.", captura: "tickets" },
            { titulo: "Facturación", texto: "Emisión y control de facturas.", captura: "facturacion" },
            { titulo: "Conciliación bancaria", texto: "Los movimientos del banco, cuadrados con lo registrado.", captura: "banco" },
            { titulo: "Preparación de impuestos", texto: "Una estimación orientativa de los impuestos del periodo.", captura: "fiscal" },
            { titulo: "Contabilidad", texto: "La contabilidad de cada empresa, en el mismo lugar.", captura: "contabilidad" },
            { titulo: "Documentación para la gestoría", texto: "Datos y justificantes preparados para la gestoría.", captura: "gestoria" },
            { titulo: "Gestión multiempresa", texto: "Varias empresas y actividades, cada una con su contexto.", captura: "resumen" },
            { titulo: "Importación desde Holded", texto: "Importación de datos de Holded.", captura: "holded" }
        ],
        valor: [
            "Menos trabajo administrativo.",
            "Más tiempo para dedicarlo al negocio.",
            "Todas las empresas, en un solo lugar."
        ],
        demo: null,
        capturas: {},
        experiencia: "outbill",
        escena: {
            lema: "Todas tus empresas. Todas tus cuentas. Un solo lugar.",
            beneficio: "Menos trabajo administrativo. Más tiempo para tu negocio.",
            lemaDocs: "Así llega un ticket a la carpeta de la gestoría.",
            /* Ecosistema: tres negocios FICTICIOS de una misma persona */
            negocios: [
                { id: "es", n: "Estudio Ejemplo SL", pais: "España", moneda: "EUR", impuesto: "IVA",
                  ingresos: 48200, gastos: 21350, emitidas: 18, recibidas: 64, banco: 142, pendientes: 3, impuestoEst: 3120, documentos: 82 },
                { id: "uk", n: "Example Studio Ltd", pais: "Reino Unido", moneda: "GBP", impuesto: "VAT",
                  ingresos: 22400, gastos: 9800, emitidas: 7, recibidas: 23, banco: 58, pendientes: 0, impuestoEst: 1640, documentos: 30 },
                { id: "aut", n: "Actividad como autónoma", pais: "España", moneda: "EUR", impuesto: "IVA",
                  ingresos: 9600, gastos: 2100, emitidas: 6, recibidas: 15, banco: 41, pendientes: 1, impuestoEst: 1050, documentos: 21 }
            ],
            periodo: "Primer trimestre",
            etapas: ["Documentos sueltos", "Captura", "Organización", "Revisión", "Gestoría"],
            empresas: {
                A: { n: "Estudio Ejemplo SL · España", moneda: "EUR", impuesto: "IVA" },
                B: { n: "Example Studio Ltd · Reino Unido", moneda: "GBP", impuesto: "VAT" }
            },
            documentos: [
                { id: "d1", tipo: "Ticket", emisor: "Papelería Ejemplo", empresa: "A", total: 50.00, impuesto: 8.68, cat: "Material de oficina" },
                { id: "d2", tipo: "Factura", emisor: "Hosting Demo", empresa: "A", total: 121.00, impuesto: 21.00, cat: "Software" },
                { id: "d3", tipo: "Ticket", emisor: "Example Stationery", empresa: "B", total: 48.00, impuesto: 8.00, cat: "Office supplies" },
                { id: "d4", tipo: "Ticket", emisor: "Taxi Muestra", empresa: "A", total: 22.00, impuesto: 2.00, cat: "Desplazamientos", revisar: "Falta la fecha" },
                { id: "d5", tipo: "Factura", emisor: "Cloud Tools Ltd", empresa: "B", total: 24.00, impuesto: 4.00, cat: "Software" },
                { id: "d6", tipo: "Factura", emisor: "Mensajería Demo", empresa: "A", total: 36.30, impuesto: 6.30, cat: "Envíos" }
            ]
        }
    },

    /* ------------------------------------------------------------- */
    {
        id: "automotive",
        pagina: "proyectos/automotive.html",
        nombre: "Automotive Finance",
        rolEtiqueta: "Solución a medida",
        claim: "Gestión inteligente de financiación de vehículos",
        sectores: ["Automotive", "Fintech", "B2B"],
        sector: "Automoción y financiación comercial",
        estado: "Solución a medida",
        origen: "Desarrollado para resolver una necesidad operativa real de una empresa del sector automovilístico.",
        tema: { color: "#0f766e", fondo: "#f4f6f6" },

        problemaCorto: "Ventas financiadas, vencimientos, cobros pendientes y clientes difíciles de seguir.",
        solucionCorta: "Una herramienta adaptada a la operativa real de un negocio de compraventa de vehículos con financiación.",
        problema: "Un negocio de compraventa de vehículos con financiación propia necesita controlar cada operación: sus cuotas, sus vencimientos, los cobros pendientes y el seguimiento de cada cliente.",
        solucion: "Una herramienta adaptada a la operativa real de un negocio de compraventa de vehículos con financiación.",
        diseno: [
            { titulo: "Partir de cómo trabaja el negocio", texto: "La herramienta sigue el recorrido real de una operación financiada, desde la venta hasta la última cuota." },
            { titulo: "Anticiparse, no reaccionar", texto: "Los vencimientos y las cuotas pendientes aparecen antes de convertirse en un problema." },
            { titulo: "Cada gestión, registrada", texto: "Pagos, llamadas y comunicaciones quedan en el historial del cliente." }
        ],
        funcionalidades: [
            { titulo: "Dashboard operativo", texto: "El estado de todas las operaciones financiadas.", captura: "dashboard" },
            { titulo: "Agenda de cobros", texto: "Qué cobros vencen y cuándo.", captura: "agenda" },
            { titulo: "Cuotas vencidas", texto: "Detección de las cuotas pendientes de pago.", captura: "vencidas" },
            { titulo: "Seguimiento de clientes", texto: "La situación de cada cliente y de cada operación.", captura: "clientes" },
            { titulo: "Registro de pagos", texto: "Cada pago, registrado en su operación.", captura: "pagos" },
            { titulo: "Comunicaciones de reclamación", texto: "Preparación de las comunicaciones de seguimiento.", captura: "reclamacion" },
            { titulo: "Historial de gestiones", texto: "Todo lo que se ha hecho con cada cliente.", captura: "historial" }
        ],
        valor: [
            "Control de los cobros sin hojas de cálculo paralelas.",
            "Seguimiento proactivo de los clientes.",
            "Un software que se adapta al negocio, y no al revés."
        ],
        demo: null,
        capturas: {},
        experiencia: "automotive",
        portada: true,      /* portada original (V1) y, debajo, la experiencia (V2) */
        escena: {
            lema: "Cada cuota, cada vencimiento y cada cliente, bajo control.",
            fecha: "Martes, 15 de marzo",
            lugar: "Jornada de una automotora ficticia en Montevideo",
            /* Como en la aplicación: cada operación en dólares (USD) o pesos uruguayos (UYU), sin mezclar monedas */
            tareas: [
                { id: "t1", hora: "09:00", tipo: "cobro", cliente: "J. Ficticio", vehiculo: "Monovolumen", cuota: 22, importe: 245, moneda: "USD", texto: "Cuota que vence hoy" },
                { id: "t2", hora: "10:30", tipo: "retraso", cliente: "M. Ejemplo", vehiculo: "Auto compacto", cuota: 14, importe: 8900, moneda: "UYU", dias: 10, vencio: "5 de marzo", texto: "Cuota vencida hace 10 días",
                  historial: ["12/01 · Cuota 12 pagada", "12/02 · Cuota 13 pagada con 3 días de atraso", "05/03 · Cuota 14 vencida"] },
                { id: "t3", hora: "12:00", tipo: "cobro", cliente: "L. Muestra", vehiculo: "Utilitario", cuota: 6, importe: 156, moneda: "USD", texto: "Cuota que vence hoy" },
                { id: "t4", hora: "16:00", tipo: "aviso", cliente: "R. Prueba", vehiculo: "Camioneta", cuota: 31, importe: 12400, moneda: "UYU", vence: "18 de marzo", texto: "Vence en 3 días" }
            ]
        }
    },

    /* ------------------------------------------------------------- */
    {
        id: "nautico",
        pagina: "proyectos/nautico.html",
        nombre: window.NOMBRE_NAUTICO,
        rolEtiqueta: "Validación sectorial",
        claim: "Inteligencia relacional para la industria náutica",
        sectores: ["Yachting", "Networking", "AI"],
        sector: "Yachting e inteligencia relacional",
        estado: "Desarrollo y validación sectorial",
        origen: "Diseñado a partir de necesidades reales de profesionales de la industria internacional de los superyates.",
        tema: { color: "#2dd4bf", fondo: "#04212a" },

        problemaCorto: "Contactos de ferias internacionales cuyo contexto y oportunidades se pierden.",
        solucionCorta: "Una herramienta que conecta personas, empresas, embarcaciones, astilleros y eventos profesionales.",
        problema: "Los profesionales del sector náutico generan numerosos contactos en ferias internacionales, pero pierden información sobre el contexto y las oportunidades de esas relaciones.",
        solucion: "Una herramienta especializada que conecta personas, empresas, embarcaciones, astilleros y eventos profesionales.",
        ejemplo: "Un profesional necesita encontrar un proveedor para realizar un refit de un yate en Palma de Mallorca. La aplicación analiza su red de contactos para identificar a quién puede consultar o quién podría facilitarle una presentación.",
        diseno: [
            { titulo: "Cada contacto con su contexto", texto: "Una tarjeta de visita no es un dato aislado: viene de una feria, de una conversación y de una necesidad." },
            { titulo: "Pensar en red", texto: "Personas, empresas, embarcaciones, astilleros y eventos se conectan entre sí. El valor está en esas conexiones." },
            { titulo: "Hecho para el sector", texto: "Diseñado a partir de cómo trabajan realmente los profesionales de los superyates." }
        ],
        funcionalidades: [
            { titulo: "Tarjetas de visita", texto: "Digitalización de tarjetas de visita.", captura: "tarjetas" },
            { titulo: "Contexto de cada contacto", texto: "Dónde, cuándo y de qué se habló.", captura: "contexto" },
            { titulo: "Mapa de relaciones", texto: "La red profesional, visible.", captura: "mapa" },
            { titulo: "Calendario de ferias", texto: "Los eventos del sector y quién estuvo en cada uno.", captura: "ferias" },
            { titulo: "Búsqueda", texto: "Búsqueda de contactos y oportunidades.", captura: "busqueda" },
            { titulo: "Conexiones", texto: "Conexiones entre profesionales y empresas.", captura: "conexiones" }
        ],
        valor: [
            "Relaciones que no se pierden después de cada feria.",
            "Oportunidades que aparecen al conectar la red.",
            "Presentaciones profesionales a través de contactos comunes."
        ],
        demo: null,
        capturas: {},
        experiencia: "nautico",
        portada: true,      /* portada original (V1) y, debajo, la experiencia (V2) */
        escena: {
            lema: "Cada tarjeta es una puerta. La red es la oportunidad.",
            evento: "Salón náutico (demo)",
            tarjetas: [
                { id: "marta", n: "Marta Ejemplo", cargo: "Refit Project Manager", empresa: "Astillero Demo", ciudad: "Palma" },
                { id: "jordi", n: "Jordi Muestra", cargo: "Capitán", barco: "M/Y Demo One", ciudad: "Barcelona" },
                { id: "ana", n: "Ana Prueba", cargo: "Yacht broker", empresa: "Broker Demo", ciudad: "Mónaco" },
                { id: "luca", n: "Luca Ficticio", cargo: "Ingeniero naval", empresa: "Astillero Demo", ciudad: "Génova" }
            ],
            busqueda: { texto: "Busco un astillero para un refit en Palma", destino: "Astillero Demo" }
        }
    }
];
