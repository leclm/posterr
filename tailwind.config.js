// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Definir cores personalizadas para temas claros e escuros
        primary: '#1D4ED8', // azul mais forte
        secondary: '#EF4444', // vermelho
        'dark-background': '#242424', // fundo escuro
        'light-background': '#FFFFFF', // fundo claro
        'light-text': '#E5E7EB', // texto claro
        'dark-text': '#111827', // texto escuro
      },
      backgroundColor: {
        'dark-bg': '#242424',
        'light-bg': '#FFFFFF',
      },
      textColor: {
        'dark-text': '#111827',
        'light-text': '#E5E7EB',
      },
    },
  },
  darkMode: 'class', // Usar a classe 'dark' para alternar o tema
  plugins: [],
}
