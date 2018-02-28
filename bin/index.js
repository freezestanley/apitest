#!/usr/bin/env node
var execSh = require("exec-sh")
var path = require("path")

var target = './doc/page'
var doc = './doc/page'
var argv = process.argv

if (argv[2] == 'build') {
  if (process.argv.length == 5) {
    if (process.argv[3] == '-t') {
      target = process.argv[4]
    } else if (process.argv[3] == '-d') {
      doc = process.argv[4]
    }
  } else if (process.argv.length == 7) {
    if (process.argv[3] == '-t') {
      target = process.argv[4]
      doc = process.argv[6]
    } else if (process.argv[3] == '-d') {
      doc = process.argv[4]
      target = process.argv[6]
    }
  }
  process.env.API_DOC = doc
  process.env.API_OUTPUT = target
  process.env.API_PATH = process.cwd()
  execSh("npm run build", { cwd: path.join(__dirname, '../')}, function(err){
    if (err) {
      console.log("Exit code: ", err.code);
    }
  })
} else {
  process.env.API_DOC = doc
  process.env.API_OUTPUT = target
  process.env.API_PATH = process.cwd()
  execSh("npm start", { cwd: path.join(__dirname, '../')}, function(err){
    if (err) {
      console.log("Exit code: ", err.code);
    }
  })
}

