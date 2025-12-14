import { TruncateDescriptionPipe } from './truncate-description.pipe';

describe('TruncateDescriptionPipe', () => {
  let pipe: TruncateDescriptionPipe;

  beforeEach(() => {
    pipe = new TruncateDescriptionPipe();
  });

  it('повинен створитися', () => {
    expect(pipe).toBeTruthy();
  });

  it('повинен повернути пусту строку для null', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('повинен повернути пусту строку для undefined', () => {
    expect(pipe.transform(undefined)).toBe('');
  });

  it('не повинен обрізати короткий текст', () => {
    const text = 'Short text';
    expect(pipe.transform(text, 50)).toBe('Short text');
  });

  it('повинен обрізати довгий текст з багаторядківкою', () => {
    const text = 'This is a very long description that should be truncated';
    const result = pipe.transform(text, 20);
    expect(result.length).toBeLessThanOrEqual(21);
    expect(result).toContain('…');
  });

  it('повинен використовувати default limit 100', () => {
    const text = 'a'.repeat(150);
    const result = pipe.transform(text);
    expect(result.length).toBeLessThanOrEqual(101);
  });

  it('повинен видалити trailing spaces перед truncation', () => {
    const text = 'This is a very long text with trailing spaces   ';
    const result = pipe.transform(text, 10);
    expect(result).not.toMatch(/\s+\.\.\.$/);
  });
});
