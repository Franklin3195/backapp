export const textToHtml = (text: string): string => {
  let htmlText = text.replaceAll('\n\n', '</p><p>');
  htmlText = htmlText.replaceAll('\n', '<br>');

  return `<p>${htmlText}</p>`;
};
