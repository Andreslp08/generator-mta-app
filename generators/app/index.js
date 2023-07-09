'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const fs = require('fs-extra');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to MTA app's generator`
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the name of your project:',
        default: 'mta-app-project'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: 'Which package manager would you like to use?',
        choices: ['Yarn', 'npm'],
        default: 'Yarn'
      }
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    this.log('');
    this.log('==== Creating template files... ====');
    this.log('');
      const projectName = this.props.projectName;

      // Copiar los archivos del template a la carpeta especificada por el usuario
      this.fs.copy(
        this.templatePath('app'),
        this.destinationPath(projectName + '/app')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath(projectName + '/.gitignore')
      );
      this.fs.copy(
        this.templatePath('meta.xml'),
        this.destinationPath(projectName + '/meta.xml')
      );
      this.fs.copy(
        this.templatePath('README.md'),
        this.destinationPath(projectName + '/README.md')
      );

      // Actualizar el package.json dentro de la carpeta del proyecto
      this.fs.extendJSON(this.destinationPath(projectName + '/app/package.json'), {
        name: projectName
      });

  }



  end() {
    const projectName = this.props.projectName;
    fs.mkdirSync(path.join(this.destinationPath(projectName + '/app/mta'), `src`));
    this.log('');
    this.log('============================================');
    this.log(chalk.green('Project Templates created successfully!'));
    this.log('============================================');
    this.log('');
  }

  install() {
     // installing with package manager
     const projectName = this.props.projectName;
     const packageManager = this.props.packageManager.toLowerCase();
     const packageManagerCommand = packageManager === 'yarn' ? 'yarn' : 'npm';
     const appPath = this.destinationPath(projectName, 'app');
     this.spawnCommand(packageManagerCommand, ['install'], {
       cwd: appPath,
       shell:true
     }).on("close", (code)=>{
      if(code===0){
        this.log('');
        this.log('============================================');
        this.log(chalk.green('Dependencies installed successfully!'));
        this.log('============================================');
        this.log('');
        this.log(chalk.green('===MTA Resource===='));
        this.log('This project must be inside MTA resources folder.');
        this.log('');
        this.log('Refresh your resources and run this project and you should see a little app');
        this.log('');
        this.log(chalk.green('===Development===='));
        this.log('Navigate to the project directory:');
        this.log(chalk.yellow(`cd ${projectName}`));
        this.log('');
        this.log(`if you want to run the web app (Vite & react app) you must use:`);
        this.log(chalk.yellow(`cd ${projectName}/app`));
        this.log('');
        this.log('Start the project with:');
        this.log(chalk.yellow(`'yarn dev' or 'npm dev'`));
        this.log('');
        this.log('Build web App with:');
        this.log(chalk.yellow(`'yarn build' or 'npm build'`));
        this.log('');
        this.log('Remember to refresh resources and restart the resource in MTA when you make changes inside the project:');
      }else{
        this.log('');
        this.log(chalk.yellow(`ERROR: Something went wrong installing dependencies, try manually.`));
        this.log('');
        this.log(`install node dependencies (if you don't have 'node_modules' folder) with:`);
        this.log(chalk.yellow(`'yarn install' or 'npm install'`));
        this.log('');
      }
     })



  }
};
