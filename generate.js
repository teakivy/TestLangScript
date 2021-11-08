const fs = require('mz/fs');

async function main() {
	const fileName = process.argv[2];

	if (!fileName) {
		console.error('Please provide a .ast file');
		return;
	}

	const astJDON = (await fs.readFile(fileName)).toString();
	const runtimeJS = (await fs.readFile('runtime.js')).toString();
	const statements = JSON.parse(astJDON);
	const jsCode = generate(statements) + '\n\n// Runtime Functions\n\n' + runtimeJS;
	const outputFileName = fileName.replace('.ast', '.js');

	await fs.writeFile(outputFileName, jsCode);
}

function generate(statements) {
	let lines = [];
	for (let statement of statements) {
		const line = generateStatement(statement);
		lines.push(line);
	}
	return lines.join('\n');
}

function generateStatement(node) {
	if (node.type === 'var_assign') {
		const varName = node.name.value;
		const jsExpr = generateStatement(node.value);
		const js = `${node.constant ? `const` : `var`} ${varName} = ${jsExpr};`;
		return js;
	} else if (node.type === 'func_call') {
		let funcName = node.name.value;
		if (funcName === 'print') {
			funcName = '$print';
		}
		if (funcName === 'randInt') {
			funcName = '$randInt';
		}
		const argList = node.args
			.map((arg) => {
				return generateStatement(arg);
			})
			.join(', ');
		return `${funcName}(${argList})`;
	} else if (node.type === 'string') {
		return node.value;
	} else if (node.type === 'number') {
		return node.value;
	} else if (node.type === 'identifier') {
		return node.value;
	} else if (node.type === 'NL') {
		return '\n';
	} else if (node.type === 'lambda') {
		const paramList = node.parameters.map((param) => param.value).join(', ');
		const jsBody = node.body
			.map((arg, i) => {
				let code = generateStatement(arg);
				// if (i === node.body.length - 1) {
				// 	code = !code.includes('return') ? '' : 'return ' + code;
				// }
				return code;
			})
			.join('\n');
		return `(${paramList}) => {\n${indent(jsBody)}\n}`;
	} else if (node.type === 'comment') {
		return node.value;
	} else if (node.type === 'equation') {
		const left = generateStatement(node.left);
		const right = generateStatement(node.right);
		return `${left} ${node.operator} ${right}`;
	} else if (node.type === 'if') {
		const condition = generateStatement(node.condition);
		const then = node.then
			.map((arg, i) => {
				let code = generateStatement(arg);
				return code;
			})
			.join('\n');
		let jsCode = `if (${condition}) {\n${indent(then)}\n}`;
		return jsCode;
	} else if (node.type === 'ifelse') {
		const condition = generateStatement(node.condition);
		const then = node.then
			.map((arg, i) => {
				let code = generateStatement(arg);
				return code;
			})
			.join('\n');
		const otherwise = node.else
			.map((arg, i) => {
				let code = generateStatement(arg);
				return code;
			})
			.join('\n');
		let jsCode = `if (${condition}) {\n${indent(then)}\n} else {\n${indent(otherwise)}\n}`;
		return jsCode;
	} else if (node.type === 'var_reassign') {
		const intent = node.intent;
		const varName = node.name.value;
		const jsExpr = generateStatement(node.value);
		const js = `${varName} ${intent} ${jsExpr};`;
		return js;
	} else if (node.type === 'while') {
		const condition = generateStatement(node.condition);
		const jsBody = node.body
			.map((arg, i) => {
				let code = generateStatement(arg);
				return code;
			})
			.join('\n');
		let jsCode = `while (${condition}) {\n${indent(jsBody)}\n}`;
		return jsCode;
	} else if (node.type === 'incr') {
		return `${node.value}++;`;
	} else if (node.type === 'decr') {
		return `${node.value}--;`;
	} else if (node.type === 'array') {
		const argList = node.value
			.map((arg) => {
				return generateStatement(arg);
			})
			.join(', ');
		return `[${argList}]`;
	} else if (node.type === 'array_value') {
		return `${generateStatement(node.name)}[${generateStatement(node.index)}]`;
	} else if (node.type === 'array_value_assign') {
		let arrayName = generateStatement(node.arrObj.name);
		let index = generateStatement(node.arrObj.index);
		let value = generateStatement(node.value);

		return `${arrayName}[${index}] = ${value};`;
	} else if (node.type === 'func_decl') {
		const paramList = node.parameters.map((param) => param.value).join(', ');
		const jsBody = node.body
			.map((arg, i) => {
				let code = generateStatement(arg);
				// if (i === node.body.length - 1) {
				// 	code = !code.includes('return') ? '' : 'return ' + code;
				// }
				return code;
			})
			.join('\n');
		return `function ${generateStatement(node.name)}(${paramList}) {\n${indent(jsBody)}\n}`;
	} else if (node.type == 'return_statement') {
		return `return ${generateStatement(node.value)};`;
	} else if (node.type == 'break_statement') {
		return `break;`;
	} else if (node.type === 'for_loop') {
		if (node.identifier === 'generic') {
			const init = generateStatement(node.init);
			const condition = generateStatement(node.condition);
			const update = generateStatement(node.update);
			const jsBody = node.body
				.map((arg, i) => {
					let code = generateStatement(arg);
					return code;
				})
				.join('\n');
			let jsCode = `for (${init} ${condition}; ${update.substring(0, update.length - 1)}) {\n${indent(jsBody)}\n}`;
			return jsCode;
		} else if (node.identifier === 'num_basic') {
			const condition = generateStatement(node.condition);
			const jsBody = node.body
				.map((arg, i) => {
					let code = generateStatement(arg);
					return code;
				})
				.join('\n');
			let jsCode = `for (let i = 0; i < ${condition}; i++) {\n${indent(jsBody)}\n}`;
			return jsCode;
		} else if (node.identifier === 'array') {
			const varName = generateStatement(node.varName);
			const array = generateStatement(node.array);
			const jsBody = node.body
				.map((arg, i) => {
					let code = generateStatement(arg);
					return code;
				})
				.join('\n');
			let jsCode = `for (const ${varName} of ${array}) {\n${indent(jsBody)}\n}`;
			return jsCode;
		}
	} else {
		console.log('Node: ' + node);
		throw new Error(`Unhandled AST node type ${node.type}`);
	}
}

function indent(string) {
	return string
		.split('\n')
		.map((line) => '\t' + line)
		.join('\n');
}

main().catch((err) => console.log(err.stack));
