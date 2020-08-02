
export default function calculator(expression: string) {
  let tokens: Array<string> = expression.split('')
  let result = 0
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
    for (const [index, token] of tokens.entries()) {
      const previousToken = Number(tokens[index - 1]);
      const nextToken = Number(tokens[index + 1]);

      if (tokens.includes(TokenType.Multiply)) {
        multiply();
        break
      } else if (token === TokenType.Plus) {
        const sum = previousToken + nextToken
        tokens.splice(0, index + 2, String(sum))
        break;
      }
    }
  }

  function multiply(){
    for (const [index, token] of tokens.entries()) {
      const previousToken = Number(tokens[index - 1]);
      const nextToken = Number(tokens[index + 1]);
      if (token === TokenType.Multiply) {
        const sum = previousToken * nextToken
        tokens.splice(index -1, 3, String(sum))
      }
    }
  }

  return Number(tokens[0]);
}