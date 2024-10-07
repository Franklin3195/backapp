/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
const arrayDeConstantes = ['Compromiso', 'Competicion', 'Colaboracion', 'Evitacion', 'Acomodarse'];

// Define la lógica para procesar las respuestas del usuario
export const getAnswerConflictManagement = (respuestasUsuario) => {
        const contadores = {};
    arrayDeConstantes.forEach((constante) => {
        contadores[constante] = 0;
    });

    const preguntas = [
        { pregunta: 'question1', respuestas: { A: 'Evitacion', B: 'Acomodarse' } },
        { pregunta: 'question2', respuestas: { A: 'Compromiso', B: 'Colaboracion' } },
        { pregunta: 'question3', respuestas: { A: 'Competicion', B: 'Acomodarse' } },
        { pregunta: 'question4', respuestas: { A: 'Compromiso', B: 'Acomodarse' } },
        { pregunta: 'question5', respuestas: { A: 'Colaboracion', B: 'Evitacion' } },
        { pregunta: 'question6', respuestas: { A: 'Evitacion', B: 'Competicion' } },
        { pregunta: 'question7', respuestas: { A: 'Evitacion', B: 'Compromiso' } },
        { pregunta: 'question8', respuestas: { A: 'Competicion', B: 'Colaboracion' } },
        { pregunta: 'question9', respuestas: { A: 'Evitacion', B: 'Competicion' } },
        { pregunta: 'question10', respuestas: { A: 'Competicion', B: 'Compromiso' } },
        { pregunta: 'question11', respuestas: { A: 'Colaboracion', B: 'Acomodarse' } },
        { pregunta: 'question12', respuestas: { A: 'Evitacion', B: 'Compromiso' } },
        { pregunta: 'question13', respuestas: { A: 'Compromiso', B: 'Competicion' } },
        { pregunta: 'question14', respuestas: { A: 'Colaboracion', B: 'Competicion' } },
        { pregunta: 'question15', respuestas: { A: 'Acomodarse', B: 'Evitacion' } },
        { pregunta: 'question16', respuestas: { A: 'Acomodarse', B: 'Competicion' } },
        { pregunta: 'question17', respuestas: { A: 'Competicion', B: 'Evitacion' } },
        { pregunta: 'question18', respuestas: { A: 'Acomodarse', B: 'Compromiso' } },
        { pregunta: 'question19', respuestas: { A: 'Colaboracion', B: 'Evitacion' } },
        { pregunta: 'question20', respuestas: { A: 'Colaboracion', B: 'Compromiso' } },
        { pregunta: 'question21', respuestas: { A: 'Acomodarse', B: 'Colaboracion' } },
        { pregunta: 'question22', respuestas: { A: 'Compromiso', B: 'Competicion' } },
        { pregunta: 'question23', respuestas: { A: 'Colaboracion', B: 'Evitacion' } },
        { pregunta: 'question24', respuestas: { A: 'Acomodarse', B: 'Compromiso' } },
        { pregunta: 'question25', respuestas: { A: 'Competicion', B: 'Acomodarse' } },
        { pregunta: 'question26', respuestas: { A: 'Compromiso', B: 'Colaboracion' } },
        { pregunta: 'question27', respuestas: { A: 'Evitacion', B: 'Acomodarse' } },
        { pregunta: 'question28', respuestas: { A: 'Competicion', B: 'Colaboracion' } },
        { pregunta: 'question29', respuestas: { A: 'Compromiso', B: 'Evitacion' } },
        { pregunta: 'question30', respuestas: { A: 'Acomodarse', B: 'Colaboracion' } },
    ];

    preguntas.forEach((pregunta) => {
        const respuestaUsuario = respuestasUsuario[pregunta.pregunta];

        if (respuestaUsuario) {
            const categoria = pregunta.respuestas[respuestaUsuario];
            contadores[categoria]++;
        }
    });

    let mayorContador = 0;
    const categoriasEmpatadas: string[] = [];

    arrayDeConstantes.forEach((constante) => {
        const contadorActual = contadores[constante];

        if (contadorActual > mayorContador) {
            mayorContador = contadorActual;
            categoriasEmpatadas.length = 0; // Restablecer array en caso de nueva categoría líder
            categoriasEmpatadas.push(constante);
        } else if (contadorActual === mayorContador) {
            categoriasEmpatadas.push(constante);
        }
    });

    return categoriasEmpatadas.length > 0 ? categoriasEmpatadas : [];
};

