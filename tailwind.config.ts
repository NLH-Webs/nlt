import type { Config } from "tailwindcss";

// A Tailwind colour that reads an NLH token and still supports opacity modifiers (bg-black/50).
const tok = (name: string) => `color-mix(in srgb, var(${name}) calc(<alpha-value> * 100%), transparent)`;
const neutral = {
	50: tok('--bg-sunken'), 100: tok('--bg-sunken'),
	200: tok('--line-hairline'), 300: tok('--line-strong'),
	400: tok('--text-disabled'), 500: tok('--text-tertiary'),
	600: tok('--text-secondary'), 700: tok('--text-secondary'),
	800: tok('--text-primary'), 900: tok('--text-primary')
};

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// Every colour resolves to an NLH token (src/styles/nlh/nlh-tokens.css).
				border: tok('--line-hairline'),
				input: tok('--line-strong'),
				ring: tok('--action'),
				background: tok('--bg-base'),
				foreground: tok('--text-primary'),
				primary: { DEFAULT: tok('--action'), foreground: tok('--action-on') },
				secondary: { DEFAULT: tok('--bg-sunken'), foreground: tok('--text-primary') },
				destructive: { DEFAULT: tok('--state-error'), foreground: tok('--text-inverse') },
				muted: { DEFAULT: tok('--bg-sunken'), foreground: tok('--text-secondary') },
				accent: { DEFAULT: tok('--bg-sunken'), foreground: tok('--text-primary') },
				popover: { DEFAULT: tok('--bg-raised'), foreground: tok('--text-primary') },
				card: { DEFAULT: tok('--bg-raised'), foreground: tok('--text-primary') },
				sidebar: {
					DEFAULT: tok('--bg-sunken'),
					foreground: tok('--text-secondary'),
					primary: tok('--action'),
					'primary-foreground': tok('--action-on'),
					accent: tok('--bg-sunken'),
					'accent-foreground': tok('--text-primary'),
					border: tok('--line-hairline'),
					ring: tok('--action')
				},
				// Tailwind's default palette names used across the components, remapped onto token roles.
				white: tok('--nlh-white'),
				black: tok('--nlh-void'),
				slate: neutral,
				gray: neutral,
				blue: {
					500: tok('--action'), 600: tok('--action'),
					700: tok('--action-ink'), 800: tok('--action-ink')
				},
				red: { 50: tok('--bg-sunken'), 300: tok('--state-error'), 400: tok('--state-error') },
				green: { 100: tok('--bg-sunken'), 200: tok('--line-strong'), 800: tok('--state-ok') }
			},
			borderRadius: {
				lg: 'var(--r-md)',
				md: 'var(--r-sm)',
				sm: 'var(--r-xs)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				sans: ['var(--font-ui)'],
				display: ['var(--font-display)']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
