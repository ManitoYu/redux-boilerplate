export const sizeMake = (width, height) => ({ width, height })
export const pointMake = (x, y) => ({ x, y })
export const rectMake = (x, y, width, height) => ({ ...pointMake(x, y), ...sizeMake(width, height) })
export const last = array => array[array.length - 1]
export const edgeInsetsMake = (top, right, bottom, left) => ({ top, right, bottom, left })
export const pointZero = () => pointMake(0, 0)
