export default (diskSpace, usedSpace) => {
    let result = (usedSpace/diskSpace)*100
    return result < 0 ? 0 : result.toFixed(2) 
}