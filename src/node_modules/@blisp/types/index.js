const t = require("@babel/types")
const compile = require("@blisp/compiler/compile")

function operatorForm(name, type) {
  return {
    [Symbol.for(name)]: function(form) {
      return t[type](
        Symbol.keyFor(form[1].valueOf()),
        ...form.slice(2).map(compile.bind(this))
      )
    },
  }
}

function macroForm(name, type) {
  return {
    [Symbol.for(name)]: function(form) {
      return t[type](...form.slice(1).map(compile.bind(this)))
    },
  }
}

// (catch (error) (block))

module.exports = {
  ...macroForm("#%array", "Arrayexpression"),
  ...operatorForm("#assign", "AssignmentExpression"),
  ...macroForm("#%block", "BlockStatement"),
  ...macroForm("#%break", "BreakStatement"),
  [Symbol.for("#%catch")]: function CatchClause(form) {
    return t.catchClause(
      form[1].valueOf() === Symbol.for("undefined")
        ? undefined
        : compile.call(this, form[1])
    )
  },
  ...macroForm("#%conditional", "ConditionalExpression"),
  ...macroForm("#%continue", "ContinueStatement"),
  ...macroForm("#%debugger", "DebuggerStatement"),
  ...macroForm("#%dowhile", "DoWhileStatement"),
  [Symbol.for("#%function")]: function FunctionExpression(form) {
    return functionExpression(
      form[1].valueOf() === Symbol.for("undefined")
        ? undefined
        : compile.call(this, form[1]),
      form[2].map(compile.bind(this)),
      compile.call(this, form[3]),
      form[4] && form[4].valueOf(),
      form[5] && form[5].valueOf()
    )
  },
  [Symbol.for("#%member")]: function MemberExpression(form) {
    return t.memberExpression(
      compile.call(this, form[1]),
      compile.call(this, form[2]),
      form[3] && form[3].valueOf()
    )
  },
  ...macroForm("#%return", "ReturnStatement"),
  ...macroForm("#%file", "File"),
  ...macroForm("#%program", "Program"),
  ...macroForm("#%object", "ObjectExpression"),
  [Symbol.for("#%init")]: function ObjectProperty(form) {
    return objectProperty(
      compile.call(this, form[1]),
      compile.call(this, form[2]),
      form[3] && form[3].valueOf(),
      form[4] && form[4].valueOf()
    )
  },
  [Symbol.for("#%define")]: function VariableDeclaration(form) {
    return variableDeclaration(
      Symbol.keyFor(form[1].valueOf()),
      form
        .slice(2)
        .map((decl) =>
          variableDeclarator(
            compile.call(this, decl[0]),
            decl[1] && compile.call(this, decl[1])
          )
        )
    )
  },
}
