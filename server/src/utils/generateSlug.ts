export function generateSlug(title: string) {
    return title
      .toLowerCase()                   // lowercase
      .trim()                          // remove extra spaces
      .replace(/\s+/g, '-')            // spaces => dash
      .replace(/[^\w\u0980-\u09FF\-]+/g, ''); // remove unwanted chars except Bengali & dash
  }
  