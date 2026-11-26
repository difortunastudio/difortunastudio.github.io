/* =====================================================================
   PROYECTOS DE DIFORTUNA STUDIO
   ---------------------------------------------------------------------
   Este es el único sitio donde se editan los proyectos.
   La web lee esta lista y dibuja las tarjetas y las fichas sola.

   Para añadir un proyecto: copia un bloque { ... }, pégalo al final
   y cambia los textos. El orden de la lista es el orden en la web.

   Campos:
     id               identificador corto, sin espacios ni tildes
     nombre           nombre visible
     claim            propuesta de valor en una línea
     sectores         etiquetas cortas
     estado           estado real del proyecto
     problemaCorto    resumen para la tarjeta (1 frase)
     solucionCorta    resumen para la tarjeta (1 frase)
     problema         texto completo para la ficha
     solucion         texto completo para la ficha
     capacidades      lista de capacidades
     vision           (opcional) hacia dónde evoluciona el producto
     ejemplo          (opcional) caso de uso
     origen           (opcional) de dónde nace
     url              (opcional) SOLO si la web del proyecto está confirmada
     rol              (opcional) "caso"     = Featured Case Study (bloque propio, el primero)
                                 "insignia" = Flagship Product (tarjeta grande)
     tituloCapacidades (opcional) título de la lista de capacidades en la ficha
     caso             (solo rol "caso") narrativa antes / después:
                      { intro, pares: [{ antes, despues }], cierre }
     capturas         (opcional) lista de imágenes reales:
                      [{ src: "img/fliia-1.webp", alt: "Pantalla de inicio de Fliia", titulo: "Inicio" }]
                      Mientras esté vacía se muestra una composición tipográfica.
                      ¡Antes de subir una captura, revisa que no muestre datos reales
                      de clientes, socios ni cifras internas!
   ===================================================================== */

