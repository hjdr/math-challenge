
export default function calculator(expression: string) {
  let tokens: Array<string> = expression.split(/([-+*/()])/)
  let loopBreaker = 0

  enum TokenType {
    Minus = '-',
    Multiply = '*',
    Plus = '+',
  }

  while (tokens.length > 1 && loopBreaker < 30) {
    console.log('start', tokens)
    scanTokens()
    loopBreaker += 1;
    console.log('finish', tokens)
  }

  function addition() {
    if (tokens.includes(TokenType.Multiply)) {
      multiply();
      return;
    }
    executeExpression(TokenType.Plus);
  }

  function execute(previousToken: number, nextToken: number, tokenType: string) {
    if (tokenType === TokenType.Minus) return previousToken - nextToken;
    if (tokenType === TokenType.Plus) return previousToken + nextToken;
    if (tokenType === TokenType.Multiply) return previousToken * nextToken;
  }

  function executeExpression(tokenType: string) {
    for (const [index, token] of tokens.entries()) {
      const previousToken = Number(tokens[index - 1]);
      const nextToken = Number(tokens[index + 1]);

      if (token === tokenType) {
        const sum = execute(previousToken, nextToken, tokenType);
        tokens.splice(index -1, 3, String(sum))
        break;
      }
    }
  }

  function multiply(){
    executeExpression(TokenType.Multiply);
  }

  function scanTokens(){
    for (const token of tokens) {
      if (token === TokenType.Minus) {
        subtraction();
        break;
      }
      if (token === TokenType.Plus) {
        addition();
        break;
      }
      if (token === TokenType.Multiply) {
        multiply();
        break;
      }
    }
  }

  function subtraction() {
    if (tokens.includes(TokenType.Multiply)) {
      multiply();
      return;
    }
    executeExpression(TokenType.Minus);
  }

  return Number(tokens[0]);
}