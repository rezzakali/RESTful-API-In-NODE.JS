const fs = require('fs');

const writeDataToFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err.message);
    }
  });
};
module.exports = {
  writeDataToFile,
};
