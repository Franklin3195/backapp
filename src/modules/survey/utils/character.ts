/* eslint-disable sonarjs/cognitive-complexity */
const arrayDeConstantes = [
  'Colerico',
  'Apasionado',
  'Sanguineo',
  'Flematico',
  'Nervioso',
  'Sentimental',
  'Amorfo',
  'Apatico',
];

// Cargar el archivo JSON de respuestas del usuario
export const getAnswerCharacter = (respuestasUsuario) => {
  const contadores = {};

  for (const constante of arrayDeConstantes) {
    contadores[constante] = 0;
  }

  // Definir las preguntas y sus respuestas
  const preguntas = [
    { pregunta: 'question1', respuestas: { A: ['Flematico'], B: [] } },
    { pregunta: 'question2', respuestas: { A: ['Sanguineo'], B: [] } },
    {
      pregunta: 'question3',
      respuestas: { A: ['Nervioso', 'Sentimental', 'Amorfo'], B: [] },
    },
    { pregunta: 'question4', respuestas: { A: ['Sanguineo'], B: [] } },
    { pregunta: 'question5', respuestas: { A: ['Colerico'], B: [] } },
    { pregunta: 'question6', respuestas: { A: ['Apasionado'], B: [] } },
    { pregunta: 'question7', respuestas: { A: ['Apatico', 'Amorfo'], B: [] } },
    { pregunta: 'question8', respuestas: { A: ['Sentimental'], B: [] } },
    { pregunta: 'question9', respuestas: { A: ['Nervioso'], B: [] } },
    {
      pregunta: 'question10',
      respuestas: { A: ['Flematico', 'Apatico'], B: [] },
    },
    { pregunta: 'question11', respuestas: { A: ['Colerico'], B: [] } },
    {
      pregunta: 'question12',
      respuestas: { A: ['Flematico', 'Sentimental'], B: [] },
    },
    { pregunta: 'question13', respuestas: { A: ['Apasionado'], B: [] } },
    { pregunta: 'question14', respuestas: { A: ['Colerico'], B: [] } },
    {
      pregunta: 'question15',
      respuestas: { A: ['Apasionado', 'Nervioso', 'Colerico'], B: [] },
    },
    {
      pregunta: 'question16',
      respuestas: { A: ['Sanguineo', 'Amorfo', 'Flematico'], B: [] },
    },
    { pregunta: 'question17', respuestas: { A: ['Amorfo'], B: [] } },
    {
      pregunta: 'question18',
      respuestas: { A: ['Nervioso', 'Sentimental'], B: [] },
    },
    { pregunta: 'question19', respuestas: { A: ['Apasionado'], B: [] } },
    { pregunta: 'question20', respuestas: { A: ['Amorfo'], B: [] } },
    { pregunta: 'question21', respuestas: { A: ['Apatico'], B: [] } },
    { pregunta: 'question22', respuestas: { A: ['Nervioso'], B: [] } },
    {
      pregunta: 'question23',
      respuestas: { A: ['Flematico', 'Apatico'], B: [] },
    },
    { pregunta: 'question24', respuestas: { A: ['Amorfo'], B: [] } },
    { pregunta: 'question25', respuestas: { A: ['Amorfo'], B: [] } },
    {
      pregunta: 'question26',
      respuestas: { A: ['Flematico', 'Apatico'], B: [] },
    },
    { pregunta: 'question27', respuestas: { A: ['Sanguineo'], B: [] } },
    {
      pregunta: 'question28',
      respuestas: { A: ['Flematico', 'Apatico'], B: [] },
    },
    { pregunta: 'question29', respuestas: { A: ['Amorfo'], B: [] } },
    { pregunta: 'question30', respuestas: { A: ['Nervioso'], B: [] } },
    { pregunta: 'question31', respuestas: { A: ['Sentimental'], B: [] } },
    {
      pregunta: 'question32',
      respuestas: { A: ['Nervioso', 'Colerico'], B: [] },
    },
    {
      pregunta: 'question33',
      respuestas: { A: ['Sentimental', 'Apatico'], B: [] },
    },
    {
      pregunta: 'question34',
      respuestas: { A: ['Apasionado', 'Colerico'], B: [] },
    },
    {
      pregunta: 'question35',
      respuestas: { A: ['Sentimental', 'Apatico'], B: [] },
    },
    { pregunta: 'question36', respuestas: { A: ['Sanguineo'], B: [] } },
    { pregunta: 'question37', respuestas: { A: ['Apatico'], B: [] } },
    { pregunta: 'question38', respuestas: { A: ['Apasionado'], B: [] } },
    {
      pregunta: 'question39',
      respuestas: { A: ['Colerico', 'Nervioso'], B: [] },
    },
    { pregunta: 'question40', respuestas: { A: ['Apasionado'], B: [] } },
    { pregunta: 'question41', respuestas: { A: ['Colerico'], B: [] } },
    { pregunta: 'question42', respuestas: { A: ['Nervioso'], B: [] } },
    {
      pregunta: 'question43',
      respuestas: { A: ['Colerico', 'Sanguineo'], B: [] },
    },
    { pregunta: 'question44', respuestas: { A: ['Flematico'], B: [] } },
    { pregunta: 'question45', respuestas: { A: ['Amorfo'], B: [] } },
    { pregunta: 'question46', respuestas: { A: ['Sanguineo'], B: [] } },
    {
      pregunta: 'question47',
      respuestas: { A: ['Colerico', 'Sanguineo'], B: [] },
    },
    {
      pregunta: 'question48',
      respuestas: { A: ['Flematico', 'Sentimental', 'Apatico'], B: [] },
    },
    { pregunta: 'question49', respuestas: { A: ['Apasionado'], B: [] } },
    { pregunta: 'question50', respuestas: { A: ['Sanguineo'], B: [] } },
    {
      pregunta: 'question51',
      respuestas: { A: ['Apasionado', 'Flematico', 'Sentimental'], B: [] },
    },
    { pregunta: 'question52', respuestas: { A: ['Sanguineo'], B: [] } },
    {
      pregunta: 'question53',
      respuestas: { A: ['Nervioso', 'Sentimental', 'Amorfo'], B: [] },
    },
    { pregunta: 'question54', respuestas: { A: ['Apasionado'], B: [] } },
  ];

  // Recorrer las respuestas del usuario y asignar puntos
  for (const pregunta of preguntas) {
    const respuestaUsuario = respuestasUsuario[pregunta.pregunta];

    if (respuestaUsuario === 'A') {
      // Sumar puntos a las categorías correspondientes para respuestas "A"
      for (const categorias of pregunta.respuestas.A) {
        if (Array.isArray(categorias)) {
          // Si la categoría es un arreglo, recorrer y sumar puntos
          for (const categoria of categorias) {
            if (categoria !== '') {
              contadores[categoria]++;
            }
          }
        } else {
          // Si la categoría no es un arreglo, sumar puntos directamente
          if (categorias !== '') {
            contadores[categorias]++;
          }
        }
      }
    } else if (respuestaUsuario === 'B') {
      // No sumar puntos para respuestas "B"
    }
  }

  let mayorContador = 0;
  const categoriasEmpatadas = [];

  for (const constante of arrayDeConstantes) {
    const contadorActual = contadores[constante];

    if (contadorActual > mayorContador) {
      mayorContador = contadorActual;
      categoriasEmpatadas.length = 0; // Restablecer array en caso de nueva categoría líder
      categoriasEmpatadas.push(constante as never);
    } else if (contadorActual === mayorContador) {
      categoriasEmpatadas.push(constante as never);
    }
  }

  return categoriasEmpatadas.length > 0 ? categoriasEmpatadas : [];
};
