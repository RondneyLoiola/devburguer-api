const  multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (_request, file, callback) => {
      const uniqueName = v4().concat(`-${file.originalname}`);
      return callback(null, uniqueName);
    },
  }),
};

// OBS: tem que enviar como multiformdata no insomnia, documentação do multer

//Pode retornar com nome igual, mas diferencia pelo id no ínicio
//Ex: coca.png, 13-coca.png, 304-coca.png