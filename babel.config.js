module.exports = {
  presets: ["next/babel"],
  plugins: [["styled-components", { "ssr": true }]],
};
// C'est un fichier de configuration Babel pour un projet Next.js.
// Il utilise le preset "next/babel" pour la compilation et ajoute le plugin "styled-components" pour le rendu côté serveur.
// Le plugin "styled-components" permet d'utiliser des styles CSS-in-JS avec le support du rendu côté serveur pour une meilleure performance et SEO.