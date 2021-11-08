@{%
const lexer = require('./lexer');
%}

@lexer lexer

statements
    ->  _ml statement (__lb_ statement):* _ml 
        {%
            (data) => {
                const repeated = data[2];
                const restStatements = repeated.map(chunks => chunks[1]);
                return [data[1], ...restStatements];
            }
        %}

statement
    -> var_assign   {% id %}
    |  func_decl    {% id %}
    |  func_call    {% id %}
    |  %comment     {% id %}
    |  if           {% id %}
    |  ifelse       {% id %}
    |  var_reassign {% id %}
    |  while        {% id %}
    |  for          {% id %}
    |  return_statement  {% id %}
    |  break_statement   {% id %}


return_statement
    -> "return" __ expr %ES
        {%
            (data) => {
                return {
                    type: 'return_statement',
                    value: data[2]
                };
            }
        %}

break_statement
    -> "break" _ %ES
        {%
            (data) => {
                return {
                    type: 'break_statement',
                };
            }
        %}

func_decl
    -> "func" __ %identifier "(" _ (param_list _):? ")" _ lambda_body %ES
    {%
        (data) => {
            return {
                type: "func_decl",
                name: data[2],
                parameters: data[5] ? data[5][0] : [],
                body: data[8]
            }
        }
    %}

func_call
    -> %identifier "(" _ (arg_list _):? ")" %ES
        {%
            (data) => {
                return {
                    type: "func_call",
                    name: data[0],
                    args: data[3] ? data[3][0] : []
                }
            }
        %}

arg_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  arg_list %NIL _ expr
        {%
            (data) => {
                return [...data[0], data[3]];
            }
        %}

var_assign -> "let" __ %identifier _ %assign _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_assign',
                constant: false,
                name: data[2],
                value: data[6]
            }
        }
    %}
    | "const" _ %identifier _ %assign _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_assign',
                constant: true,
                name: data[2],
                value: data[6]
            }
        }
    %}

array
    -> %lbracket _ %rbracket
        {%
            (data) => {
                return {
                    type: 'array',
                    value: []
                }
            }
        %}
    | %lbracket _ml array_list _ml %rbracket
        {%
            (data) => {
                return {
                    type: 'array',
                    value: data[2]
                }
            }
        %}

array_list
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  array_list %NIL _ml expr
        {%
            (data) => {
                return [...data[0], data[3]];
            }
        %}

while
    -> "while" _ %lparen _ expr _ %rparen _ statement_body %ES
        {%
            (data) => {
                return {
                    type: 'while',
                    condition: data[4],
                    body: data[8]
                }
            }
        %}

var_reassign -> %identifier _ %assign _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_reassign',
                intent: '=',
                name: data[0],
                value: data[4]
            }
        }
    %}
    |  %identifier _ "+=" _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_reassign',
                intent: '+=',
                name: data[0],
                value: data[4]
            }
        }
    %}
    |  %identifier _ "-=" _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_reassign',
                intent: '-=',
                name: data[0],
                value: data[4]
            }
        }
    %}
    |  %identifier _ "*=" _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_reassign',
                intent: '*=',
                name: data[0],
                value: data[4]
            }
        }
    %}
    |  %identifier _ "/=" _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_reassign',
                intent: '/=',
                name: data[0],
                value: data[4]
            }
        }
    %}
    |  %identifier _ "%=" _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'var_reassign',
                intent: '%=',
                name: data[0],
                value: data[4]
            }
        }
    %}
    |  %identifier _ "++" _ %ES
    {%
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
    %}
    |  %identifier _ "--" _ %ES
    {%
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
    %}
    | array_value _ %assign _ expr _ %ES
    {%
        (data) => {
            return {
                type: 'array_value_assign',
                arrObj: data[0],
                value: data[4]
            }
        }
    %}

