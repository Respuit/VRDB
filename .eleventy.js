const faviconsPlugin = require("eleventy-plugin-gen-favicons");
module.exports = function (eleventyConfig) {
    eleventyConfig.addPlugin(faviconsPlugin, {});
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/scss/");
    eleventyConfig.addWatchTarget("./src/scss/");
    eleventyConfig.addPassthroughCopy("./src/js/");
    eleventyConfig.addWatchTarget("./src/js/");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.setDataDirectory("../_data");
    const md = require("markdown-it")({
        html: false,
        breaks: true,
        linkify: true,
      });
    
      eleventyConfig.addNunjucksFilter("markdownify", (markdownString) =>
        md.render(markdownString),
      );

    // Si es necesario, puedes agregar un filtro para escapar contenido específico
    eleventyConfig.addFilter("escapeAndReplace", (content) => {
        const escapedContent = content
            .replace(/&/g, "&amp;") // Escapar `&`
            .replace(/</g, "&lt;") // Escapar `<`
            .replace(/>/g, "&gt;"); // Escapar `>`

        return escapedContent.replace(/\n/g, "<br>");
    });

    // Asegúrate de que se pase como JSON en lugar de HTML
    eleventyConfig.addExtension("json", {
        outputFileExtension: "json",
        compile: function(inputContent) {
            return inputContent; // Evita la conversión a HTML
        }
    });

    return {
        dir: {
            input: "src",
            output: "public",
        }
    }
}

module.exports.config = {
    pathPrefix: "/VRDB/",
    breaks: true
}

