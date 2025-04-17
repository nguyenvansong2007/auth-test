import path from 'path';

export const homePage = () => {
  return res.sendFile(path.join(`${__dirname}/../views/index.html`));
}

