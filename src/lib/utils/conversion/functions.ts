import toArray from "../toArray"

export const hex2rgb = (r: any, g: any, b: any): string => {
    r = parseInt(r, 16)
    g = parseInt(g, 16)
    b = parseInt(b, 16)

    return `rgb(${r}, ${g}, ${b})`
}

export const hex2hsl = (r: any, g: any, b: any): string => {
    let h: any,
        s: any,
        l: any,
        min: any,
        max: any,
        difference: any;

    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);

    r /= 255, g /= 255, b /= 255;
    max = Math.max(r, g, b), min = Math.min(r, g, b);
    l = (max + min) / 2;

    if (max == min) {
        h = s = 0;
    } else {
        difference = max - min;
        s = l > 0.5 ? difference / (2 - max - min) : difference / (max + min);
        switch (max) {
            case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
            case g: h = (b - r) / difference + 2; break;
            case b: h = (r - g) / difference + 4; break;
        }
        h /= 6;
    }

    s = Math.round(s * 100);
    l = Math.round(l * 100);
    h = Math.round(h * 360);

    return `hsl(${h}, ${s}%, ${l}%)`
}

export const hex2hsv = (r: any, g: any, b: any): string => {
    let h: any,
        s: any,
        v: any,
        min: any,
        max: any,
        difference: any;

    r = parseInt(r, 16)
    g = parseInt(g, 16)
    b = parseInt(b, 16)

    r /= 255, g /= 255, b /= 255;

    max = Math.max(r, g, b), min = Math.min(r, g, b);
    v = max;

    difference = max - min;
    s = max == 0 ? 0 : difference / max;

    if (max == min) {
        h = 0;
    } else {
        switch (max) {
            case r: h = (g - b) / difference + (g < b ? 6 : 0); break;
            case g: h = (b - r) / difference + 2; break;
            case b: h = (r - g) / difference + 4; break;
        }

        h /= 6;
    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    v = Math.round(v * 100);

    return `hsv(${h}, ${s}%, ${v}%)`
}

export const hex2cmyk = (r: any, g: any, b: any): string => {
    let c: any,
        m: any,
        y: any,
        k: any,
        minCMY: any;

    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);

    if (r == 0 && g == 0 && b == 0) {
        k = 1;
        return "cmyk(0, 0, 0, 1)";
    }

    c = 1 - (r / 255);
    m = 1 - (g / 255);
    y = 1 - (b / 255);

    minCMY = Math.min(c, Math.min(m, y));

    c = (c - minCMY) / (1 - minCMY);
    m = (m - minCMY) / (1 - minCMY);
    y = (y - minCMY) / (1 - minCMY);
    k = minCMY;

    c = Math.round(c * 10000) / 100;
    m = Math.round(m * 10000) / 100;
    y = Math.round(y * 10000) / 100;
    k = Math.round(k * 10000) / 100;

    c = isNaN(c) ? 0 : Math.round(c);
    m = isNaN(m) ? 0 : Math.round(m);
    y = isNaN(y) ? 0 : Math.round(y);
    k = isNaN(k) ? 0 : Math.round(k);

    return `cmyk(${c}, ${m}, ${y}, ${k})`
}

export const rgb2hex = (r: any, g: any, b: any): string => {
    r = parseInt(r, 10).toString(16);
    g = parseInt(g, 10).toString(16);
    b = parseInt(b, 10).toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;

    return `#${r}${g}${b}`
}

export const hsl2hex = (h: any, s: any, l: any): string => {
    h = parseInt(h, 10)
    s = parseInt(s, 10)
    l = parseInt(l, 10)

    l /= 100;

    const a = s * Math.min(l, 1 - l) / 100;

    const c = (n: any) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to hex and prefix "0" if needed
    };

    return `#${c(0)}${c(8)}${c(4)}`;
}

export const hsv2hex = (h: any, s: any, v: any): string => {
    const hsv2rgb = (h: any, s: any, v: any) => {
        let r: any,
            g: any,
            b: any,
            i: any,
            p: any,
            f: any,
            t: any;

        h = parseInt(h, 10)
        s = parseInt(s.replace("%", ""), 10)
        v = parseInt(v.replace("%", ""), 10)

        if (h <= 0) { h = 0; }
        if (s <= 0) { s = 0; }
        if (v <= 0) { v = 0; }

        if (h > 360) { h = 360; }
        if (s > 100) { s = 100; }
        if (v > 100) { v = 100; }

        h = h / 360;
        s = s / 100;
        v = v / 100;

        h = h * 6;
        i = Math.floor(h);
        p = v * (1 - s);
        f = v * (1 - s * (h - i));
        t = v * (1 - s * (1 - (h - i)));

        if (i == 0) { r = v; g = t; b = p }
        else if (i == 1) { r = f; g = v; b = p }
        else if (i == 2) { r = p; g = v; b = t }
        else if (i == 3) { r = p; g = f; b = v }
        else if (i == 4) { r = t; g = p; b = v }
        else { r = v; g = p; b = f };

        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);

        if (r <= 0) { r = 0; }
        if (g <= 0) { g = 0; }
        if (b <= 0) { b = 0; }

        if (r > 255) { r = 255; }
        if (g > 255) { g = 255; }
        if (b > 255) { b = 255; }

        return `rgb(${r}, ${g}, ${b})`
    }

    const rgbValues = toArray(hsv2rgb(h, s, v));

    return rgb2hex(rgbValues[0], rgbValues[1], rgbValues[2]);
}

export const cmyk2hex = (c: any, m: any, y: any, k: any): string => {
    const cmyk2rgb = (c: any, m: any, y: any, k: any) => {
        let r: any,
            g: any,
            b: any;

        c = parseInt(c, 10);
        m = parseInt(m, 10);
        y = parseInt(y, 10);
        k = parseInt(k, 10);

        r = 255 * (1 - c / 100) * (1 - k / 100);
        g = 255 * (1 - m / 100) * (1 - k / 100);
        b = 255 * (1 - y / 100) * (1 - k / 100);

        r = Math.round(r);
        g = Math.round(g);
        b = Math.round(b);

        return `rgb(${r}, ${g}, ${b})`
    }

    const rgbValues = toArray(cmyk2rgb(c, m, y, k))

    return rgb2hex(rgbValues[0], rgbValues[1], rgbValues[2])
}