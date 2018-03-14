'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const slugify = require('slugify');

function camelCase(name) {
  return (
    'D2L' +
    name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('')
  );
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the impressive ' +
          chalk.red('generator-polymer-init-d2l-polymer-2-element') +
          ' generator!'
      )
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Please enter the name of the project (e.g. text-input):',
        default: slugify(this.appname)
      },
      {
        type: 'input',
        name: 'description',
        message:
          'Please enter a description of the project (e.g. Polymer-based web component for D2L text inputs):',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      props.className = camelCase(props.name);
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('.editorconfig')
    );

    this.fs.copy(
      this.templatePath('.eslintrc.json'),
      this.destinationPath('.eslintrc.json')
    );

    this.fs.copy(this.templatePath('polymer.json'), this.destinationPath('polymer.json'));

    this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));

    this.fs.copy(this.templatePath('.travis.yml'), this.destinationPath('.travis.yml'));

    this.fs.copy(
      this.templatePath('wct.conf.json'),
      this.destinationPath('wct.conf.json')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        description: this.props.description
      }
    );

    this.fs.copyTpl(this.templatePath('bower.json'), this.destinationPath('bower.json'), {
      name: this.props.name,
      description: this.props.description
    });

    this.fs.copyTpl(
      this.templatePath('_element.html'),
      this.destinationPath('d2l-' + this.props.name + '.html'),
      {
        name: this.props.name,
        description: this.props.description,
        className: this.props.className
      }
    );

    this.fs.copyTpl(this.templatePath('index.html'), this.destinationPath('index.html'), {
      name: this.props.name
    });

    this.fs.copyTpl(
      this.templatePath('demo/index.html'),
      this.destinationPath('demo/index.html'),
      {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath('test/.eslintrc.json'),
      this.destinationPath('test/.eslintrc.json')
    );

    this.fs.copyTpl(
      this.templatePath('test/index.html'),
      this.destinationPath('test/index.html'),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('test/_element.html'),
      this.destinationPath('test/d2l-' + this.props.name + '.html'),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
      name: this.props.name
    });
  }

  install() {
    this.installDependencies();
  }
};
