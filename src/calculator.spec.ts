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

  describe('WHEN given an expression multiple *, + and - operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('16+44*2-9*3')).toBe(77)
    });
  });

  describe('WHEN given an expression multiple / operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('16/2/2')).toBe(4)
    });
  });

  describe('WHEN given an expression multiple *, +, / and - operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('100/10+1*3-13')).toBe(0)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('6/3-1')).toBe(1)
    });
  });

  describe('WHEN given an expression with ( and ) operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('4*10+(3-1)')).toBe(42)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('4*10+(60-1*3*5)/5')).toBe(49)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('(14+5)*7')).toBe(133)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('4+(3+8)')).toBe(15)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('(3+8)')).toBe(11)
    });
  });

  describe('WHEN given an expression with two sets of ( and ) operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('(10/2)+3+(8-4)')).toBe(12)
    });
  });

  describe('WHEN given an expression with nested ( and ) operators', () => {
    it('SHOULD return the result of the expression', () => {
      expect(calculator('4+10+(3+(1*8))')).toBe(25)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('4+10+(3+(1*(2*8)))')).toBe(33)
    });
    it('SHOULD return the result of the expression', () => {
      expect(calculator('(10-8)+4+10+(3+(1*8))')).toBe(27)
    });
  });
});
