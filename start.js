let fs = require('fs')
let projectName = process.argv[2]

var inquirer = require('inquirer');
var obj = { 
  'bpgl':'班牌管理',
  'deyu':'德育管理',
  'jsda':'教师档案查看',
  'mjcx':'门禁查询',
  'ssmj':'宿舍门禁',
  'wdda':'我的档案(学生/教师)(编辑/查看)',
  'xfmx':'消费明细',
  'xsrx':'新生入学'
}
var files = fs.readdirSync('./pages');
if(projectName && files.indexOf(projectName)<0) { 
  console.log('没有此项目~')
  return 
}
files = files.map(el=>{ 
  var name = `${el}-${obj[el]}`
  var value = el;
  return {name,value}
})
const initQuestions = [{
  type: 'rawlist',
  name: 'project',
  message: '请选择开启项目',
  choices: files
}
];
if(files.length == 0) { 
  projectName = files[0];
}

if(projectName) { 
  let exec = require('child_process').execSync;
  exec(`node ./bin/xsfzgl --project=${projectName}`, {stdio: 'inherit'});  
} else { 
  inquirer.prompt(initQuestions).then(result => {
    let exec = require('child_process').execSync;
    exec(`node ./bin/xsfzgl --project=${result.project}`, {stdio: 'inherit'});
  })
}

