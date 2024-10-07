/* eslint-disable no-prototype-builtins */
const preguntas = [
  { pregunta: 'question1', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question2', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question3', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question4', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question5', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question6', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question7', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question8', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question9', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
  { pregunta: 'question10', opciones: { A: 0, B: 1, C: 2, D: 3, E: 4 } },
];

export function getAnswerMood(respuestas) {
  let puntuacionTotal = 0;

  for (const pregunta in respuestas) {
    if (respuestas.hasOwnProperty(pregunta)) {
      const opcionSeleccionada = respuestas[pregunta];
      const preguntaActual = preguntas.find((p) => p.pregunta === pregunta);

      if (preguntaActual && preguntaActual.opciones[opcionSeleccionada]) {
        puntuacionTotal += preguntaActual.opciones[opcionSeleccionada];
      }
    }
  }

  const rangos = [
    { min: 0, max: 15, respuesta: 'respuesta1' },
    { min: 16, max: 25, respuesta: 'respuesta2' },
    { min: 26, max: Number.POSITIVE_INFINITY, respuesta: 'respuesta3' },
  ];
  let resultado = '';

  for (const rango of rangos) {
    if (puntuacionTotal >= rango.min && puntuacionTotal <= rango.max) {
      resultado = rango.respuesta;
      break;
    }
  }

  return resultado;
}
