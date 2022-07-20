#! /usr/bin/env node

const path = require('path');
const { program } = require('commander');

// Define version for themer.
program.version('0.0.1');

const {
  getThemes,
  listThemes,
  setThemes,
  createTheme,
} = require('./utils/themes');
const { setThemePrompt, newThemePrompt } = require('./utils/prompts');

const themePath = path.join(__dirname, '../../login/src/styles/custom/themes'); // Default relative path to themes.
const mainPath = path.join(__dirname, '../../login/src/styles/main.scss'); // Default relative path to main.scss
let themeList = [];

// themer list or themer ls
program
  .command('list') // sub-command name
  .alias('ls') // alternative sub-command is `ls`
  .description('List available themes.') // command description
  // function to execute when command is uses
  .action(() => {
    listThemes(themePath);
  });

// themer set or themer s
program
  .command('set') // sub-command name
  .alias('s') // alternative sub-command is `s`
  .description('Set a theme.') // command description
  // function to execute when command is uses
  .action(() => {
    // get list of themes
    themeList = getThemes(themePath);
    // create prompt
    const prompt = setThemePrompt(themeList);
    if (prompt) {
      // call set themes with prompt
      setThemes(prompt, mainPath);
    }
  });

// themer create or themer c
program
  .command('create') // sub-command name
  .alias('c') // alternative sub-command is `c`
  .description('Create a new theme.') // command description
  // function to execute when command is uses
  .action(() => {
    // create prompt
    const prompt = newThemePrompt();
    if (prompt) {
      // call create themes with prompt
      createTheme(prompt, themePath);
    }
  });

program.parse(process.argv);
