#!/usr/bin/env node
const nft = {}
const program = require('commander')
const pkg = require('./package.json')
// const path = require('path')
const childProcess = require('child_process')
  // git 相关
program
  .version(pkg.version, '-v, --version')

program
  .command('start')
  .description('打开开启服务')
  .option('-d, --dev', '开发环境 发布')
  .action(function (cmd) {
    // console.log(path.join(__dirname, 'lb'), '----')
    // console.log(path.join(process.cwd(), 'cwd'), '----')
    // childProcess.spawn('npm', ['run', 'start'])
    childProcess.execSync('node src/index.js')
  })

  // release 相关
program
  .command('release')
  .description('release 快捷方式')
  .option('-d, --dev', '开发环境 发布')
  .option('-t, --test', '测试环境 发布')
  .option('-p, --prod', '正式环境 发布')
  .action(function (cmd) {
    if (cmd.dev) {
      nft
      .release('dev')
    }
    if (cmd.test) {
      nft
      .release('test')
    }
    if (cmd.prod) {
      nft
      .release('prod')
    }
  })

program.parse(process.argv)
