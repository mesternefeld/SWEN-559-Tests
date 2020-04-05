var octokit = require("@octokit/rest");
const child_process = require('child_process');
var fs = require('fs');

var token = process.env['TOKEN'];

try{
  console.log("got here");
  child_process.execSync('python tests.py');
} catch (err){
  console.log("caught");
  var codeBlock = '```';
  var branch = process.env['GITHUB_REF'];
  var assignee = process.env['GITHUB_ACTOR'];
  var sha = process.env['GITHUB_SHA'];
  octokit.issues.create({
    owner: 'mesternefeld',
    repo: 'SWEN-559-Tests',
    title: `${assignee} broke branch ${branch}`,
    body: `Branch ${branch} failed at commit ${sha} with error: \n${codeblock}\n${err}\n${codeblock}`,
    assignee: assignee
  }).then(res => console.log(res));
}
