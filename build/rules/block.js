module.exports = function (splitString) {
  return {
    '__attr': (str, root, currentNode, rootNode) => {
      root.attr = root.attr ? root.attr : []
      var a = splitString(str)
      root.attr.push(a)
    },
    '__function': (str, root, currentNode, rootNode) => {
      root.function = root.function ? root.function : []
      var a = splitString(str)
      root.function.push(a)
      currentNode = a
    },
    '__params': (str, root, currentNode, rootNode) => {
      root.params = root.params ? root.params : []
      var a = splitString(str) 
      root.params.push(a)
    },
    '__return': (str, root, currentNode, rootNode) => {
      var a = splitString(str)
      root.return = a
    },
    '__example': (str, root, currentNode, rootNode) => {
      root.example = root.example ? root.example : []
      root.example.push(str)
    }
  }
}