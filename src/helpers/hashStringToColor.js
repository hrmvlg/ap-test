export async function hashStringToColor(str) {

    const encoder = new TextEncoder();
    const dataArrayBuffer = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataArrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    const [r, g, b] = hashArray.slice(0, 3);

    const toHex = (n) => { return n.toString(16).padStart(2, '0') };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}