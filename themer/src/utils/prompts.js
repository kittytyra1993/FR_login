const setThemePrompt = (choices) => {
  if (choices) {
    return {
      type: 'list',
      name: 'filename',
      message: 'Which theme would you like to set?',
      choices: choices,
    };
  } else {
    console.log('No themes found'.red);
    return null;
  }
};

const newThemePrompt = () => {
  return [
    {
      type: 'text',
      name: 'themeName',
      message: 'Enter a unique name for your theme',
      default: 'file-name',
    },
    {
      type: 'text',
      name: 'primaryVar',
      message: 'Enter a primary color',
      default: '#004792',
    },
    {
      type: 'text',
      name: 'accentVar',
      message: 'Enter accent color',
      default: '#f9b800',
    },
    {
      type: 'text',
      name: 'btnPrimaryVar',
      message: 'Enter button primary color',
      default: '#004792',
    },
    {
      type: 'text',
      name: 'btnFontVar',
      message: 'Enter button font color',
      default: '#fff',
    },
    {
      type: 'text',
      name: 'textPrimaryVar',
      message: 'Enter text primary color',
      default: '#000',
    },
    {
      type: 'text',
      name: 'textSecondaryVar',
      message: 'Enter text seondary color',
      default: '#3c4043',
    },
    {
      type: 'text',
      name: 'borderColorVar',
      message: 'Enter border color',
      default: '#cacaca',
    },
    {
      type: 'text',
      name: 'borderBottomColorVar',
      message: 'Enter border bottom color',
      default: '#d3d3d3',
    },
    {
      type: 'text',
      name: 'borderFocusColorVar',
      message: 'Enter border focus color',
      default: '#0471af',
    },
    {
      type: 'text',
      name: 'inputBgColorVar',
      message: 'Enter input background color',
      default: '#f5f5f5',
    },
    {
      type: 'text',
      name: 'formBgColorVar',
      message: 'Enter form background color',
      default: 'lighten(#75787b, 40%)',
    },
    {
      type: 'text',
      name: 'errorColorVar',
      message: 'Enter error message color',
      default: '#dc3545',
    },
    {
      type: 'text',
      name: 'imgUrlVar',
      message: 'Enter logo image url',
      default: 'src/assets/lowes-logo.png',
    },
    {
      type: 'text',
      name: 'bgImgUrlVar',
      message: 'Enter background image url',
      default:
        'https://brand.pwc.com/content/dam/brandsite/asset-library/illustrations/representational/PwC_Repre_Illus_10.zip/_jcr_content/renditions/cq5dam.web.1280.1280.png',
    },
    {
      type: 'text',
      name: 'baseFontVar',
      message: 'Enter base font style',
      default: 'Poppins',
    },
    {
      type: 'text',
      name: 'altFontVar',
      message: 'Enter alternate font style',
      default: 'Open Sans',
    },
  ];
};

module.exports = { setThemePrompt, newThemePrompt };
