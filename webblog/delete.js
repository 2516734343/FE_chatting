const shell = require("shelljs");  // 执行文件操作

const inquirer = require('inquirer');

const chalk = require('chalk');

let branchList = []; // 本地分支
let noMergedList = []; // 本地未push的分支
let selectNoMerge = []; // 选中了未push的
let selectMerge = []; // 选中了已经push的
let selectAllBranch = []; // 选中的分支

// 执行git提交命令
branchList = shell.exec(`git branch`).stdout.replace(/[\n]/g, ',').split(',').map(item => item.trim()).filter(item => !!item);

noMergedList = shell.exec(`git branch --no-merged`).stdout.replace(/[\n]/g, ',').split(',').map(item => item.trim()).filter(item => !!item);


// 选择要删除的分支

function selectDeleteBrach() {
    let prompts = [{
        type: 'checkbox',
        name: 'branchs',
        message: 'Checkout the branchs needed for you want to delete:',
        pageSize: 9,
        choices: branchList,
        default: [],
        validate: function(answer){
            if(answer.length < 1){
                return 'You must choose at least one topping.';
            }
            return true;
        }
    }];
    inquirer.prompt(prompts)
        .then((answers) => {
            selectAllBranch = answers.branchs;
            selectNoMerge = answers.branchs.filter(it => noMergedList.includes(it));
            selectMerge = answers.branchs.filter(it => !noMergedList.includes(it));
            if (selectNoMerge.length > 0) {
                deleteNoMergedBranchAsk();
            } else {
                shell.exec(`git branch -D ${answers.branchs.join(' ')}`);
                console.log('delete branch successfully');
            }
        })
        .catch((error) => {console.log(chalk.red(error));} );
}

// 处理删除未push的分支情况
function deleteNoMergedBranchAsk(){
    inquirer.prompt([{
        type: 'list',
        name: 'ask',
        message: `There are unpushed branches in the selected branches: ${selectNoMerge.join(', ')}，are you sure to delete？`,
        choices: ['Delete', 'Delete other selected branches','To submit'],
    }]).then((answers) => {
        if(answers.ask === 'Delete'){
            shell.exec(`git branch -D ${selectAllBranch.join(' ')}`);
            console.log('delete branch successfully');
        } else if(answers.ask === 'Delete other selected branches'){
            shell.exec(`git branch -d ${selectMerge.join(' ')}`);
            console.log('delete branch successfully');
        } else if(answers.ask === 'To submit'){
            return;
        }else {
            return;
        }
    }).catch((error) => {console.log(chalk.red(error));} );
}


function main() {
    selectDeleteBrach();
}

main();

