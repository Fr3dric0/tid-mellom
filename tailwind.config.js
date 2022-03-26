const gallery = '#ffffff';
const whiteSmoke = '#F5F5F5';
const silver = '#cccccc';
const boulder = '#767676';
const gray = '#f0efef';
const tundora = '#444444';
const mineShaft = '#262626';

const coral = '#f47878';
const danger = '#DB1F3E';

const orange = '#FF7C31';
const orange2 = '#F6975D';
const orange3 = '#F9B68D';
const orange4 = '#FCDAC6';
const orange5 = '#FEF5F0';

const green = '#0e837f';
const green2 = '#58B0AD';
const green3 = '#79C0BE';
const green4 = '#C7E5E4';
const green5 = '#F4FBFC';


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '430px',
      md: '620px',
      lg: '960px',
      xl: '1408px',
    },
    colors: {
      gray,
      gallery,
      silver,
      boulder,
      tundora,
      coral,
      orange,
      green,
      danger,
      'green-2': green2,
      'green-3': green3,
      'green-4': green4,
      'green-5': green5,
      'orange-2': orange2,
      'orange-3': orange3,
      'orange-4': orange4,
      'orange-5': orange5,
      'mine-shaft': mineShaft,
      'white-smoke': whiteSmoke,
    },
    fontFamily: {
      lato: ['Lato', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}
