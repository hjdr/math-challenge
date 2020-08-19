export default function calculator(expression: string) {
  const EXPRESSION_LENGTH = 3;
  let tokens: Array<string> = expression.split(/([-+*/()])/).filter(Boolean);
  let loopBreaker = 0

  enum OperatorType {
    Divide = '/',
    LeftParentheses = '(',
    Minus = '-',
    Multiply = '*',
    Plus = '+',
    RightParentheses = ')',
  }

  function evaluateTokens(tokens: Array<string>) {
    while (tokens.length > 1 && loopBreaker < 30) {
      scanTokens(tokens);
      loopBreaker += 1;
    }
  }

  function execute(leftOperand: number, operator: string, rightOperand: number): number {
    if (operator === OperatorType.Divide) return leftOperand / rightOperand;
    if (operator === OperatorType.Minus) return leftOperand - rightOperand;
    if (operator === OperatorType.Multiply) return leftOperand * rightOperand;
    if (operator === OperatorType.Plus) return leftOperand + rightOperand;
  }

  function executeExpression(operatorIndex: number, tokens: Array<string>) {
    const leftOperand = Number(tokens[operatorIndex - 1]);
    const rightOperand = Number(tokens[operatorIndex + 1]);
    const result = execute(leftOperand, tokens[operatorIndex], rightOperand);
    tokens.splice(operatorIndex -1, EXPRESSION_LENGTH, String(result));
  }

  function getFirstTokenIndex(operatorTypeX: string, operatorTypeY: string, tokens: Array<string>) {
    let tokenIndex: undefined | number = undefined;
    for (const [index, token] of tokens.entries()) {
      if (token === operatorTypeX || token === operatorTypeY) {
        tokenIndex = index
        break;
      }
    }
    return tokenIndex;
  }

  function group(tokens: Array<string>) {
    const leftParenthesesIndex = tokens.lastIndexOf(OperatorType.LeftParentheses);
    const rightParenthesesIndex = tokens.indexOf(OperatorType.RightParentheses, leftParenthesesIndex);
    const group = tokens.slice(leftParenthesesIndex + 1, rightParenthesesIndex);
    const groupLength = rightParenthesesIndex - leftParenthesesIndex;
    evaluateTokens(group);
    tokens.splice(leftParenthesesIndex, groupLength + 1, String(group));
  }

  function scanTokens(tokens: Array<string>){
    const hasLeftParenthesesToken = tokens.some(token => token === OperatorType.LeftParentheses);
    if (hasLeftParenthesesToken) return group(tokens);
    const divideOrMultiplyTokenIndex = getFirstTokenIndex(OperatorType.Divide, OperatorType.Multiply, tokens)
    if (divideOrMultiplyTokenIndex) {
      return executeExpression(divideOrMultiplyTokenIndex, tokens);
    }
    const plusOrMinusTokenIndex = getFirstTokenIndex(OperatorType.Minus, OperatorType.Plus, tokens)
    if (plusOrMinusTokenIndex) {
      return executeExpression(plusOrMinusTokenIndex, tokens);
    }
  }

  evaluateTokens(tokens);
  return Number(tokens[0]);
}
