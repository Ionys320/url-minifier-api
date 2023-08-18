/**
 * Get a random string composed of letters (upcase and downcase) and numbers.
 * @param length Length of the random string
 * @returns A random string.
 * @example random(5) // 'a7cPe'
 */
export const random = (length = 7) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++)
        result += chars.charAt(Math.floor(Math.random() * chars.length));

    return result;
}