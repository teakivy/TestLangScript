// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const lexer = require('./lexer');
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "statements$ebnf$1", "symbols": []},
    {"name": "statements$ebnf$1$subexpression$1", "symbols": ["__lb_", "statement"]},
    {"name": "statements$ebnf$1", "symbols": ["statements$ebnf$1", "statements$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "statements", "symbols": ["_ml", "statement", "statements$ebnf$1", "_ml"], "postprocess": 
        (data) => {
            const repeated = data[2];
            const restStatements = repeated.map(chunks => chunks[1]);
            return [data[1], ...restStatements];
        }
                },
    {"name": "statement", "symbols": ["var_assign"], "postprocess": id},
    {"name": "statement", "symbols": ["func_decl"], "postprocess": id},
    {"name": "statement", "symbols": ["func_call"], "postprocess": id},
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "statement", "symbols": ["if"], "postprocess": id},
    {"name": "statement", "symbols": ["ifelse"], "postprocess": id},
    {"name": "statement", "symbols": ["var_reassign"], "postprocess": id},
    {"name": "statement", "symbols": ["while"], "postprocess": id},
    {"name": "statement", "symbols": ["for"], "postprocess": id},
    {"name": "statement", "symbols": ["return_statement"], "postprocess": id},
    {"name": "statement", "symbols": ["break_statement"], "postprocess": id},
    {"name": "return_statement", "symbols": [{"literal":"return"}, "__", "expr", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'return_statement',
                value: data[2]
            };
        }
                },
    {"name": "break_statement", "symbols": [{"literal":"break"}, "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'break_statement',
            };
        }
                },
    {"name": "func_decl$ebnf$1$subexpression$1", "symbols": ["param_list", "_"]},
    {"name": "func_decl$ebnf$1", "symbols": ["func_decl$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_decl$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_decl", "symbols": [{"literal":"func"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"("}, "_", "func_decl$ebnf$1", {"literal":")"}, "_", "lambda_body", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: "func_decl",
                name: data[2],
                parameters: data[5] ? data[5][0] : [],
                body: data[8]
            }
        }
            },
    {"name": "func_call$ebnf$1$subexpression$1", "symbols": ["arg_list", "_"]},
    {"name": "func_call$ebnf$1", "symbols": ["func_call$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "func_call$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "func_call", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), {"literal":"("}, "_", "func_call$ebnf$1", {"literal":")"}, (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: "func_call",
                name: data[0],
                args: data[3] ? data[3][0] : []
            }
        }
                },
    {"name": "arg_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "arg_list", "symbols": ["arg_list", (lexer.has("NIL") ? {type: "NIL"} : NIL), "_", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[3]];
        }
                },
    {"name": "var_assign", "symbols": [{"literal":"let"}, "__", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_assign',
                constant: false,
                name: data[2],
                value: data[6]
            }
        }
            },
    {"name": "var_assign", "symbols": [{"literal":"const"}, "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_assign',
                constant: true,
                name: data[2],
                value: data[6]
            }
        }
            },
    {"name": "array", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": 
        (data) => {
            return {
                type: 'array',
                value: []
            }
        }
                },
    {"name": "array", "symbols": [(lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "_ml", "array_list", "_ml", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": 
        (data) => {
            return {
                type: 'array',
                value: data[2]
            }
        }
                },
    {"name": "array_list", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "array_list", "symbols": ["array_list", (lexer.has("NIL") ? {type: "NIL"} : NIL), "_ml", "expr"], "postprocess": 
        (data) => {
            return [...data[0], data[3]];
        }
                },
    {"name": "while", "symbols": [{"literal":"while"}, "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "statement_body", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'while',
                condition: data[4],
                body: data[8]
            }
        }
                },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '=',
                name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"+="}, "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '+=',
                name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"-="}, "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '-=',
                name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"*="}, "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '*=',
                name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"/="}, "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '/=',
                name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"%="}, "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '%=',
                name: data[0],
                value: data[4]
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"++"}, "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '+=',
                name: data[0],
                value: {
                    type: 'number',
                    value: 1
                }
            }
        }
            },
    {"name": "var_reassign", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "_", {"literal":"--"}, "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'var_reassign',
                intent: '-=',
                name: data[0],
                value: {
                    type: 'number',
                    value: 1
                }
            }
        }
            },
    {"name": "var_reassign", "symbols": ["array_value", "_", (lexer.has("assign") ? {type: "assign"} : assign), "_", "expr", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'array_value_assign',
                arrObj: data[0],
                value: data[4]
            }
        }
            },
    {"name": "expr", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": id},
    {"name": "expr", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": id},
    {"name": "expr", "symbols": ["boolean"], "postprocess": id},
    {"name": "expr", "symbols": ["func_call"], "postprocess": id},
    {"name": "expr", "symbols": ["lambda"], "postprocess": id},
    {"name": "expr", "symbols": ["equation"], "postprocess": id},
    {"name": "expr", "symbols": ["array"], "postprocess": id},
    {"name": "expr", "symbols": ["array_value"], "postprocess": id},
    {"name": "array_value", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), (lexer.has("lbracket") ? {type: "lbracket"} : lbracket), "expr", (lexer.has("rbracket") ? {type: "rbracket"} : rbracket)], "postprocess": 
        (data) => {
            return {
                type: 'array_value',
                name: data[0],
                index: data[2]
            }
        }
                },
    {"name": "boolean", "symbols": [(lexer.has("true") ? {type: "true"} : true)], "postprocess": id},
    {"name": "boolean", "symbols": [(lexer.has("false") ? {type: "false"} : false)], "postprocess": id},
    {"name": "if", "symbols": [{"literal":"if"}, "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "statement_body", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'if',
                condition: data[4],
                then: data[8]
            }
        }
                },
    {"name": "ifelse", "symbols": [{"literal":"if"}, "_", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_", "statement_body", "_", {"literal":"else"}, "_", "statement_body", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'ifelse',
                condition: data[4],
                then: data[8],
                else: data[12]
            }
        }
                },
    {"name": "statement_body", "symbols": [{"literal":"{"}, "_", "statements", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return data[2];
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("add") ? {type: "add"} : add), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '+'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("sub") ? {type: "sub"} : sub), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '-'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("mul") ? {type: "mul"} : mul), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '*'
            }
        }
        
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("div") ? {type: "div"} : div), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '/'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("mod") ? {type: "mod"} : mod), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '%'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("eq") ? {type: "eq"} : eq), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '==='
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("gt") ? {type: "gt"} : gt), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '>'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("lt") ? {type: "lt"} : lt), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '<'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("gte") ? {type: "gte"} : gte), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '>='
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("lte") ? {type: "lte"} : lte), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '<='
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("neq") ? {type: "neq"} : neq), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '!='
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("and") ? {type: "and"} : and), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '&&'
            }
        }
                },
    {"name": "equation", "symbols": ["expr", "_", (lexer.has("or") ? {type: "or"} : or), "_", "expr"], "postprocess": 
        (data) => {
            return {
                type: 'equation',
                left: data[0],
                right: data[4],
                operator: '||'
            }
        }
                },
    {"name": "lambda$ebnf$1$subexpression$1", "symbols": ["param_list", "_"]},
    {"name": "lambda$ebnf$1", "symbols": ["lambda$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "lambda$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "lambda", "symbols": [{"literal":"("}, "_", "lambda$ebnf$1", {"literal":")"}, "_", {"literal":"->"}, "_", "lambda_body"], "postprocess": 
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
            },
    {"name": "for", "symbols": [{"literal":"for"}, "__", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "var_assign", "_", "expr", "_", {"literal":";"}, "_", "var_reassign", "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_ml", "statement_body", "_", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'for_loop',
                identifier: 'generic',
                init: data[4],
                condition: data[6],
                update: data[10],
                body: data[14]
            }
        }
                },
    {"name": "for", "symbols": [{"literal":"for"}, "__", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", "expr", {"literal":";"}, "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_ml", "statement_body", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'for_loop',
                identifier: 'num_basic',
                condition: data[4],
                body: data[9]
            }
        }
                },
    {"name": "for", "symbols": [{"literal":"for"}, "__", (lexer.has("lparen") ? {type: "lparen"} : lparen), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "__", {"literal":"in"}, "__", "expr", {"literal":";"}, "_", (lexer.has("rparen") ? {type: "rparen"} : rparen), "_ml", "statement_body", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": 
        (data) => {
            return {
                type: 'for_loop',
                identifier: 'array',
                varName: data[4],
                array: data[8],
                body: data[13]
            }
        }
                },
    {"name": "param_list$ebnf$1", "symbols": []},
    {"name": "param_list$ebnf$1$subexpression$1", "symbols": [(lexer.has("NIL") ? {type: "NIL"} : NIL), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier)]},
    {"name": "param_list$ebnf$1", "symbols": ["param_list$ebnf$1", "param_list$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "param_list", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "param_list$ebnf$1"], "postprocess": 
        (data) => {
            const repeatedPieces = data[1];
            const restParams = repeatedPieces.map(piece => piece[2]);
            return [data[0], ...restParams];
        }
                },
    {"name": "lambda_body", "symbols": ["expr"], "postprocess": 
        (data) => {
            return [data[0]];
        }
                },
    {"name": "lambda_body", "symbols": [{"literal":"{"}, "_", "statements", "_", {"literal":"}"}], "postprocess": 
        (data) => {
            return data[2];
        }
                },
    {"name": "__lb_$ebnf$1$subexpression$1", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1$subexpression$1"]},
    {"name": "__lb_$ebnf$1$subexpression$2", "symbols": ["_", (lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__lb_$ebnf$1", "symbols": ["__lb_$ebnf$1", "__lb_$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__lb_", "symbols": ["__lb_$ebnf$1", "_"]},
    {"name": "_ES$ebnf$1", "symbols": []},
    {"name": "_ES$ebnf$1", "symbols": ["_ES$ebnf$1", (lexer.has("ES") ? {type: "ES"} : ES)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ES", "symbols": ["_ES$ebnf$1"]},
    {"name": "_ml$ebnf$1", "symbols": []},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "_ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "_ml$ebnf$1", "symbols": ["_ml$ebnf$1", "_ml$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_ml", "symbols": ["_ml$ebnf$1"]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$1", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1$subexpression$1"]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__ml$ebnf$1$subexpression$2", "symbols": [(lexer.has("NL") ? {type: "NL"} : NL)]},
    {"name": "__ml$ebnf$1", "symbols": ["__ml$ebnf$1", "__ml$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__ml", "symbols": ["__ml$ebnf$1"]},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1", "symbols": [(lexer.has("WS") ? {type: "WS"} : WS)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", (lexer.has("WS") ? {type: "WS"} : WS)], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"]}
]
  , ParserStart: "statements"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
