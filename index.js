const { Octokit }  = require('@octokit/rest');
const child_process = require('child_process');

var token = process.env['TOKEN'];

const octokit = new Octokit({auth: token});

try{
  child_process.execSync('python tests.py');
} catch (err){
  var codeBlock = '```';
  var branch = process.env['GITHUB_REF'];
  var assignee = process.env['GITHUB_ACTOR'];
  var sha = process.env['GITHUB_SHA'];
  octokit.issues.create({
    owner: 'mesternefeld',
    repo: 'SWEN-559-Tests',
    title: `${assignee} broke branch ${branch}`,
    body: `Branch ${branch} failed at commit ${sha} with error: \n${codeBlock}\n${err}\n${codeBlock}`,
    assignee: assignee
  }).catch(err => console.log(err)).then(res => console.log(res));
  
  //throw new Error("An issue has been created, there was an error in the python code");
}
