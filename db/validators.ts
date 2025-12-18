export const validateAuthor = (author: string): boolean => {
  if (!author || author.trim().length === 0) return false;

  const parts = author.trim().split(" ");
  if (parts.length < 2) return false; // braucht immer Vor- und Nachname

  //muss mit Großbuchstabe beginnen sonst ist es ungültig
  return parts.every(
    (part) => part.length > 0 && part[0] === part[0].toUpperCase()
  );
};

export const validateTitle = (title: string): boolean => {
  return !!title && title.trim().length >= 3;
};
