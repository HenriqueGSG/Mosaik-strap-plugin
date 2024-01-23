const path = require("path");
const fs = require("fs").promises;
module.exports = {
  checkLogFileExists,
};
async function checkLogFileExists(fileName, enviroment) {
  try {
    const filePath = path.join(
      __dirname,
      `../../../../logs/${enviroment}/${fileName}.log`
    );
    console.log(filePath);
    await fs.access(filePath); // Apenas chame fs.access com o caminho do arquivo
    console.log(`O arquivo ${fileName} existe.`);
    return true;
  } catch (err) {
    console.error(`O arquivo ${fileName} não existe.`);
    return false;
  }
}
