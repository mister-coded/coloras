import prompts from "prompts"
import { Color } from "../../lib/index";

export default (copy?: boolean) => {

    prompts({
        type: "select",
        name: "gen_data",
        message:
            "Choose the color system that you would like to generate a color code from",
        choices: [
            {
                title: "hex",
                value: "hex",
            },
            {
                title: "rgb",
                value: "rgb",
            },
            {
                title: "hsl",
                value: "hsl",
            },
            {
                title: "hsv",
                value: "hsv",
            },
            {
                title: "cmyk",
                value: "cmyk",
            },
        ],
    }).then((response: any) => {
        const random = new Color();

        const conversionFunc: "toHex" | "toRgb" | "toHsl" | "toHsv" | "toCmyk" | null = response.gen_data === "hex" ? "toHex" : response.gen_data === "rgb" ? "toRgb" : response.gen_data === "hsl" ? "toHsl" : response.gen_data === "hsv" ? "toHsv" : response.gen_data === "cmyk" ? "toCmyk" : null;
        if (conversionFunc == null) return;

        console.log(
            "\x1b[32m%s\x1b[0m",
            `\n\n[√] ${response.gen_data} generated: ${random[conversionFunc]()}`
        );

        if (copy) {
            require("child_process").spawn("clip").stdin.end(random[conversionFunc]());
            console.log("\x1b[36m%s\x1b[0m", "[i] copied to clipboard");
        }
    });

    process.on("uncaughtException", () => {
        process.exit();
    });
};