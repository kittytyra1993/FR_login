const path = require('path');
const fs = require('fs');
const colors = require('colors');
const inquirer = require('inquirer');

const sep = require('./separator');
/**
 * Read the theme files from ../../login/src/styles/custom/themes
 *
 * @param {*} themePath
 * @returns List of all theme files.
 */
const getThemes = (themePath) => {
  let files = fs.readdirSync(themePath);
  let themeList = [];
  files.forEach((file) => {
    if (path.extname(file) === '.scss') {
      themeList.push(file.replace('.scss', ''));
    }
  });
  return themeList;
};

/**
 * Print all theme files.
 *
 * @param {*} themePath
 */
const listThemes = (themePath) => {
  fs.readdir(themePath, (err, files) => {
    if (err) {
      console.log(err.message.red);
    } else {
      sep();
      files.forEach((file) => {
        console.log(file.green);
      });
    }
  });
};

const setThemes = async (prompt, mainPath) => {
  sep();
  // Supply choices to inquirer and ask for user input.
  const answers = await inquirer.prompt(prompt);
  // use filename to modify main.scss to comtain `custom/themes/${filename}`
  let content = fs.readFileSync(mainPath, 'utf-8');
  prompt.choices.forEach((choice) => {
    if (content.includes('custom/themes/' + choice)) {
      content = content.replace(
        `custom/themes/${choice}`,
        `custom/themes/${answers.filename}`
      );
    }
  });
  fs.writeFileSync(mainPath, content, 'utf-8');
  console.log('✔ Theme has been set!'.underline.green);
};

const createTheme = async (prompt, themePath) => {
  sep();
  // Call inquirer to ask user questions
  const answers = await inquirer.prompt(prompt);

  newThemePath = path.join(themePath, answers.themeName + '.scss');
  // Parse answers to cerate new theme file with base.scss
  try {
    fs.copyFileSync('src/templates/base.scss', newThemePath);
    console.log(
      '✔ Base file created successfully. Adding custom variables...'.underline
        .green
    );
  } catch (error) {
    console.log(error.underline.red);
  }

  // Add in custom variables to the new themefile.
  let content = fs.readFileSync(newThemePath, 'utf-8');
  for (const answer in answers) {
    if (answer != 'themeName') {
      regex = new RegExp(answer, 'g');
      content = content.replace(regex, answers[answer]);
    }
  }
  fs.writeFileSync(newThemePath, content, 'utf-8');
  console.log('✔ Theme file has been created 🎉'.underline.green);
  console.log('Click here to view: '.yellow + newThemePath);
  console.log(
    `✨ To set ${answers.themeName}.scss as current theme use:`.underline
      .yellow +
      '   ' +
      'themer set'.black.bgCyan +
      '\n'
  );
};

module.exports = { getThemes, listThemes, setThemes, createTheme };
