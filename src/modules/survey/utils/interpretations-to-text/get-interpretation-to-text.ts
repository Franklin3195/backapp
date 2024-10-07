export interface IInterpretationToText {
  category: string[];
  interpretations: string[];
}

export const getInterpretationToText = (
  result: IInterpretationToText,
): string => {
  let text = '';

  for (const interpretation of result.interpretations) {
    text += `${interpretation}\n`;
  }

  //replace all \r\n  with nothing
  text = text.replaceAll('\r\n', '');

  return text;
};

export interface IInterpretationToTextMood2 {
  category: string;
  score: number;
  interpretations: string;
}

export const getInterpretationToTextMood2 = (
  results: IInterpretationToTextMood2[],
): string => {
  let text = '';

  for (const result of results) {
    text += `${result.interpretations}\n`;
  }

  //replace all \r\n  with nothing
  text = text.replaceAll('\r\n', '');

  return text;
};
