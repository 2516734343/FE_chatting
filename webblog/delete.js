const shell = require("shelljs");  // 执行文件操作
// const async = require('async')  // 这是node下一个异步处理的工具
const inquirer = require('inquirer');

const chalk = require('chalk')
// 执行git提交命令
let branchList = []; // 本地分支
let noMergedList = []; // 本地未push的分支
let selectNoMerge = []; // 选中了未push的
let selectMerge = []; // 选中了已经push的
let selectAllBranch = []; // 选中的分支
branchList = shell.exec(`git branch`).stdout.replace(/[\n]/g, ',').split(',').map(item => item.trim()).filter(item => !!item);
noMergedList = shell.exec(`git branch --no-merged`).stdout.replace(/[\n]/g, ',').split(',').map(item => item.trim()).filter(item => !!item);

/**
 * 这个函数就是 根据meta.js里面定义的prompts来与用户进行交互
 * 然后收集用户的交互信息存放在metadate 也就是metalsmith元数据中
 * 用于渲染模版使用
 */
// function ask (prompts, metadate, done) {
//     async.eachSeries(Object.keys(prompts), (key, next) => {  // 这里不能简单的使用数组的 foreach方法 否则只直接跳到最后一个问题
//         inquirer.prompt([{
//             type: promptMapping[prompts[key].type] || prompts[key].type,
//             name: key,
//             message: prompts[key].message,
//             choices: prompts[key].choices || [],
//         }]).then(answers => {
//             if (typeof answers[key] === 'string') {
//                 metadate[key] = answers[key].replace(/"/g, '\\"')
//             } else {
//                 metadate[key] = answers[key]
//             }
//             next()
//         }).catch(done)
//     }, done) // 全部回答完 调用 done移交给下一个插件
// }

console.log(noMergedList);
// JSON.stringify(answers, null, '  ')


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

function deleteNoMergedBranchAsk(){
    inquirer.prompt([{
        type: 'list',
        name: 'ask',
        message: `选择的分支里有${selectNoMerge.join(', ')}未push的分支，确定删除吗？`,
        choices: ['确定删除', '删除其他选中的分支','去提交'],
    }]).then((answers) => {
        if(answers.ask === '确定删除'){
            shell.exec(`git branch -D ${selectAllBranch.join(' ')}`);
            console.log('delete branch successfully');
        } else if(answers.ask === '删除其他选中的分支'){
            shell.exec(`git branch -d ${selectMerge.join(' ')}`);
            console.log('delete branch successfully');
        } else if(answers.ask === '去提交'){
            console.log('answers.ask');
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

