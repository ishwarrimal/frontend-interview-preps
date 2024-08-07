/**
 * Performs a flood fill operation on a 2D image array.
 *
 * @param {number[][]} image - The 2D image array to be modified.
 * @param {number} sr - The row index of the starting pixel.
 * @param {number} sc - The column index of the starting pixel.
 * @param {number} color - The new color to fill the region with.
 * @returns {number[][]} The modified image array after the flood fill operation.
 *
 * This function performs a depth-first search (DFS) to fill a region of connected
 * pixels with the same color as the starting pixel with the new `color`. The
 * region is defined as all pixels that are connected to the starting pixel
 * horizontally, vertically, or diagonally.
 *
 * The function modifies the original `image` array in place.
 */
function floodFill(image, sr, sc, color) {
    if (image[sr][sc] !== color) {
        const prevColor = image[sr][sc];
        function helper(r, c) {
            if (r >= 0 && r < image.length && c >= 0 && c < image[r].length) {
                if (image[r][c] === prevColor) {
                    image[r][c] = color;
                    helper(r, c + 1);
                    helper(r, c - 1);
                    helper(r - 1, c);
                    helper(r + 1, c);
                }
                if (image[r][c] === color) return;
            }
        }
        helper(sr, sc);
    }
    return image;
}
