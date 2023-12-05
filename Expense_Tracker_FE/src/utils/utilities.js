export function getRandomString(strlen) {
    let len = strlen - 13;
    const validChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let str = '';
    while (len > 0) {
        const indx = Math.floor(Math.random() * validChars.length);
        str += validChars[indx];
        len -= 1;
    }
    return str + Date.now();
}

export default {};
