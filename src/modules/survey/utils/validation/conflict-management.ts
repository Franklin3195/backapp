/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable guard-for-in */
type PreguntaType = Record<string, { A: string; B: string }>;
const preguntas: PreguntaType = {
  question1: { A: 'Evitacion', B: 'Acomodarse' },
  question2: { A: 'Compromiso', B: 'Colaboracion' },
  question3: { A: 'Competicion', B: 'Acomodarse' },
  question4: { A: 'Compromiso', B: 'Acomodarse' },
  question5: { A: 'Colaboracion', B: 'Evitacion' },
  question6: { A: 'Evitacion', B: 'Competicion' },
  question7: { A: 'Evitacion', B: 'Compromiso' },
  question8: { A: 'Competicion', B: 'Colaboracion' },
  question9: { A: 'Evitacion', B: 'Competicion' },
  question10: { A: 'Competicion', B: 'Compromiso' },
  question11: { A: 'Colaboracion', B: 'Acomodarse' },
  question12: { A: 'Evitacion', B: 'Compromiso' },
  question13: { A: 'Compromiso', B: 'Competicion' },
  question14: { A: 'Colaboracion', B: 'Competicion' },
  question15: { A: 'Acomodarse', B: 'Evitacion' },
  question16: { A: 'Acomodarse', B: 'Competicion' },
  question17: { A: 'Competicion', B: 'Evitacion' },
  question18: { A: 'Acomodarse', B: 'Compromiso' },
  question19: { A: 'Colaboracion', B: 'Evitacion' },
  question20: { A: 'Colaboracion', B: 'Compromiso' },
  question21: { A: 'Acomodarse', B: 'Colaboracion' },
  question22: { A: 'Compromiso', B: 'Competicion' },
  question23: { A: 'Colaboracion', B: 'Evitacion' },
  question24: { A: 'Acomodarse', B: 'Compromiso' },
  question25: { A: 'Competicion', B: 'Acomodarse' },
  question26: { A: 'Compromiso', B: 'Colaboracion' },
  question27: { A: 'Evitacion', B: 'Acomodarse' },
  question28: { A: 'Competicion', B: 'Colaboracion' },
  question29: { A: 'Compromiso', B: 'Evitacion' },
  question30: { A: 'Acomodarse', B: 'Colaboracion' },
};

type AnswerType = Record<string, 'A' | 'B'>;

function calculateHighestValue(
  preguntas: PreguntaType,
  answers: AnswerType,
): string[] {
  const results: Record<string, number> = {};

  // Iterate through each answer
  for (const question in answers) {
    const answer = answers[question];
    const selectedOption = preguntas[question][answer];

    // Increment the count for the selected option
    if (results[selectedOption]) {
      results[selectedOption]++;
    } else {
      results[selectedOption] = 1;
    }
  }

  // Find the max value(s)
  let maxCount = 0;
  const maxGroups: string[] = [];

  for (const group in results) {
    if (results[group] > maxCount) {
      maxCount = results[group];
      maxGroups.length = 0; // Clear the array
      maxGroups.push(group);
    } else if (results[group] === maxCount && maxGroups.length < 2) {
      maxGroups.push(group);
    }
  }

  return maxGroups;
}

export const getAnswerConflictManagementNew = (respuestasUsuario) =>
  calculateHighestValue(preguntas, respuestasUsuario as AnswerType);
// Usage
