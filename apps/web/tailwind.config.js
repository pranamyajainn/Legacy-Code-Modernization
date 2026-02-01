/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Backgrounds
                app: '#0B0F12',      // Deepest void
                panel: '#12171B',    // Component bg
                surface: '#171D22',  // Elevated elements

                // Borders
                border: {
                    subtle: '#24313A',
                    DEFAULT: '#2F3B45',
                    active: '#455561'
                },

                // Typography
                text: {
                    primary: '#E6EEF2',
                    secondary: '#A8B3BB',
                    tertiary: '#5F6B76',
                    code: '#76FF03' // IBM Green for terminal text
                },

                // Semantics
                accent: '#4FC3F7',   // Info/Active (Light Blue)
                success: '#00E676',  // Operation Success (Matrix Green)
                warning: '#FFB300',  // Attention
                error: '#FF5252',    // Critical Failure
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    plugins: [],
}
