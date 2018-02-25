module.exports = function (splitString) {
  return {
    '__class': (str, root, node) => {
      node.class = splitString(str)
      root = node
    },
    '__mixins': (str, root, node) => {
      node.mixins = str.split(',')
      root = node
    },
    '__extends': (str, root, node) => {
      node.extend = str
      root = node
    },
    '__components': (str, root, node) => {
      node.components = str.split(',')
      root = node
    },
    '__watch': (str, root, node) => {
      node.watch = node.watch ? node.watch : []
      var a = splitString(str)
      node.watch.push(a)
      root = a
    },
    '__props': (str, root, node) => {
      node.props = node.props ? node.props : []
      var a = splitString(str)
      node.props.push(a)
      root = a
    },
    '__computed': (str, root, node) => {
      node.computed = node.computed ? node.computed : []
      var a = splitString(str)
      node.computed.push(a)
      root = a
    },
    '__methods': (str, root, node) => {
      node.methods = node.methods ? node.methods : []
      var a = splitString(str)
      node.methods.push(a)
      root = a
    },
    '__event': (str, root, node) => {
      node.event = node.event ? node.event : []
      var a = splitString(str)
      node.event.push(a)
      root = a
    }
  }
}