
export default function calculator(expression: string) {
  let tokens: Array<string> = expression.split('')
  let loopBreaker = 0

  enum TokenType {
    Multiply = '*',
    Plus = '+',
  }

  while (tokens.length > 1 && loopBreaker < 30) {
    console.log('start', tokens)
    addition();
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

  function multiply(){
    executeExpression(TokenType.Multiply);
  }

  function executeExpression(tokenType: string) {
    for (const [index, token] of tokens.entries()) {
      const previousToken = Number(tokens[index - 1]);
      const nextToken = Number(tokens[index + 1]);
      if (token === TokenType.Plus && tokenType === TokenType.Plus) {
        const sum = previousToken + nextToken
        tokens.splice(index -1, 3, String(sum))
        break;
      }
      if (token === TokenType.Multiply && tokenType === TokenType.Multiply) {
        const sum = previousToken * nextToken
        tokens.splice(index -1, 3, String(sum))
        break;
      }
    }
  }

  return Number(tokens[0]);
}