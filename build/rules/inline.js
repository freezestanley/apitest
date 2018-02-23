module.exports = function (splitString) {
  return {
    '__class': (str, root, currentNode, rootNode) => {
      rootNode.class = splitString(str)
      currentNode = rootNode
    },
    '__mixins': (str, root, currentNode, rootNode) => {
      rootNode.mixins = str.split(',')
      currentNode = rootNode
    },
    '__extends': (str, root, currentNode, rootNode) => {
      rootNode.extend = str
      currentNode = rootNode
    },
    '__components': (str, root, currentNode, rootNode) => {
      rootNode.components = str.split(',')
      currentNode = rootNode
    },
    '__watch': (str, root, currentNode, rootNode) => {
      rootNode.watch = rootNode.watch ? rootNode.watch : []
      var a = splitString(str)
      rootNode.watch.push(a)
      currentNode = a
    },
    '__props': (str, root, currentNode, rootNode) => {
      rootNode.props = rootNode.props ? rootNode.props : []
      var a = splitString(str)
      rootNode.props.push(a)
      currentNode = a
    },
    '__computed': (str, root, currentNode, rootNode) => {
      rootNode.computed = rootNode.computed ? rootNode.computed : []
      var a = splitString(str)
      rootNode.computed.push(a)
      currentNode = a
    },
    '__methods': (str, root, currentNode, rootNode) => {
      rootNode.methods = rootNode.methods ? rootNode.methods : []
      var a = splitString(str)
      rootNode.methods.push(a)
      currentNode = a
    },
    '__event': (str, root, currentNode, rootNode) => {
      rootNode.event = rootNode.event ? rootNode.event : []
      var a = splitString(str)
      rootNode.event.push(a)
      currentNode = a
    }
  }
}