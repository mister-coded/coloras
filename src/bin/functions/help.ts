export default () => {
    console.log(
        "   Usage: coloras <command>\n\n   Commands:\n\n      -v | -version       output the version number\n      help                output usage information\n      convert | conv      convert a color code; include -copy or -c to copy the color to clipboard\n      generate | gen      generate a color code; include -copy or -c to copy the color to clipboard\n      image | img         get an image url for a color; include -copy or -c to copy the url to clipboard\n\n\n" +
        "\x1b[36m%s\x1b[0m",
        `coloras@2.0.0  https://npmjs.com/package/coloras`
    );
}; 