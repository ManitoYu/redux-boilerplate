export const sizeMake = (width, height) => ({ width, height })
export const pointMake = (x, y) => ({ x, y })
export const rectMake = (x, y, width, height) => ({ ...pointMake(x, y), ...sizeMake(width, height) })
export const edgeInsetsMake = (top, right, bottom, left) => ({ top, right, bottom, left })
export const pointZero = () => pointMake(0, 0)
export const last = array => array[array.length - 1]
export const take = (array, number) => array.slice(0, number)
export const takeRight = (array, number) => array.slice(array.length - number)
export const first = array => array[0]
export const size = array => array.length
export const nth = (array, index) => index >= 0 ? array[index] : array[array.length + index]
