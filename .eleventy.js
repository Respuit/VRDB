module.exports = function (eleventyConfig) {

    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.addPassthroughCopy("./src/images");
    eleventyConfig.setDataDirectory("../_data");

    return {
        dir: {
            input: "src",
            output: "public",
        }
    }
}

module.exports.config = {
	pathPrefix: "/VRDB/",
}