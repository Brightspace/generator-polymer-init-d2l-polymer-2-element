'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-polymer-init-d2l-polymer-2-element', () => {

	before(function() {
		return helpers.run(path.join(__dirname, '../generators/app'))
			.withPrompts({name: 'd2l-foo', github: 'billnye'})
			.toPromise();
	});

	it('should copy files', () => {
		assert.file([
			'.editorconfig',
			'.eslintrc.json',
			'.gitignore',
			'.travis.yml',
			'all-imports.html',
			'bower.json',
			'CODEOWNERS',
			'd2l-foo.html',
			'index.html',
			'LICENSE',
			'package.json',
			'polymer.json',
			'README.md',
			'wct.conf.json',
			'demo/index.html',
			'test/foo.html',
			'test/index.html'
		]);
	});

	it('should put github username in CODEOWNERS file', () => {
		assert.fileContent('CODEOWNERS', '*       @billnye');
	});

	it('should put year in LICENSE file', () => {
		const year = new Date().getFullYear().toString();
		assert.fileContent('LICENSE', `Copyright ${year} D2L Corporation`);
	});

});
