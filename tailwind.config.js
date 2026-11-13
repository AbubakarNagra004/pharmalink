export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0F172A', 800: '#1E293B', 700: '#334155' },
        paper: '#F8FAFC',
        verified: { DEFAULT: '#059669', light: '#D1FAE5', dark: '#047857' },
      },
      fontFamily: { sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
