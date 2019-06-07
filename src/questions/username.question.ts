import inquirer from 'inquirer';

export function userNameQuestion(): Promise<any> {
    return inquirer.prompt([{
        name: 'userName',
        type: 'input',
        message: 'Please fill in your Git username:',
    }]);
}