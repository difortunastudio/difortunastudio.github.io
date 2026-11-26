/* =====================================================================
   PROYECTOS DE DIFORTUNA STUDIO
   ---------------------------------------------------------------------
   Único sitio donde se editan los proyectos. La página principal
   (tarjetas y caso de estudio) y las páginas de cada universo
   (proyectos/*.html) leen esta lista.

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
            { titulo: "Una economía que se comparte", texto: "Las decisiones económicas de una familia rara vez son individuales. Fliia está pensada para espacios económicos compartidos." }
        ],
        funcionalidades: [
            { titulo: "Dashboard orbital", texto: "Una vista central de la situación económica de la familia.", captura: "dashboard" },
            { titulo: "Interacción por voz", texto: "Registrar movimientos y consultar información hablando, en lenguaje natural.", captura: "voz" },
            { titulo: "Día a día", texto: "Los ingresos y gastos cotidianos, organizados sin esfuerzo.", captura: "dia-a-dia" },
            { titulo: "Sueños", texto: "Los objetivos de la familia, conectados con su economía real.", captura: "suenos" },
            { titulo: "Patrimonio", texto: "Una visión del patrimonio familiar.", captura: "patrimonio" },
            { titulo: "Kipus", texto: "", captura: "kipus" },   /* PENDIENTE: descripción de Kipus */
            { titulo: "Decisiones económicas", texto: "Apoyo para pensar las decisiones económicas antes de tomarlas.", captura: "decisiones" }
        ],
        valor: [
            "Menos fricción para registrar lo que ocurre cada día.",
            "Una visión completa para decidir con calma.",
            "Una economía familiar que se gestiona en compañía."
        ],
        vision: "Evolucionar hacia un sistema económico adaptativo, capaz de ofrecer experiencias personalizadas según las necesidades de cada persona y familia.",
        demo: "fliia",
        capturas: {}   /* p. ej. { dashboard: { src: "img/proyectos/fliia/dashboard.webp", alt: "…" } } */
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
                { antes: "¿Qué pasa si tomamos esta decisión?", despues: "Gestión de decisiones." },
                { antes: "¿Dónde busco el dato que necesito?", despues: "Consultas en lenguaje natural." }
            ],
            cierre: "TIMÓN no sustituye a la contabilidad: se apoya en ella y la convierte en información útil para gestionar y decidir."
        },
        diseno: [
            { titulo: "Respetar lo que ya existe", texto: "La contabilidad sigue siendo la fuente. TIMÓN se construye encima, sin obligar a cambiar de sistema." },
            { titulo: "Modelar la empresa real", texto: "Socios, departamentos, costes y reparto: el modelo refleja cómo funciona la empresa, no cómo lo haría una herramienta genérica." },
            { titulo: "Preguntar como se pregunta en una reunión", texto: "Las consultas en lenguaje natural acercan los datos a quien tiene que decidir." }
        ],
        funcionalidades: [
            { titulo: "Universo TIMÓN", texto: "Una vista orbital que conecta toda la información financiera de la empresa.", captura: "universo" },
            { titulo: "Rentabilidad por departamentos", texto: "Qué aporta cada área a la empresa.", captura: "rentabilidad" },
            { titulo: "Punto muerto", texto: "Cuánto hay que facturar para cubrir la estructura.", captura: "punto-muerto" },
            { titulo: "Coste por hora", texto: "El coste real de cada hora de trabajo.", captura: "coste-hora" },
            { titulo: "Tesorería", texto: "Control de la liquidez de la empresa.", captura: "tesoreria" },
            { titulo: "Previsiones", texto: "Una mirada hacia los próximos meses.", captura: "previsiones" },
            { titulo: "Gestión de decisiones", texto: "Plantear decisiones y entender sus consecuencias.", captura: "decisiones" },
            { titulo: "Consultas en lenguaje natural", texto: "Preguntar a los datos como se le pregunta a una persona.", captura: "consultas" },
            { titulo: "Remuneraciones entre socios", texto: "Un sistema de cálculo y reparto transparente.", captura: "socios" }
        ],
        valor: [
            "Decisiones apoyadas en datos, no en intuiciones.",
            "Transparencia económica entre socios.",
            "Una visión de la empresa por departamentos."
        ],
        demo: "timon",
        capturas: {}
    },

    /* ------------------------------------------------------------- */
    {
        id: "outbill",
        pagina: "proyectos/outbill.html",
        nombre: "Outbill",
        rolEtiqueta: "Producto propio",
        claim: "Gestión empresarial sin fronteras",
        sectores: ["Accounting", "Fintech", "Multiempresa"],
        sector: "Gestión administrativa y contable",
        estado: "Uso privado",
        origen: "Desarrollado inicialmente para gestionar actividades empresariales en España y Reino Unido.",
        aviso: "Las estimaciones fiscales son orientativas. Outbill no sustituye el asesoramiento de una gestoría ni cuenta con una certificación fiscal.",
        tema: { color: "#2563eb", fondo: "#ffffff" },

        problemaCorto: "Varias empresas significan duplicar herramientas, tareas, documentación y procesos fiscales.",
        solucionCorta: "Una plataforma multiempresa que centraliza la gestión administrativa y prepara la información para la gestoría.",
        problema: "Gestionar varias empresas implica duplicar herramientas, tareas administrativas, documentación y procesos fiscales, y adaptarse a contextos distintos en cada una.",
        solucion: "Una plataforma multiempresa que centraliza la gestión administrativa y facilita la preparación de información para la gestoría.",
        diseno: [
            { titulo: "Una sola plataforma, varias empresas", texto: "Cada empresa conserva su contexto, pero la gestión se hace desde un mismo lugar." },
            { titulo: "Adaptarse al contexto de cada negocio", texto: "Los procesos administrativos se ajustan a cada empresa y a su contexto fiscal." },
            { titulo: "Preparar, no sustituir", texto: "La gestoría sigue siendo clave. Outbill ordena la información y los justificantes para que llegue preparada." }
        ],
        funcionalidades: [
            { titulo: "Resumen económico", texto: "La situación de cada empresa de un vistazo.", captura: "resumen" },
            { titulo: "Facturación", texto: "Emisión y control de facturas.", captura: "facturacion" },
            { titulo: "Tickets y documentos", texto: "Digitalización de tickets y documentos.", captura: "tickets" },
            { titulo: "Movimientos bancarios", texto: "Control de los movimientos del banco.", captura: "banco" },
            { titulo: "Estimaciones fiscales", texto: "Una estimación orientativa de las obligaciones fiscales.", captura: "fiscal" },
            { titulo: "Documentación para la gestoría", texto: "Exportación de datos y justificantes, preparados para la gestoría.", captura: "gestoria" }
        ],
        valor: [
            "Menos herramientas y menos tareas duplicadas.",
            "Información ordenada antes de llegar a la gestoría.",
            "Una gestión que se adapta a cada empresa."
        ],
        demo: "outbill",
        capturas: {}
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
        demo: "automotive",
        capturas: {}
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
        demo: "nautico",
        capturas: {}
    }
];
