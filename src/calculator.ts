
export default function calculator(expression: string) {
  let tokens: Array<string> = expression.split(/([-+*/()])/);
  let loopBreaker = 0

  enum OperatorType {
    Divide = '/',
    LeftParentheses = '(',
    Minus = '-',
    Multiply = '*',
    Plus = '+',
    RightParentheses = ')',
  }

  // function evaluateTokens(tokens: Array<string>) {
  //
  // }

  while (tokens.length > 1 && loopBreaker < 30) {
    console.log('start', tokens)
    scanTokens();
    loopBreaker += 1;
    console.log('finish', tokens)
  }

  function add() {
    if (tokens.includes(OperatorType.Divide && OperatorType.Multiply)) return divideOrMultiply();
    executeExpression(OperatorType.Plus);
  }

  function divide() {
    if (tokens.includes(OperatorType.LeftParentheses)) return group;
    executeExpression(OperatorType.Divide);
  }

  function divideOrMultiply() {
    const operator = getFirstOccurringOperator(OperatorType.Divide, OperatorType.Multiply);
    if (operator === OperatorType.Divide) return divide();
    return multiply();
  }

  function execute(leftOperand: number, operator: string, rightOperand: number) {
    if (operator === OperatorType.Divide) return leftOperand / rightOperand;
    if (operator === OperatorType.Minus) return leftOperand - rightOperand;
    if (operator === OperatorType.Multiply) return leftOperand * rightOperand;
    if (operator === OperatorType.Plus) return leftOperand + rightOperand;
  }

  function executeExpression(operator: string) {
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

  function getFirstOccurringOperator(firstOperator: string, secondOperator: string) {
    const firstOperatorIndex = tokens.indexOf(firstOperator);
    const secondOperatorIndex = tokens.indexOf(secondOperator);
    if (firstOperatorIndex === -1 || firstOperatorIndex < secondOperatorIndex) return secondOperator;
    return firstOperator;
  }

  function group() {
    return;
  }

  function multiply(){
    if (tokens.includes(OperatorType.LeftParentheses)) return group();
    executeExpression(OperatorType.Multiply);
  }

  function scanTokens(){
    for (const token of tokens) {
      if (token === OperatorType.Minus) {
        subtract();
        break;
      }
      if (token === OperatorType.Plus) {
        add();
        break;
      }
      if (token === OperatorType.Multiply) {
        multiply();
        break;
      }
      if (token === OperatorType.Divide) {
        divide();
        break;
      }
      if (token === OperatorType.LeftParentheses) {
        group();
        break;
      }
    }
  }

  function subtract() {
    if (tokens.includes(OperatorType.Divide && OperatorType.Multiply)) return divideOrMultiply();
    executeExpression(OperatorType.Minus);
  }

  return Number(tokens[0]);
}
