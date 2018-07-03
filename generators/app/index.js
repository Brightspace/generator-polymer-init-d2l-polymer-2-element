'use strict';

const chalk = require('chalk'),
	Generator = require('yeoman-generator'),
	validateElementName = require('validate-element-name');

class ElementGenerator extends Generator {

	constructor(args, options) {
		super(args, options);
	}

	// This is necessary to prevent an exception in Yeoman when creating
	// storage for generators registered as a stub and used in a folder
	// with a package.json but with no name property.
	// https://github.com/Polymer/polymer-cli/issues/186
	rootGeneratorName() {
		return 'ElementGenerator';
	}

	initializing() {
		// Yeoman replaces dashes with spaces. We want dashes.
		this.appname = this.appname.replace(/\s+/g, '-');
	}

	prompting() {
		return this.prompt([
			{
				name: 'name',
				type: 'input',
				message: 'Element name (must start with d2l-)',
				default: this.appname + (this.appname.includes('-') ? '' : '-element'),
				validate: function(name) {
					if (!name.startsWith('d2l-')) {
						this.log('\nElement name must start with "d2l-". Please try again.');
						return false;
					}
					const nameValidation = validateElementName(name);
					if (!nameValidation.isValid) {
						this.log(`\n${nameValidation.message}\nPlease try again.`);
					} else if (nameValidation.message) {
						this.log('');  // 'empty' log inserts a line break
						this.log(nameValidation.message);
					}
					return nameValidation.isValid;
				}.bind(this),
			},
			{
				name: 'description',
				type: 'input',
				message: 'Brief description of the element',
			},
			{
				name: 'github',
				type: 'input',
				message: 'GitHub username (for CODEOWNERS file)',
			}
		]).then(function(answers) {
			this.props = answers;
			this.props.shortName = this.props.name.substr(4);
			this.props.elementClassName = this.props.shortName.replace(
				/(^|-)(\w)/g,
				function( match, p0, p1) {
					return p1.toUpperCase();
				}
			);
		}.bind(this));
	}

	writing() {
		const name = this.props.name,
			shortName = this.props.shortName;

		this.fs.copyTpl(
			`${this.templatePath()}/**/?(.)*`,
			this.destinationPath(),
			this.props,
			undefined,
			{globOptions: {ignore: ['**/_*']}}
		);

		this.fs.copyTpl(
			this.templatePath('_element.html'),
			`${name}.html`,
			this.props
		);

		this.fs.copyTpl(
			this.templatePath('test/_element.html'),
			`test/${shortName}.html`,
			this.props
		);

		this.fs.copyTpl(
			this.templatePath('test/index.html'),
			'test/index.html',
			this.props
		);

		this.fs.move(
			this.destinationPath('editorconfig'),
			this.destinationPath('.editorconfig')
		);

		this.fs.move(
			this.destinationPath('eslintrc.json'),
			this.destinationPath('.eslintrc.json')
		);

		this.fs.move(
			this.destinationPath('test/eslintrc.json'),
			this.destinationPath('test/.eslintrc.json')
		);

		this.fs.move(
			this.destinationPath('gitignore'),
			this.destinationPath('.gitignore')
		);

		this.fs.move(
			this.destinationPath('travis.yml'),
			this.destinationPath('.travis.yml')
		);

	}

	install() {
		this.log(chalk.bold('\nProject generated!'));
		this.log('Installing dependencies...');
		this.installDependencies({
			bower: false,
			npm: true
		});
	}

	end() {
		this.log(chalk.bold('\nSetup Complete!'));
		this.log('Check out your new project README for information about what to do next.\n');
	}
}

module.exports = ElementGenerator;