window.PROYECTOS = [
    {
        id: "timon",
        nombre: "TIMÓN",
        claim: "Inteligencia financiera empresarial",
        sectores: ["Fintech", "B2B", "Business Intelligence"],
        estado: "En uso · Solución empresarial interna",
        rol: "caso",
        problemaCorto: "La contabilidad registra la actividad, pero no responde a las preguntas internas de una empresa con varios socios.",
        solucionCorta: "Una capa de inteligencia financiera sobre la contabilidad existente para decidir con datos.",
        problema: "Los sistemas contables tradicionales registran la actividad económica, pero no siempre ofrecen respuestas a las necesidades internas de empresas con varios socios y departamentos.",
        solucion: "Una capa de inteligencia financiera sobre el sistema contable existente, que transforma los datos económicos en información útil para la gestión y la toma de decisiones.",
        capacidades: [
            "Rentabilidad por departamento.",
            "Cálculo de remuneraciones de socios.",
            "Distribución de beneficios y variables.",
            "Gestión de reservas.",
            "Control de tesorería.",
            "Transparencia económica entre socios.",
            "Apoyo a decisiones estratégicas."
        ],
        origen: "Desarrollado para un estudio creativo con varios socios y departamentos. Los datos de la empresa se mantienen confidenciales.",
        caso: {
            intro: "Una empresa con varios socios y departamentos tenía su contabilidad al día, pero las preguntas que importaban para gestionarla no tenían una respuesta directa en el sistema contable.",
            pares: [
                { antes: "¿Qué rentabilidad aporta cada departamento?", despues: "Rentabilidad por departamento." },
                { antes: "¿Cuánto corresponde a cada socio?", despues: "Cálculo de remuneraciones de socios." },
                { antes: "¿Cómo se reparten beneficios y variables?", despues: "Distribución de beneficios y variables." },
                { antes: "¿Cuánto reservar y con qué tesorería contamos?", despues: "Gestión de reservas y control de tesorería." },
                { antes: "¿Comparten todos los socios la misma información?", despues: "Transparencia económica entre socios." },
                { antes: "¿En qué datos se apoyan las decisiones estratégicas?", despues: "Apoyo a decisiones estratégicas." }
            ],
            cierre: "TIMÓN no sustituye a la contabilidad: se apoya en ella y la convierte en información útil para gestionar y decidir."
        },
        capturas: []
    },
    {
        id: "fliia",
        nombre: "Fliia",
        claim: "Inteligencia económica familiar",
        sectores: ["Fintech", "B2C", "AI", "SaaS"],
        estado: "Beta privada",
        rol: "insignia",
        tituloCapacidades: "Lo que abarca el producto",
        url: "https://fliia.es",
        problemaCorto: "Las herramientas financieras fragmentan la información y obligan a las familias a adaptarse a ellas.",
        solucionCorta: "Un motor económico integral que conecta ingresos, gastos, patrimonio, ahorro, decisiones y objetivos.",
        problema: "Las herramientas financieras tradicionales fragmentan la información y obligan a las familias a adaptarse a sistemas que no siempre representan su realidad.",
        solucion: "Un motor económico integral que conecta ingresos, gastos, patrimonio, ahorro, decisiones y objetivos.",
        capacidades: [
            "Gestión económica individual y familiar.",
            "Registro de movimientos mediante voz.",
            "Gestión patrimonial.",
            "Espacios económicos compartidos.",
            "Planificación financiera.",
            "Sueños y decisiones.",
            "Inteligencia artificial aplicada a la economía cotidiana."
        ],
        vision: "Evolucionar hacia un sistema económico adaptativo, capaz de ofrecer experiencias personalizadas según las necesidades de cada persona y familia.",
        capturas: []
    },
    {
        id: "outbill",
        nombre: "Outbill",
        claim: "Gestión empresarial sin fronteras",
        sectores: ["Accounting", "Fintech", "Multiempresa"],
        estado: "En uso privado",
        problemaCorto: "Varias empresas y actividades significan varias herramientas, varios costes y varios sistemas fiscales.",
        solucionCorta: "Una plataforma multiempresa que adapta sus funcionalidades al contexto fiscal de cada negocio.",
        problema: "Gestionar diferentes empresas y actividades profesionales implica utilizar múltiples herramientas, asumir costes recurrentes y adaptarse a distintos sistemas fiscales.",
        solucion: "Una plataforma de gestión económica multiempresa que adapta sus funcionalidades al contexto fiscal de cada negocio.",
        capacidades: [
            "Gestión de múltiples empresas.",
            "Gestión de actividades como autónomo.",
            "Centralización de información económica.",
            "Control contable y financiero.",
            "Adaptación al contexto fiscal de cada país.",
            "Modelos y obligaciones fiscales según jurisdicción."
        ],
        origen: "Desarrollado inicialmente para gestionar actividades empresariales en España y Reino Unido.",
        capturas: []
    },
    {
        id: "pierlink",
        nombre: "Pierlink",
        claim: "Inteligencia relacional para la industria náutica",
        sectores: ["Yachting", "Networking", "AI"],
        estado: "Validación sectorial",
        problemaCorto: "Ferias, tarjetas de visita y conversaciones cuyo potencial comercial se pierde sin contexto ni seguimiento.",
        solucionCorta: "Una red de inteligencia comercial que conecta personas, empresas, eventos y oportunidades.",
        problema: "Los profesionales de la industria náutica internacional asisten a numerosas ferias, acumulan tarjetas de visita y generan relaciones comerciales cuyo potencial se pierde por falta de contexto y seguimiento.",
        solucion: "Una plataforma que transforma los contactos profesionales en una red de inteligencia comercial, conectando personas, empresas, eventos y oportunidades de negocio.",
        capacidades: [
            "Digitalización inteligente de tarjetas de visita.",
            "Creación automática de contactos.",
            "Asociación con ferias y eventos.",
            "Notas e historial de conversaciones.",
            "Búsqueda mediante lenguaje natural.",
            "Identificación de oportunidades comerciales.",
            "Detección de conexiones directas e indirectas.",
            "Solicitudes profesionales y presentaciones entre contactos."
        ],
        ejemplo: "Un profesional necesita encontrar un proveedor para realizar un refit de un yate en Palma de Mallorca. La aplicación analiza su red de contactos para identificar a quién puede consultar o quién podría facilitarle una presentación.",
        origen: "Diseñado a partir de necesidades reales de profesionales de la industria internacional de los superyates.",
        capturas: []
    },
    {
        id: "automotive",
        nombre: "Automotive Finance",
        claim: "Gestión inteligente de financiación de vehículos",
        sectores: ["Automotive", "Fintech", "B2B"],
        estado: "Desarrollo a medida",
        problemaCorto: "Muchos clientes, cuotas y vencimientos que controlar en cada vehículo financiado.",
        solucionCorta: "Una plataforma que centraliza las operaciones de financiación y anticipa los cobros pendientes.",
        problema: "Las empresas que comercializan vehículos financiados necesitan controlar numerosos clientes, cuotas, vencimientos y obligaciones de pago.",
        solucion: "Una plataforma especializada que centraliza las operaciones de financiación y facilita el seguimiento proactivo de los cobros.",
        capacidades: [
            "Gestión de clientes.",
            "Gestión de operaciones financiadas.",
            "Control de cuotas.",
            "Calendario de vencimientos.",
            "Seguimiento de pagos pendientes.",
            "Detección de impagos.",
            "Alertas automáticas."
        ],
        origen: "Desarrollado para resolver una necesidad operativa real de una empresa del sector automovilístico.",
        capturas: []
    }
];
