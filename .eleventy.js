module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/scss/");
    eleventyConfig.addWatchTarget("./src/scss/");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.setDataDirectory("../_data");

    eleventyConfig.addFilter("escapeAndReplace", (content) => {

        const escapedContent = content
            .replace(/&/g, "&amp;") // Escapar `&`
            .replace(/</g, "&lt;") // Escapar `<`
            .replace(/>/g, "&gt;"); // Escapar `>`

        return escapedContent.replace(/\n/g, "<br>");
    });

    return {
        dir: {
            input: "src",
            output: "public",
        }
    }
}

module.exports.config = {
	pathPrefix: "/home/respuit/Documents/Projects/mockupwebvr/vrdb/VRDB-SOURCE/VRDB/public/",
    breaks: true
    
}