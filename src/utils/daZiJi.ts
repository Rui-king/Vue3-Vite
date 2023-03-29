export function dzj(d: string, txt: string, t = 150) {
    let i = 0;
    let length = txt.length;
    let timr = setInterval(() => {
        if (i > length - 1) return clearInterval(timr);
        document.querySelector(d)?.insertAdjacentText('beforeend', txt[i]);
        i++;
    }, t);
}