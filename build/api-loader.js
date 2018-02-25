const fs = require('fs')
const path = require('path')
const loaderUtils = require('loader-utils')
var currentNode 
var rootNode
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
  var regline = /^(__)(\w+)(\s|.)/
  var shortLine = /\s-\s/g
  var bigBracket = /\{(\S*)\}/
  var middleBracket = /\[(\S*)\s\=\s(\S*)\]/
  var nameReg = /\s(\w+)\s-/g
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
  if (des) {
    origin.descript = des.LTrim().RTrim()
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
  return origin
}

function customNode (str, root, tp) {
  console.log(tp)
  let key = tp.replace('__', '');
  root[key] = root[key] ? root[key] : []
  let a = splitString(str)
  root[key].push(a)
}
function createPoint (type, e, root) {
  var tp = type.replace(/(^\s*)|(\s*$)/g, "")
  var inlineNode = inline[tp]
  var blockNode = block[tp]
  if (inlineNode) {
    inlineNode(e, root)
  } else if (blockNode) {
    blockNode(e, root)
  } else {
    customNode(e, root, tp)
  }
}
function createTree (arr) {
  var reg = /(__)(\w+)(\s|.)/g
  rootNode = {}
  currentNode = rootNode
  if (arr.length > 0) {
    arr.map((e, idx, arr) => {
      if ((/^\s/g.test(e)) && e.length <= 1) {
      } else{
        var result = e.match(reg)[0]
        if (result) {
          createPoint(result, e, currentNode)
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
var inline = {
  '__class': (str, root) => {
    rootNode.class = splitString(str)
    currentNode = rootNode
  },
  '__mixins': (str, root) => {
    rootNode.mixins = str.split(',')
    currentNode = rootNode
  },
  '__extends': (str, root) => {
    rootNode.extend = str
    currentNode = rootNode
  },
  '__components': (str, root) => {
    rootNode.components = str.split(',')
    currentNode = rootNode
  },
  '__watch': (str, root) => {
    rootNode.watch = rootNode.watch ? rootNode.watch : []
    var a = splitString(str)
    rootNode.watch.push(a)
    currentNode = a
  },
  '__props': (str, root) => {
    rootNode.props = rootNode.props ? rootNode.props : []
    var a = splitString(str)
    rootNode.props.push(a)
    currentNode = a
  },
  '__computed': (str, root) => {
    rootNode.computed = rootNode.computed ? rootNode.computed : []
    var a = splitString(str)
    rootNode.computed.push(a)
    currentNode = a
  },
  '__methods': (str, root) => {
    rootNode.methods = rootNode.methods ? rootNode.methods : []
    var a = splitString(str)
    rootNode.methods.push(a)
    currentNode = a
  },
  '__event': (str, root) => {
    rootNode.event = rootNode.event ? rootNode.event : []
    var a = splitString(str)
    rootNode.event.push(a)
    currentNode = a
  }
}
var block = {
  '__attr': (str, root) => {
    root.attr = root.attr ? root.attr : []
    var a = splitString(str)
    root.attr.push(a)
  },
  '__function': (str, root) => {
    root.function = root.function ? root.function : []
    var a = splitString(str)
    root.function.push(a)
    currentNode = a
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
module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  const filename = this.resourcePath.substr(this.resourcePath.lastIndexOf('/') + 1).split('.')[0]
  const extension = (options && options.extension) || '.json'
  const dir = __dirname
  const rpath = path.join('./', 'doc/json', path.relative(__dirname, this.context))
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
