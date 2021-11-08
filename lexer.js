const moo = require('moo');
const fs = require('mz/fs');

let lexer = moo.compile({
	WS: /[ \t]+/,
	comment: /\/\/.*?$/,
	number: /0|[1-9][0-9]*/,
	string: /"(?:\\["\\]|[^\n"\\])*"/,
	lparen: '(',
	rparen: ')',
	lbracket: '[',
	rbracket: ']',
	lcurly: '{',
	rcurly: '}',
	identifier: /[a-zA-Z_][a-zA-Z0-9_]*/,
	lambdaAssign: '->',
	true: 'true',
	false: 'false',
	incr: '++',
	decr: '--',
	addEq: '+=',
	subEq: '-=',
	mulEq: '*=',
	divEq: '/=',
	modEq: '%=',
	add: '+',
	sub: '-',
	mul: '*',
	div: '/',
	mod: '%',
	eq: '==',
	neq: '!=',
	lt: '<',
	gt: '>',
	lte: '<=',
	gte: '>=',
	and: '&&',
	or: '||',
	not: '!',
	// Next in List
	NIL: ',',
	// End of Statement
	ES: ';',
	assign: '=',
	keywords: ['let'],
	NL: { match: /\n/, lineBreaks: true },
});

module.exports = lexer;

async function main() {
	let code = (await fs.readFile('main.tls')).toString();
	code = code.replaceAll('\r', '');

	lexer.reset(code);

	while (true) {
		let token = lexer.next();
		if (!token) break;
		console.log(token);
	}
}
