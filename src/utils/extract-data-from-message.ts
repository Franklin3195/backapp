export const extractDataFromMessage = (message: string): string | null => {
  const regex = /'([^']+)'/;
  const match = regex.exec(message);

  if (match && match.length >= 2) {
    return match[1];
  }

  return null;
};
