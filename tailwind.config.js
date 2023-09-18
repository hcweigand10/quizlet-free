/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');
colors.primary = '#FA8072';
colors.secodary = '#ACD1AF';

const animationSpeed = 450; // miliseconds

module.exports = {
	content: ["./index.html",'./src/**/*.{js,jsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: colors,
		extend: {
			keyframes: {
				float: {
					'0%, 100%': {
						transform: 'translateY(-50%)',
						'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(0)',
						'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
					}
				}
			},
			animation: {
				drop: `drop ${animationSpeed}ms ease-in-out ${animationSpeed}ms both`,
				float: `float ${animationSpeed * 15}ms infinite`
			}
		},
		container: {
			padding: '2rem',
      center: true,
			// margin: "2rem"
		}
    
	},
	plugins: [require('@tailwindcss/forms'), require("flowbite/plugin")]
};
