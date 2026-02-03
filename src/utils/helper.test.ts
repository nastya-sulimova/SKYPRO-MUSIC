import { FormatTime } from './helper';

describe('FormatTime', () => {
  it('Добавление нуля, если секунд < 10', () => {
    expect(FormatTime(61)).toBe('1:01');
  });
  it('Форматирует время < 1 минуты', () => {
    expect(FormatTime(35)).toBe('0:35');
  });
  it('Обрабатывает 0 секунд', () => {
    expect(FormatTime(0)).toBe('0:00');
  });
});
