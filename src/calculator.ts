
export default function calculator(expression: string) {
  const EXPRESSION_LENGTH = 3;
  let tokens: Array<string> = expression.split(/([-+*/()])/).filter(Boolean)
  let loopBreaker = 0

  enum OperatorType {
    Divide = '/',
    LeftParentheses = '(',
    Minus = '-',
    Multiply = '*',
    Plus = '+',
    RightParentheses = ')',
  }

  function addOrSubtract(tokens: Array<string>) {
    const operator = getFirstOccurringOperator(OperatorType.Plus, OperatorType.Minus, tokens);
    if (operator === OperatorType.Plus) return executeExpression(OperatorType.Plus, tokens);
    return executeExpression(OperatorType.Minus, tokens);
  }

  function divideOrMultiply(tokens: Array<string>) {
    const operator = getFirstOccurringOperator(OperatorType.Divide, OperatorType.Multiply, tokens);
    if (operator === OperatorType.Divide) return executeExpression(OperatorType.Divide, tokens);
    return executeExpression(OperatorType.Multiply, tokens);
  }

  function evaluateTokens(tokens: Array<string>) {
    while (tokens.length > 1 && loopBreaker < 30) {
      // console.log('start', tokens)
      scanTokens(tokens);
      loopBreaker += 1;
    }
  }

  function execute(leftOperand: number, operator: string, rightOperand: number) {
    if (operator === OperatorType.Divide) return leftOperand / rightOperand;
    if (operator === OperatorType.Minus) return leftOperand - rightOperand;
    if (operator === OperatorType.Multiply) return leftOperand * rightOperand;
    if (operator === OperatorType.Plus) return leftOperand + rightOperand;
  }

  function executeExpression(operator: string, tokens: Array<string>) {
    for (const [index, token] of tokens.entries()) {
      const leftOperand = Number(tokens[index - 1]);
      const rightOperand = Number(tokens[index + 1]);

      if (token === operator) {
        const sum = execute(leftOperand, operator, rightOperand);
        tokens.splice(index -1, EXPRESSION_LENGTH, String(sum));
        break;
      }
    }
  }

  function getFirstOccurringOperator(
    firstOperator: string,
    secondOperator: string,
    tokens: Array<string>,
  ) {
    const firstOperatorIndex = tokens.indexOf(firstOperator);
    const secondOperatorIndex = tokens.indexOf(secondOperator);
    if (firstOperatorIndex === -1
      || (firstOperatorIndex > secondOperatorIndex && secondOperatorIndex !== - 1)
    ) return secondOperator;
    return firstOperator;
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
    const hasGroup = tokens.some(token => token === OperatorType.LeftParentheses);
    if (hasGroup) return group(tokens);
    const hasDivideOrMultiply = tokens
      .some(token => token === OperatorType.Divide || token === OperatorType.Multiply);
    if (hasDivideOrMultiply) return divideOrMultiply(tokens);
    const hasAddOrSubtract = tokens
      .some(token => token === OperatorType.Plus || token === OperatorType.Minus);
    if (hasAddOrSubtract) return addOrSubtract(tokens);
  }

  evaluateTokens(tokens);
  return Number(tokens[0]);
}
