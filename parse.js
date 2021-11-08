const nearley = require('nearley');
const grammar = require('./testLangScript.js');
const fs = require('mz/fs');

async function main() {
	const fileName = process.argv[2];

	if (!fileName) {
		console.error('Usage: node parse.js <file>');
		return;
	}

	const code = (await fs.readFile(fileName)).toString().replaceAll('\r', '');
	const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

	// Parse the input
	parser.feed(code);
	// if (parser.results.length > 1) {
	// 	// console.log(parser.results);
	// 	// console.log('Error: Ambiguous grammar detected!');
	// 	const ast = parser.results[0];
	// 	const outputFileName = fileName.replace('.tls', '.ast');
	// 	await fs.writeFile(outputFileName, JSON.stringify(ast, null, '\t'));
	// 	console.log(`Wrote ${outputFileName}`);
	// } else
	if (parser.results.length >= 1) {
		const ast = parser.results[0];
		const outputFileName = fileName.replace('.tls', '.ast');
		await fs.writeFile(outputFileName, JSON.stringify(ast, null, '\t'));
	} else {
		console.log(parser.results);
		console.log('Error: No parse found!');
	}
}

main().catch((err) => console.log(err.stack));
