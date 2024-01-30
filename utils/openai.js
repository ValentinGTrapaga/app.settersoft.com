require("dotenv").config();
const OpenAI = require("openai");
const openai = new OpenAI();

/** @param {{avatar: string, client: string, offer: string}} conversations */
async function generatePromise(conversations) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Vamos a hacer un juego de roles. Eres un asistente que se encarga de diseñar ofertas para el equipo de marketing. Para hacerlo, debes seguir paso a paso:\n1. Preguntar al usuario la información de [Archivo 1]\n2. Preguntar al usuario la información de [Archivo 2]\n 3. Preguntar al usuario la información de [Archivo 3]\n 4. En base a esa información, debes armar cinco promesas siguiendo esta estructura: Como (beneficio/objetivo, extraído de archivo 1) en (tiempo concreto), sin (objeción 1, extraido de archivo 2), ni/aunque/sin (objeción 2) a través de (mecanismo único para lograr el objetivo)\n### Ejemplos ###\n- Cómo liberarte de la gestión fiscal, contable y laboral en sólo un click, sin papeleo y sin gastar demasiado tiempo, a través de nuestro sistema CM virtual 100% automatizado.\n- Cómo reconectar con tu esencia, superar la ansiedad y emprender desde la autenticidad y los ciclos naturales, en solo 3 meses, sin perder el tiempo en superficialidades ni quick fixes que te dejan vacíos, ni en horas de teoría sin aplicación práctica. A través de mi metodología exclusiva Almañilería y Zen-prendimiento.\n- Cómo ayudar a tu hijo a que aprenda a gestionar sus pensamientos, emociones y forma de actuar, en tan solo 12 semanas. Sin necesidad de desplazarte de casa y sin perder el tiempo en búsqueda de soluciones. a través de las herramientas de autorregulación y autoconocimiento para niños y educadores con el método de ©Movimiento y Color de Esther Ponce.\n- Cómo escalar tu negocio de consultoría para facturar al menos $10,000 al mes en los próximos 3 meses, sin descuidar a tus clientes actuales ni ser experto en transformación digital, a través de la metodología Skala.\n",
      },
      {
        role: "assistant",
        content: "¿Me darías información sobre el perfil del cliente?",
      },
      {
        role: "user",
        content: `${conversations.client}`,
      },
      {
        role: "assistant",
        content: "Profundiza en tu avatar",
      },
      {
        role: "user",
        content: `${conversations.avatar}`,
      },
      {
        role: "assistant",
        content:
          "¿Me darías información del último archivo sobre como debería aproximar la oferta?",
      },
      {
        role: "user",
        content: `${conversations.offer}`,
      },
    ],
    model: "gpt-4-1106-preview",
  });

  return completion.choices[0].message.content;
}

/** @param {{avatar: string, client: string, offer: string, structure: string}} conversations */
async function generateScript(conversations) {
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                "Vamos a hacer un juego de roles. Eres un asistente que se encarga de diseñar un guión para el equipo de marketing, el guión se usará para armar un vídeo de venta. Para hacerlo, debes seguir paso a paso: 1. Preguntar al usuario la información de [Archivo 1] 2. Preguntar al usuario la información de [Archivo 2] 3. Preguntar al usuario la información de [Archivo 3] 4. Preguntar al usuario cual va a ser la estructura del guión. 5. En base a esa información, armar el guión siguiendo la estructura enviada en el último archivo.",
            },
            {
                role: "assistant",
                content: "¿Me darías información sobre el perfil del cliente?",
            },
            {
                role: "user",
                content: `${conversations.client}`,
            },
            {
                role: "assistant",
                content: "Profundiza en tu avatar",
            },
            {
                role: "user",
                content: `${conversations.avatar}`,
            },
            {
                role: "assistant",
                content:
                "¿Me darías información del archivo sobre como debería aproximar la oferta?",
            },
            {
                role: "user",
                content: `${conversations.offer}`,
            },
            {
                role: "assistant",
                content:
                "¿Cuál debería de ser la estructura de tu guion?",
            },
            {
                role: "user",
                content: `${conversations.structure}`,
            },
        ],
        model: "gpt-4-1106-preview",
        temperature: 0.7,
    })

    return completion.choices[0].message.content
}

module.exports = { generatePromise, generateScript }
