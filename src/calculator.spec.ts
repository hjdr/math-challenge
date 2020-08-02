import calculator from './calculator'

describe('calculator()', () => {
  it('SHOULD be a function', () => {
    expect(calculator).toEqual(expect.any(Function))
  });

  it('SHOULD return a number', () => {
    expect(typeof calculator('3+3')).toBe('number')
  });

  describe('WHEN given an expression with one + operator', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('3+3')).toBe(6)
    });
  });

  describe('WHEN given an expression with > one digit integers', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('373+2072')).toBe(2445)
    });
  });

  describe('WHEN given an expression with two + operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('3+3+3')).toBe(9)
    });
  });

  describe('WHEN given an expression with multiple + operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('3+3+3+3+3+3+3')).toBe(21)
    });
  });

  describe('WHEN given an expression with one - operator', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('9-4')).toBe(5)
    });
  });

  describe('WHEN given an expression with multiple - operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('9-2-2-2')).toBe(3)
    });
  });

  describe('WHEN given an expression with - and + operators', () => {
    it('SHOULD return the result of the expression following left associativity', () => {
      expect(calculator('9-2-3+2+2')).toBe(8)
    });
  });

  describe('WHEN given an expression with multiple * operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('8*8*8*8')).toBe(4096)
    });
  });

  describe('WHEN given an expression with + and * operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('8+8*8')).toBe(72)
    });
  });

  describe('WHEN given an expression with * and + operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('8+8*8')).toBe(72)
    });
  });

  describe('WHEN given an expression multiple * and + operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('8+8*8+8*8+8+8')).toBe(152)
    });
  });
});
