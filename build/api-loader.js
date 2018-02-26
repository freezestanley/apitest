const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
const inlineRules = require('./rules/inline')
const blockRules = require('./rules/block')

var currentNode = {node: null}
var rootNode
var test = {name: 'this is test'}
global.target = []
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
      return true;
  } else {
      if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
      }
  }
}

String.prototype.LTrim = function() {
  return this.replace(/(^\s*)/g, "");
}

String.prototype.RTrim = function() {
  return this.replace(/(\s*$)/g, "");
}

function splitString (str) {
  debugger
  var regline = /^(__)(\w+)(\s|.)/
  var shortLine = /\s-\s/g
  var bigBracket = /\{(\S*)\}/
  var middleBracket = /\[(\S*)\s\=\s(\S*)\]/
  var nameReg = /\s([A-Za-z0-9_+-/(/)]+)\s-/g
  var name = nameReg.exec(str)
  var contain = str.replace(regline, '')
  var start, des, header
  var short = shortLine.exec(contain)
  if (short) {
    start = short["index"]
    des = contain.substr(start + 3)   // 取到描述信息
    header = contain.substr(0, start) // 取到前部信息
  } else {
    header = contain
  }
  var type = bigBracket.exec(header)    // 获取到类型
  var origin = {}
  if (name) {
    origin.name = name[1]
  }
  if (type) {
    origin.type = type[1].LTrim().RTrim()
  }
  var defaultAttr = middleBracket.exec(header) // 获取到默认值
  if (defaultAttr) {
    var def = {}
    def[defaultAttr[1]] = defaultAttr[2]
    origin.defVal = def
  }
  if (des) {
    origin.descript = des.LTrim().RTrim()
  }
  return origin
}

function customNode (str, root, tp) {
  console.log(tp)
  let key = tp.replace('__', '');
  root[key] = root[key] ? root[key] : []
  let a = splitString(str)
  root[key].push(a)
}
function createPoint (type, e, root, node) {
  var tp = type.replace(/(^\s*)|(\s*$)/g, "")
  var inlineNode = inline[tp]
  var blockNode = block[tp]
  if (inlineNode) {
    inlineNode(e, root, node, test)
  } else if (blockNode) {
    blockNode(e, root, node, test)
  } else {
    customNode(e, root, tp)
  }
}
function createTree (arr) {
  var reg = /(__)(\w+)(\s|.)/g
  rootNode = {}
  currentNode.node = rootNode
  if (arr.length > 0) {
    arr.map((e, idx, arr) => {
      if ((/^\s/g.test(e)) && e.length <= 1) {
      } else{
        var result = e.match(reg)[0]
        if (result) {
          createPoint(result, e, currentNode, rootNode)
        }
      }
    })
  }
  return rootNode
}
function getNav (arr, obj = {}) {
  if (arr.length == 0) {
    return
  }
  var dom = arr.shift()
  var start = dom.indexOf('.json')
  if (dom.indexOf('.json') > 0) {
    var filename = dom.substr(0, start)
    obj[filename] = dom
  } else {
    obj[dom] = {}
    getNav(arr,obj[dom])
  }
  return obj
}
function dirTree(filename) {
  var stats = fs.lstatSync(filename),
      info = {
        path: filename,
        name: path.basename(filename)
      };

  if (stats.isDirectory()) {
    info.type = "folder";
    info.children = fs.readdirSync(filename).map(function(child) {
      return dirTree(filename + '/' + child);
    });
  } else {
    info.type = "file";
  }
  return info;
}
// var inline = {
//   '__class': (str, root, node) => {
//     node.class = splitString(str)
//     root.node = node
//   },
//   '__mixins': (str, root, node) => {
//     node.mixins = str.split(',')
//     root.node = node
//   },
//   '__extends': (str, root, node) => {
//     node.extend = str
//     root.node = node
//   },
//   '__components': (str, root, node) => {
//     node.components = str.split(',')
//     root.node = node
//   },
//   '__watch': (str, root, node) => {
//     node.watch = node.watch ? node.watch : []
//     var a = splitString(str)
//     node.watch.push(a)
//     root.node = a
//   },
//   '__props': (str, root, node) => {
//     node.props = node.props ? node.props : []
//     var a = splitString(str)
//     node.props.push(a)
//     root.node = a
//   },
//   '__computed': (str, root, node) => {
//     node.computed = node.computed ? node.computed : []
//     var a = splitString(str)
//     node.computed.push(a)
//     root.node = a
//   },
//   '__methods': (str, root, node) => {
//     node.methods = node.methods ? node.methods : []
//     var a = splitString(str)
//     node.methods.push(a)
//     root.node = a
//   },
//   '__event': (str, root, node) => {
//     node.event = node.event ? node.event : []
//     var a = splitString(str)
//     node.event.push(a)
//     root.node = a
//   }
// }
// var block = {
//   '__attr': (str, root, node) => {
//     root.node.attr = root.node.attr ? root.node.attr : []
//     var a = splitString(str)
//     root.node.attr.push(a)
//   },
//   '__function': (str, root, node) => {
//     root.node.function = root.node.function ? root.node.function : []
//     var a = splitString(str)
//     root.node.function.push(a)
//     root.node = a
//   },
//   '__params': (str, root, node) => {
//     root.node.params = root.node.params ? root.node.params : []
//     var a = splitString(str)
//     root.node.params.push(a)
//   },
//   '__return': (str, root, node) => {
//     var a = splitString(str)
//     root.node.return = a
//   },
//   '__example': (str, root, node) => {
//     root.node.example = root.node.example ? root.node.example : []
//     root.node.example.push(str)
//   }
// }
var inline = {...inlineRules(splitString)}
var block = {...blockRules(splitString)}

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  let position = this.resourcePath.lastIndexOf('/')
  var filename
  if (position < 0) {
    filename = this.resourcePath.substr(this.resourcePath.lastIndexOf('\\') + 1).split('.')[0]
  } else {
    filename = this.resourcePath.substr(this.resourcePath.lastIndexOf('/') + 1).split('.')[0]
  }
  const extension = (options && options.extension) || '.json'
  const dir = __dirname
  const rpath = path.join('./', 'doc/json/empty', path.relative(__dirname, this.context))
  mkdirsSync(rpath)
  global.target.push(path.relative(__dirname, this.context) + '/' + filename + extension)
  var patt = /\/\*{2}(\s|.|\S)*?\*\//g;
  var str = '', r, i=0
  while(r = patt.exec(source))
  {
    let a = (r[0]).replace('/**', '').replace('*/', '').replace(/\s\*\s\@/g, '@').replace(/[.\n]\s\*\s/g, ' ')
    str += a
  }
  var z = str.split('@')
  var b = []
  z.map((e, idx, arr) => {
    if (e.length > 3)
      b.push('__' + e)
  })
  if (str.length > 0) {
    var root = createTree(b, rootNode)
    const filepath = `${rpath}/${filename}${extension}`
    fs.writeFileSync(filepath, JSON.stringify(root))
    mkdirsSync(path.join('./', 'doc/json'))
    fs.writeFileSync(path.join('./', 'doc/json/index.json'), JSON.stringify(dirTree(path.join('./', 'doc/json'))))

  }
  return source
}
