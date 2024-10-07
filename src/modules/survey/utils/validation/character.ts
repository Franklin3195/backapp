/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-shadow */
type Preguntas = Record<string, string[]>;

type Answers = Record<string, string>;
const preguntas = {
  question1: ['Flematico'],
  question2: ['Sanguineo'],
  question3: ['Nervioso', 'Sentimental', 'Amorfo'],
  question4: ['Sanguineo'],
  question5: ['Colerico'],
  question6: ['Apasionado'],
  question7: ['Apatico', 'Amorfo'],
  question8: ['Sentimental'],
  question9: ['Nervioso'],
  question10: ['Flematico', 'Apatico'],
  question11: ['Colerico'],
  question12: ['Flematico', 'Sentimental'],
  question13: ['Apasionado'],
  question14: ['Colerico'],
  question15: ['Apasionado', 'Nervioso', 'Colerico'],
  question16: ['Sanguineo', 'Amorfo', 'Flematico'],
  question17: ['Amorfo'],
  question18: ['Nervioso', 'Sentimental'],
  question19: ['Apasionado'],
  question20: ['Amorfo'],
  question21: ['Apatico'],
  question22: ['Nervioso'],
  question23: ['Flematico', 'Apatico'],
  question24: ['Amorfo'],
  question25: ['Amorfo'],
  question26: ['Flematico', 'Apatico'],
  question27: ['Sanguineo'],
  question28: ['Flematico', 'Apatico'],
  question29: ['Amorfo'],
  question30: ['Nervioso'],
  question31: ['Sentimental'],
  question32: ['Nervioso', 'Colerico'],
  question33: ['Sentimental', 'Apatico'],
  question34: ['Apasionado', 'Colerico'],
  question35: ['Sentimental', 'Apatico'],
  question36: ['Sanguineo'],
  question37: ['Apatico'],
  question38: ['Apasionado'],
  question39: ['Colerico', 'Nervioso'],
  question40: ['Apasionado'],
  question41: ['Colerico'],
  question42: ['Nervioso'],
  question43: ['Colerico', 'Sanguineo'],
  question44: ['Flematico'],
  question45: ['Amorfo'],
  question46: ['Sanguineo'],
  question47: ['Colerico', 'Sanguineo'],
  question48: ['Flematico', 'Sentimental', 'Apatico'],
  question49: ['Apasionado'],
  question50: ['Sanguineo'],
  question51: ['Apasionado', 'Flematico', 'Sentimental'],
  question52: ['Sanguineo'],
  question53: ['Nervioso', 'Sentimental', 'Amorfo'],
  question54: ['Apasionado'],
};

function filterQuestions(preguntas: Preguntas, answers: Answers): Preguntas {
  // Create a copy of preguntas to avoid modifying the original object
  const filteredPreguntas: Preguntas = { ...preguntas };

  // Loop through the answers
  for (const question in answers) {
    // Check if the answer is "B"
    if (answers[question] === 'B') {
      // If so, delete the corresponding question from filteredPreguntas
      delete filteredPreguntas[question];
    }
  }

  return filteredPreguntas;
}

// function summarizeData(questions: QuestionData): Array<[string, number]> {
//   const summary: Summary = {};

//   // Iterate over each question
//   for (const question in questions) {
//     const answers = questions[question];

//     // Iterate over each answer in the question
//     for (const answer of answers) {
//       // Increment the count for each answer
//       if (summary[answer]) {
//         summary[answer]++;
//       } else {
//         summary[answer] = 1;
//       }
//     }
//   }

//   // Convert the summary object to an array and sort by the count
//   const sortedSummary = Object.entries(summary).sort((a, b) => b[1] - a[1]);

//   // Return the top 2 entries
//   return sortedSummary.slice(0, 2);
// }

function countValuesAndFindMax(preguntas: Preguntas): string[] {
  const valueCounts: Record<string, number> = {};

  // Count the occurrences of each value
  for (const key in preguntas) {
    for (const value of preguntas[key]) {
      valueCounts[value] = (valueCounts[value] || 0) + 1;
    }
  }

  // Find the maximum count
  const maxCount = Math.max(...Object.values(valueCounts));

  // Find the value(s) with the maximum count
  return Object.keys(valueCounts).filter(
    (value) => valueCounts[value] === maxCount,
  );
}

export const getAnswerCharacterNew = (respuestasUsuario) => {
  const filteredPreguntas = filterQuestions(
    preguntas,
    respuestasUsuario as Answers,
  );

  return countValuesAndFindMax(filteredPreguntas);
};
