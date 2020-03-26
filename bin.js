#!/usr/bin/env node
const nft = {}
const program = require('commander')
const pkg = require('./package.json')
const path = require('path')
const childProcess = require('child_process')
const readline = require('readline')
var shell = require('shelljs')

var exec = childProcess.exec;
  // git 相关
program
  .version(pkg.version, '-v, --version')

program
  .command('sl')
  .action(function (cmd) {
    shell.echo(process.cwd());
  });

program
  .command('start')
  .description('打开开启服务')
  .option('-d, --dev', '开发环境 发布')
  .action(function (cmd) {
    const locPath = path.join(__dirname, 'src/index.js')
    console.log(path.join(__dirname, 'src/index.js'), '----')
    console.log(path.join(process.cwd(), 'cwd'), '----')
    // childProcess.spawn('npm', ['run', 'start'])
    // const diff = childProcess.execSync('lsof -i:3602')
    // console.log(diff, 'diff');
    childProcess.execSync(`node ${locPath}`)
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

program
  .command('rd <dir> <ff> [otherDirs...]')
  .action(function (di, ff, otherDirs) {
    console.log('rd %s', di);
    console.log('rd %s', ff);
    // console.log('rd %s', process.argv);
    if (otherDirs) {
      otherDirs.forEach(function (oDir) {
        console.log('rmdir %s', oDir);
      });
    }
  });

program
  .command('test <dir>')
  .action(function (di) {
    console.log('rd %s', di);
    childProcess.exec(`chmod 777 ${path.join(__dirname, '/test.sh')}`)
    childProcess.execFile(path.join(__dirname, '/test.sh'), () => {
      console.log(123);
    })
  });

program
  .command('random')
  .action(function (di) {
    console.log('rd %s', di);
    childProcess.exec(`chmod 777 ${path.join(__dirname, '/random.sh')}`)
    childProcess.execFile(path.join(__dirname, '/random.sh'), (err, sto) => {
      console.log(err, sto, 123);
    })
  });

program
  .command('qe')
  .action(function (di) {
    childProcess.execSync('git clone https://github.com/zhailb666/css-practice', {cwd: path.join(process.cwd(), 'src/pages')});
    const rl=readline.createInterface({
     input: process.stdin,
     output: process.stdout
    });
    rl.question('你想对谁说声hello？',answer=> {
      console.log(answer, 'answer')
      if(answer == 1) {
        console.log('dd1')
        childProcess.exec('git clone https://github.com/zhailb666/css-practice', {cwd: path.join(__dirname, '/')});
      } else if ( answer == 2) {
        console.log('dd2')
      } else {
        console.log('dd3')
      }
      process.exit(0)
    }); 
  });

program
  .command('q')
  .action(function (di) {
    const unloadChar='-';
    const loadedChar='=';
    const rl=readline.createInterface({
     input: process.stdin,
     output: process.stdout
    });
    rl.question('你想对谁说声hello？',answer=>{
      let i = 0;
      let time = setInterval(()=>{
       if(i>10){
        clearInterval(time);
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);
        console.log(`hello ${answer}`);
        process.exit(0)
        return
       }
       readline.cursorTo(process.stdout,0,1);
       readline.clearScreenDown(process.stdout);
       renderProgress('saying hello',i);
       i++
      },200);
     });
      
     function renderProgress(text,step){
      const PERCENT = Math.round(step*10);
      const COUNT = 2;
      const unloadStr = new Array(COUNT*(10-step)).fill(unloadChar).join('');
      const loadedStr = new Array(COUNT*(step)).fill(loadedChar).join('');
      process.stdout.write(`${text}:【${loadedStr}${unloadStr}|${PERCENT}%】`)
     }     
  });

program.parse(process.argv)
