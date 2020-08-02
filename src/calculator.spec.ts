import calculator from './calculator'

describe('calculator()', () => {
  it('SHOULD be a function', () => {
    expect(calculator).toEqual(expect.any(Function))
  });

  it('SHOULD return a number', () => {
    expect(typeof calculator('3+3')).toBe('number')
  });

  describe('WHEN given an expression with one + operator', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('3+3')).toBe(6)
    });
  });

  describe('WHEN given an expression with two + operators', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('3+3+3')).toBe(9)
    });
  });

  describe('WHEN given an expression with multiple + operators', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('3+3+3+3+3+3+3')).toBe(21)
    });
  });

  describe('WHEN given an expression with multiple * operators', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('8*8*8*8')).toBe(4096)
    });
  });

  describe('WHEN given an expression with + and * operators', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('8+8*8')).toBe(72)
    });
  });

  describe('WHEN given an expression with * and + operators', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('8+8*8')).toBe(72)
    });
  });

  describe('WHEN given an expression multiple * and + operators', () => {
    it('SHOULD return the result of the addition', () => {
      expect(calculator('8+8*8+8*8+8+8')).toBe(152)
    });
  });
});
