/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      "bg-light": "#F7F7F7",
      "bg-dark": "#1F1F1F",
      "gray-light": "#E5E5E5",
      "gray-mid": "#999999",
      "gray-transparent-dark": "rgba(0, 0, 0, 0.5)",
      "gray-transparent-light": "rgba(0, 0, 0, 0.2)",
      "gray-dark": "#333333",
      "primary-light": "#F2F2F2",
      "sky-blue": "#00B4FF",
      "btn-blue": "#007AFF",
      "btn-blue-hover": "#0066CC",
      "btn-blue-active": "#0052B2",
      "btn-blue-disabled": "#B2D4FF",
      "warning-btn": "#FF3B30",
      "warning-btn-hover": "#CC2D26",
      "navy-darkblue": "#001F3F",
    },
  },
};
export const plugins = [];
