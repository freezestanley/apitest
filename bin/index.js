#!/usr/bin/env node
var execSh = require("exec-sh")
execSh("npm start", { cwd: "./" }, function(err){
  if (err) {
    console.log("Exit code: ", err.code);
  }
})