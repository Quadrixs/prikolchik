const fs = require('fs-extra');
const ejs = require('ejs');
const path = require('path');

// Путь к вашим шаблонам EJS
const templatesDir = path.join(__dirname, 'views');
// Путь к выходной папке
const outputDir = path.join(__dirname, 'static');

// Убедитесь, что выходная папка существует
fs.ensureDirSync(outputDir);

// Пример данных, которые вы можете передавать в шаблон
const data = {
  user: null, // или true, если пользователь авторизован
  title: 'My YouTube Clone',
  content: 'This is a static version of my YouTube clone project.'
};

// Функция для рендеринга шаблона в HTML файл
const renderTemplate = (templateFile, outputFile, data) => {
  ejs.renderFile(templateFile, data, {}, (err, str) => {
    if (err) {
      console.error(`Error rendering template ${templateFile}:`, err);
      return;
    }
    fs.writeFileSync(outputFile, str);
    console.log(`Generated: ${outputFile}`);
  });
};

// Рендеринг шаблонов
fs.readdirSync(templatesDir).forEach(file => {
  const templateFile = path.join(templatesDir, file);
  const outputFile = path.join(outputDir, file.replace('.ejs', '.html'));

  if (path.extname(file) === '.ejs') {
    renderTemplate(templateFile, outputFile, data);
  } else {
    fs.copyFileSync(templateFile, outputFile);
    console.log(`Copied: ${outputFile}`);
  }
});
