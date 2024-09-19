import p from '@yc-tech/react-component/tailwindPlugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@yc-tech/react-component/dist/react-component.es.js'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/forms'), p()]
}
