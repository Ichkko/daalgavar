import { describe, expect, it } from 'vitest';
import { feedbackSchema, MAX_FILE_SIZE, validateFile } from './feedbackSchema';
const valid = { name: ' Бат ', email: 'bat@example.com', message: ' Санал хүсэлт ', website: '' };
describe('feedback validation', () => {
  it('trims required fields', () => { expect(feedbackSchema.parse(valid).name).toBe('Бат'); });
  it.each([{ name: ' ' }, { email: 'invalid' }, { message: ' ' }, { name: 'x'.repeat(121) }, { message: 'x'.repeat(10001) }])('rejects invalid values %j', change => { expect(feedbackSchema.safeParse({ ...valid, ...change }).success).toBe(false); });
  it('allows no attachment and the exact file limit', () => {
    expect(validateFile(null)).toBeUndefined();
    expect(validateFile(new File([new Uint8Array(MAX_FILE_SIZE)], 'test.pdf', { type: 'application/pdf' }))).toBeUndefined();
  });
  it('rejects empty, oversized and unsupported files', () => {
    expect(validateFile(new File([], 'test.txt', { type: 'text/plain' }))).toBeTruthy();
    expect(validateFile(new File([new Uint8Array(MAX_FILE_SIZE + 1)], 'test.pdf', { type: 'application/pdf' }))).toBeTruthy();
    expect(validateFile(new File(['test'], 'test.html', { type: 'text/html' }))).toBeTruthy();
  });
});

