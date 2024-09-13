/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
					sm: '100%',
					md: '100%',
					lg: '1024px', // Default value from Tailwind
					xl: '1280px', // Default value from Tailwind
					'2xl': '1280px'
				},
      },
      colors: {
        customTextPrimary: "rgb(var(--custom-text-primary) / <alpha-value>)",
        customBgPrimary: "rgb(var(--custom-bg-primary) / <alpha-value>)",
        customBgSecondary: "rgb(var(--custom-bg-secondary) / <alpha-value>)"
      }
    },
  },
  plugins: [],
}