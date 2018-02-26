module.exports = function (splitString) {
  return {
      '__attr': (str, root, node) => {
        root.node.attr = root.node.attr ? root.node.attr : []
        var a = splitString(str)
        root.node.attr.push(a)
      },
      '__function': (str, root, node) => {
        root.node.function = root.node.function ? root.node.function : []
        var a = splitString(str)
        root.node.function.push(a)
        root.node = a
      },
      '__params': (str, root, node) => {
        root.node.params = root.node.params ? root.node.params : []
        var a = splitString(str)
        root.node.params.push(a)
      },
      '__return': (str, root, node) => {
        var a = splitString(str)
        root.node.return = a
      },
      '__example': (str, root, node) => {
        root.node.example = root.node.example ? root.node.example : []
        root.node.example.push(str)
      }
    }
}