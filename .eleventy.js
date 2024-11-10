const gamesData = require('./src/_data/games.json');

module.exports = function(eleventyConfig) {
  // Agregar colección de juegos
  eleventyConfig.addCollection("games", () => gamesData.map(game => ({
    ...game,
    url: `/juegos/${game.id}/`,
  })));

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
