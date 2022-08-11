/**
 * 数组专项练习
 * @type Lang
 */

/**
 * 创建数组
 */
const createOne = [];
const createTwo = [ 1, 2, 3, 4, 5 ];
const createThree = [ 1.1, true, "a", { create: true } ]

const createItem = 1
const createFour = [ createItem, createItem+1, createItem+2 ]

const createFive = new Array()
const createSix = new Array(10)
const createSeven = new Array(1.1, true, "a", { create: true })

/**
 * 数组元素读与写
 */
const createEight = ["world"]
createEight[-1.23] = true
createEight["1000"] = 0
createEight[1.000] = 10