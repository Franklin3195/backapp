/* eslint-disable max-len */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/naming-convention */
const arrayDeConstantes = [
  'triste-depresivo',
  'ansiedad',
  'ira-hostilidad',
  'alegría',
];
const subescalas = {
  'triste-depresivo': ['question4', 'question7', 'question10', 'question16'],
  ansiedad: ['question1', 'question5', 'question9', 'question13'],
  'ira-hostilidad': ['question2', 'question8', 'question11', 'question14'],
  alegría: ['question3', 'question6', 'question12', 'question15'],
};

export const getAnswerMood2 = (respuestas) => {
  if (!respuestas) {
    console.error('No se pudieron cargar las respuestas JSON.');

    return null;
  }

  // Calcular los puntajes por categoría
  const puntajesPorCategoria = [];

  for (const categoria of arrayDeConstantes) {
    const puntajeCategoria = {
      category: categoria,
      score: 0,
      interpretations: '',
    };

    for (const pregunta of subescalas[categoria]) {
      puntajeCategoria.score += respuestas[pregunta] || 0;
    }

    // Dividir el puntaje de cada categoría por 4
    puntajeCategoria.score /= 4;

    puntajeCategoria.score = Number(puntajeCategoria.score.toFixed(0));

    // Aplicar condiciones de interpretación
    switch (categoria) {
      case 'triste-depresivo': {
        if (puntajeCategoria.score >= 6) {
          puntajeCategoria.interpretations = `PRESENTAS SINTOMAS DEPRESIVOS: Cuentas con un puntaje mayor de 6, lo que implica un nivel alto en la escala de depresión y podrías estar experimentando síntomas de tristeza persistentes, pérdida de su interés por las cosas que comúnmente realizas, cambios en el estado de ánimo, del sueño, del apetito o dificultades cognitivas.

          Recomendación: tu estado emocional está en efecto negativo, es una alerta.
          `;
        } else if (puntajeCategoria.score <= 5) {
          puntajeCategoria.interpretations = `NO PRESENTAS SÍNTOMAS DEPRESIVOS: Cuenta con un puntaje inferior a 5 lo que implica un nivel bajo en la subescala de depresión, es decir que no experimenta en este momento síntomas asociados a la depresión. Sus interacciones sociales pueden ser positivas, con buena conexión emocional consigo mismo y los demás.

          Recomendación: tu estado emocional está en efecto positivo, para mantenerte, es importante a medida que tu vida avanza, retroalimentarse, para continuar en procesos de mejora continua como ser humano y buscar de manera regular, oportunidades para tu crecimiento y superación personal.

          `;
        }

        break;
      }

      case 'ansiedad': {
        if (puntajeCategoria.score >= 6) {
          puntajeCategoria.interpretations = `PRESENTAS SINTOMAS DE ANSIEDAD: Cuentas con un puntaje mayor de 6 en la subescala de ansiedad, lo que implica que puedes experimentar niveles altos de preocupación excesiva, tensión, irritabilidad, problemas del sueño, fobias, pánico, nerviosismo. `;
        } else if (puntajeCategoria.score <= 5) {
          puntajeCategoria.interpretations = `NO PRESENTAS SINTOMAS DE ANSIEDAD: Con el puntaje inferior a 5 se puede interpretar que los niveles de ansiedad son positivos. Es decir que experimenta sensaciones favorables para su estado emocional.  `;
        }

        break;
      }

      case 'alegría': {
        if (puntajeCategoria.score >= 6) {
          puntajeCategoria.interpretations = `ALEGRÍA EFECTO POSITIVO: En esta subescala, tu puntaje mayor a 7 implica altos niveles en tus emociones positivas relacionadas a satisfacción, alegría, optimismo y un estado general de bienestar. `;
        } else if (puntajeCategoria.score <= 5) {
          puntajeCategoria.interpretations = `BAJO NIVEL DE ALEGRIA: En esta subescala, tu puntaje es inferior a 5 lo que implica que tu estado de ánimo está en riesgo en este momento. `;
        }

        break;
      }

      case 'ira-hostilidad': {
        if (puntajeCategoria.score >= 6) {
          puntajeCategoria.interpretations = `TIENES ALTOS NIVELES DE HOSTILIDAD: En esta subescala tu puntaje es mayor a 7, implica un alto nivel de irritabilidad y molestias persistentes, trastornos en el estado de ánimo, que generalmente afectan las relaciones con uno mismo y con los demás. `;
        } else if (puntajeCategoria.score <= 5) {
          puntajeCategoria.interpretations = `NO PRESENTAS NIVELES ALTOS DE HOSTILIDAD: Tu puntaje inferior a 5, implica relaciones afables (amabilidad, cortesía y buen trato) con los demás. `;
        }

        break;
      }
    }

    puntajesPorCategoria.push(puntajeCategoria as never);
  }

  return puntajesPorCategoria;
};
