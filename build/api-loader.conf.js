module.exports = {
  inline: (splitString) => {
    return {
      '__note': (str, current, root) => {
        root.code = splitString(str)
        current.node = root
      },
      '__break': (str, root, node) => {
        console.log('==========break===========')
        root.node = node
      }
    }
  },
  block: (splitString) => {
    return {
      '__code': (str, current, root) => {
        current.node.note = current.node.note ? current.node.note : []
        var a = splitString(str)
        current.node.note.push(a)
        current.node = a
      }
    }
  }
}