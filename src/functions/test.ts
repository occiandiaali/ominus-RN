import currencyFormat from './currencyFormat';
import {timeAgo} from './timeAndDateFormatting';

describe('currencyFormat tests', () => {
  it('should return formatted currency string', () => {
    expect(currencyFormat(8000, 'NGN', 'en-NG')).toBe('₦8,000.00');
  });
});

describe('timeAndDateFormatting tests', () => {
  it('should display how long ago post was created string', () => {
    expect(timeAgo(456000)).toBe('19528 d');
  });
});