expr
    -> %string     {% id %}
    |  %number     {% id %}
    |  %identifier {% id %}
    |  boolean     {% id %} 
    |  func_call   {% id %}
    |  lambda      {% id %}
    |  equation    {% id %}
    |  array       {% id %}
    |  array_value {% id %}

array_value
    -> %identifier %lbracket expr %rbracket
        {%
            (data) => {
                return {
                    type: 'array_value',
                    name: data[0],
                    index: data[2]
                }
            }
        %}

boolean
    -> %true       {% id %}
    |  %false      {% id %}

if 
    -> "if" _ %lparen _ expr _ %rparen _ statement_body _ %ES
        {%
            (data) => {
                return {
                    type: 'if',
                    condition: data[4],
                    then: data[8]
                }
            }
        %}

ifelse 
    -> "if" _ %lparen _ expr _ %rparen _ statement_body _ "else" _ statement_body _ %ES
        {%
            (data) => {
                return {
                    type: 'ifelse',
                    condition: data[4],
                    then: data[8],
                    else: data[12]
                }
            }
        %}

statement_body
    -> "{" _ statements _ "}"
        {%
            (data) => {
                return data[2];
            }
        %}

equation
    -> expr _ %add _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '+'
                }
            }
        %}
    |  expr _ %sub _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '-'
                }
            }
        %}
    |  expr _ %mul _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '*'
                }
            }

        %}
    |  expr _ %div _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '/'
                }
            }
        %}
    |  expr _ %mod _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '%'
                }
            }
        %}
    |  expr _ %eq _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '==='
                }
            }
        %}
    |  expr _ %gt _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '>'
                }
            }
        %}
    |  expr _ %lt _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '<'
                }
            }
        %}
    |  expr _ %gte _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '>='
                }
            }
        %}
    |  expr _ %lte _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '<='
                }
            }
        %}
    |  expr _ %neq _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '!='
                }
            }
        %}
    |  expr _ %and _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '&&'
                }
            }
        %}
    |  expr _ %or _ expr
        {%
            (data) => {
                return {
                    type: 'equation',
                    left: data[0],
                    right: data[4],
                    operator: '||'
                }
            }
        %}


lambda -> "(" _ (param_list _):? ")"  _ "->"  _ lambda_body
    {%
        (data) => {
            return {
                type: "lambda",
                parameters: data[2] ? data[2][0] : [],
                body: data[7]
            }
        }
    %}

for
    -> "for" __ %lparen _ var_assign _ expr _ ";" _ var_reassign _ %rparen _ml statement_body _ %ES
        {%
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
        %}
    | "for" __ %lparen _ expr ";" _ %rparen _ml statement_body %ES
        {%
            (data) => {
                return {
                    type: 'for_loop',
                    identifier: 'num_basic',
                    condition: data[4],
                    body: data[9]
                }
            }
        %}
    | "for" __ %lparen _ %identifier __ "in" __ expr ";" _ %rparen _ml statement_body %ES
        {%
            (data) => {
                return {
                    type: 'for_loop',
                    identifier: 'array',
                    varName: data[4],
                    array: data[8],
                    body: data[13]
                }
            }
        %}
    
param_list
    -> %identifier (%NIL  _ %identifier):*
        {%
            (data) => {
                const repeatedPieces = data[1];
                const restParams = repeatedPieces.map(piece => piece[2]);
                return [data[0], ...restParams];
            }
        %}

lambda_body
    -> expr
        {%
            (data) => {
                return [data[0]];
            }
        %}
    |  "{" _ statements _ "}"
        {%
            (data) => {
                return data[2];
            }
        %}

# Mandatory whitespace wiith optional whitespace around it
__lb_ -> (_ %NL):+ _

# Optional ';'
_ES -> %ES:*

# Multi-line optional Whitespace
_ml -> (%WS | %NL):*

# Multiline Required Whitespace
__ml -> (%WS | %NL):+

# Optional Whitespace
_ -> %WS:*

# Required Whitespace
__ -> %WS:+
