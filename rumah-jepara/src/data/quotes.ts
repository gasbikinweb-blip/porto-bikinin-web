// Kutipan inspiratif tentang desain & rumah. Hanya kutipan yang atribusinya jelas.
export type Quote = {
  text: string;
  author: string;
  role: string;
};

export const quotes: readonly Quote[] = [
  {
    text: 'Have nothing in your houses that you do not know to be useful, or believe to be beautiful.',
    author: 'William Morris',
    role: 'Desainer & pengrajin, pelopor gerakan Arts and Crafts',
  },
  {
    text: 'The details are not the details. They make the design.',
    author: 'Charles Eames',
    role: 'Desainer furnitur legendaris',
  },
  {
    text: 'Design is not just what it looks like and feels like. Design is how it works.',
    author: 'Steve Jobs',
    role: 'Penemu & pendiri Apple',
  },
];
