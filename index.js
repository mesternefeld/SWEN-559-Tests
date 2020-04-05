const { Octokit }  = require('@octokit/rest');
const child_process = require('child_process');
var fs = require('fs');

var token = process.env['TOKEN'];

const octokit = new Octokit({auth: token});

try{
  console.log("got here");
  child_process.execSync('python tests.py');
} catch (err){
  console.log("caught");
  var codeBlock = '```';
  var branch = process.env['GITHUB_REF'];
  var assignee = process.env['GITHUB_ACTOR'];
  var sha = process.env['GITHUB_SHA'];
  console.log(octokit);
  octokit.issues.create({
    owner: 'mesternefeld',
    repo: 'SWEN-559-Tests',
    title: `${assignee} broke branch ${branch}`,
    body: `Branch ${branch} failed at commit ${sha} with error: \n${codeBlock}\n${err}\n${codeBlock}`,
    assignee: assignee
  }).then(res => console.log(res));
}
