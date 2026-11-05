/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "surface-bright":"#faf8ff","on-primary-container":"#dad7ff","on-tertiary-container":"#b8e0ff","secondary-fixed-dim":"#c0c1ff","surface-container-low":"#f2f3ff","on-secondary-container":"#fffbff","tertiary-container":"#006693","primary-fixed":"#e2dfff","on-error":"#ffffff","background":"#faf8ff","secondary-fixed":"#e1e0ff","error":"#ba1a1a","on-tertiary-fixed-variant":"#004c6e","surface-container-lowest":"#ffffff","inverse-surface":"#283044","error-container":"#ffdad6","on-secondary-fixed-variant":"#2f2ebe","surface-container":"#eaedff","surface-dim":"#d2d9f4","on-tertiary":"#ffffff","surface-container-highest":"#dae2fd","inverse-primary":"#c3c0ff","surface-variant":"#dae2fd","on-primary-fixed":"#0f0069","on-surface":"#131b2e","inverse-on-surface":"#eef0ff","on-surface-variant":"#464555","outline-variant":"#c7c4d8","on-secondary":"#ffffff","secondary":"#4648d4","primary-fixed-dim":"#c3c0ff","surface":"#faf8ff","on-background":"#131b2e","on-primary":"#ffffff","primary":"#3525cd","secondary-container":"#6063ee","on-primary-fixed-variant":"#3323cc","outline":"#777587","tertiary-fixed":"#c9e6ff","tertiary-fixed-dim":"#89ceff","surface-container-high":"#e2e7ff","primary-container":"#4f46e5","surface-tint":"#4d44e3","on-error-container":"#93000a","tertiary":"#004d70","on-tertiary-fixed":"#001e2f"
      },
      borderRadius: {
        "DEFAULT":"0.25rem","lg":"0.5rem","xl":"0.75rem","full":"9999px"
      },
      spacing: {
        "space-md":"1rem","space-xs":"0.25rem","gutter":"1.5rem","space-xl":"2rem","space-lg":"1.5rem","margin-mobile":"1rem","gutter-sm":"1rem","margin":"2rem","space-sm":"0.5rem"
      },
      fontFamily: {
        "headline-md":["Inter"],"headline-lg":["Inter"],"display":["Inter"],"badge":["Inter"],"data-tabular":["Inter"],"body-lg":["Inter"],"body-md":["Inter"],"label-sm":["Inter"],"headline-sm":["Inter"],"display-mobile":["Inter"],"label-md":["Inter"],"body-sm":["Inter"]
      },
      fontSize: {
        "headline-md":["1.25rem",{"lineHeight":"1.75rem","letterSpacing":"-0.015em","fontWeight":"600"}],"headline-lg":["1.5rem",{"lineHeight":"2rem","letterSpacing":"-0.02em","fontWeight":"600"}],"display":["2.25rem",{"lineHeight":"2.75rem","letterSpacing":"-0.025em","fontWeight":"600"}],"badge":["0.6875rem",{"lineHeight":"0.875rem","letterSpacing":"0.02em","fontWeight":"500"}],"data-tabular":["0.875rem",{"lineHeight":"1.25rem","letterSpacing":"0em","fontWeight":"500"}],"body-lg":["1rem",{"lineHeight":"1.5rem","letterSpacing":"-0.005em","fontWeight":"400"}],"body-md":["0.875rem",{"lineHeight":"1.25rem","letterSpacing":"0em","fontWeight":"400"}],"label-sm":["0.75rem",{"lineHeight":"1rem","letterSpacing":"0.01em","fontWeight":"500"}],"headline-sm":["1.125rem",{"lineHeight":"1.5rem","letterSpacing":"-0.01em","fontWeight":"500"}],"display-mobile":["1.75rem",{"lineHeight":"2.25rem","letterSpacing":"-0.02em","fontWeight":"600"}],"label-md":["0.875rem",{"lineHeight":"1.25rem","letterSpacing":"-0.005em","fontWeight":"500"}],"body-sm":["0.75rem",{"lineHeight":"1rem","letterSpacing":"0.005em","fontWeight":"400"}]
      }
    },
  },
  plugins: [],
}
