/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xxs: "380px",
        xs: "480px",
        mymax1: "1850px",
        my3: "1600px",
        myspec2: "1400px",
        my2: "1500px",
        myspe: "1255px",
        my1: "1100px",
        my0: "980px",
        //   'sm': '640px',
        //   'md': '768px',
        //   'lg': '1024px',
        //   'xl': '1280px',
        //   '2xl': '1600px',**/

        //   '2xl': {'max': '1535px'},
        // // => @media (max-width: 1535px) { ... }

        // 'xl': {'max': '1279px'},
        // // => @media (max-width: 1279px) { ... }

        // 'lg': {'max': '1023px'},
        // // => @media (max-width: 1023px) { ... }

        // 'md': {'max': '767px'},
        // // => @media (max-width: 767px) { ... }

        // 'sm': {'max': '639px'},
      },
    },
  },

  plugins: [require("tailwind-scrollbar-hide")],
};
