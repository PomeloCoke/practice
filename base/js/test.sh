#!/bin/bash
  rootPath="E:/study/cs/practice/"
  distPath=$rootPath"base/js"
  assetPath=$rootPath"base"
  viewPath=$rootPath"base/js/test1"
  tarPath=$rootPath"base/js/test2"
  
  mergeName=$(git rev-parse --abbrev-ref HEAD)
  echo $mergeName
  # cp test1/* $tarPath
  # rm -rf test1/*
  exec /bin/bash
  # mkdir test