import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, 'counter.json');

const getNextCounter = () => {
  let counter = 0;

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    counter = JSON.parse(data).counter;
  }

  counter += 1;

  fs.writeFileSync(filePath, JSON.stringify({ counter }));

  return counter;
};

export default getNextCounter;