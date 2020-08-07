
export default function calculator(expression: string) {
  let tokens: Array<string> = expression.split(/([-+*/()])/).filter(value => value !== '');
  console.log(tokens)
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
      console.log('start', tokens)
      scanTokens(tokens);
      loopBreaker += 1;
      // console.log('finish', tokens)
    }
  }

  function add(tokens: Array<string>) {
    if (tokens.some(token => {
      // create check higher priority
      return token === OperatorType.Divide || token === OperatorType.Multiply;
    })) return divideOrMultiply(tokens);
    executeExpression(OperatorType.Plus, tokens);
  }

  function divide(tokens: Array<string>) {
    if (tokens.includes(OperatorType.LeftParentheses)) return group(tokens);
    executeExpression(OperatorType.Divide, tokens);
  }

  function divideOrMultiply(tokens: Array<string>) {
    const operator = getFirstOccurringOperator(OperatorType.Divide, OperatorType.Multiply, tokens);
    if (operator === OperatorType.Divide) return divide(tokens);
    return multiply(tokens);
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
        tokens.splice(index -1, 3, String(sum));
        break;
      }
    }
  }

  function getFirstOccurringOperator(
    firstOperator: string,
    secondOperator: string,
    tokens: Array<string>
  ) {
    const firstOperatorIndex = tokens.indexOf(firstOperator);
    const secondOperatorIndex = tokens.indexOf(secondOperator);
    if (firstOperatorIndex === -1 || firstOperatorIndex < secondOperatorIndex) return secondOperator;
    return firstOperator;
  }

  function group(tokens: Array<string>) {
    // console.log('groupTokes', tokens)
    const leftParenthesesIndex = tokens.indexOf(OperatorType.LeftParentheses);
    const rightParenthesesIndex = tokens.indexOf(OperatorType.RightParentheses);
    // console.log(leftParenthesesIndex)
    // console.log(rightParenthesesIndex)

    const isNestedGroup = tokens.slice(rightParenthesesIndex + 1)
      .indexOf(OperatorType.RightParentheses) !== 1


    if (isNestedGroup) {
      const innerMostLeftParenthesesIndex = tokens.lastIndexOf(OperatorType.LeftParentheses);
      const nestedGroup = tokens.slice(innerMostLeftParenthesesIndex + 1, rightParenthesesIndex);
      // console.log('group', group)
      // console.log('nestedGroup', nestedGroup)
      const nestedGroupLength = rightParenthesesIndex - innerMostLeftParenthesesIndex;
      evaluateTokens(nestedGroup);
      tokens.splice(innerMostLeftParenthesesIndex, nestedGroupLength + 1, String(nestedGroup));
      // console.log('toks', tokens)
    } else {
      // console.log('else')
      const group = tokens.slice(leftParenthesesIndex + 1, rightParenthesesIndex);
      const groupLength = rightParenthesesIndex - leftParenthesesIndex;
      evaluateTokens(group);
      tokens.splice(leftParenthesesIndex, groupLength + 1, String(group));
    }
  }

  function multiply(tokens: Array<string>){
    if (tokens.includes(OperatorType.LeftParentheses)) return group(tokens);
    executeExpression(OperatorType.Multiply, tokens);
  }

  function scanTokens(tokens: Array<string>){
    for (const token of tokens) {
      if (token === OperatorType.Minus) {
        subtract(tokens);
        break;
      }
      if (token === OperatorType.Plus) {
        add(tokens);
        break;
      }
      if (token === OperatorType.Multiply) {
        multiply(tokens);
        break;
      }
      if (token === OperatorType.Divide) {
        divide(tokens);
        break;
      }
      if (token === OperatorType.LeftParentheses) {
        group(tokens);
        break;
      }
    }
  }

  function subtract(tokens: Array<string>) {
    if (tokens.some(token => {
      return token === OperatorType.Divide || token === OperatorType.Multiply;
    })) return divideOrMultiply(tokens);
    executeExpression(OperatorType.Minus, tokens);
  }
  evaluateTokens(tokens);
  return Number(tokens[0]);
}
