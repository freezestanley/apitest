module.exports = function (splitString) {
  return {
    '__attr': (str, root) => {
      root.attr = root.attr ? root.attr : []
      var a = splitString(str)
      root.attr.push(a)
    },
    '__function': (str, root) => {
      root.function = root.function ? root.function : []
      var a = splitString(str)
      root.function.push(a)
      root = a
    },
    '__params': (str, root) => {
      root.params = root.params ? root.params : []
      var a = splitString(str) 
      root.params.push(a)
    },
    '__return': (str, root) => {
      var a = splitString(str)
      root.return = a
    },
    '__example': (str, root) => {
      root.example = root.example ? root.example : []
      root.example.push(str)
    }
  }
}