const fs = require('mz/fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function main() {
	const fileName = process.argv[2];

	if (!fileName) {
		console.error('Usage: node parse.js <file>');
		return;
	}

	const astFileName = fileName.replace('.tls', '.ast');
	const jsFileName = fileName.replace('.tls', '.js');

	if (process.argv.includes('--gen-parser')) {
		await exec(`nearleyc test.ne -o testLangScript.js`);
		console.log("Generating parser to 'testLangScript.js'...");
	}
	await execCommand(`node parse ${fileName}`);
	await execCommand(`node generate ${astFileName}`);
	await execCommand(`node ${jsFileName}`);
}

async function execCommand(command) {
	const output = await exec(command);
	if (output.stdout) {
		process.stdout.write(output.stdout);
	}
	if (output.stderr) {
		process.stderr.write(output.stderr);
	}
}

main().catch((err) => console.log(err.stack));
