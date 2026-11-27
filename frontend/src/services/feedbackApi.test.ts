import { afterEach, describe, expect, it, vi } from 'vitest';
import { submitFeedback } from './feedbackApi';
const input = { name: 'Бат', email: 'bat@example.com', message: 'Санал', website: '' };
afterEach(() => vi.unstubAllGlobals());
describe('feedback API contract', () => {
  it('sends JSON feedback and an optional file as multipart without overriding the boundary', async () => {
    const result = { id: 1, status: 'received', createdAt: '2026-11-27T00:00:00Z' };
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(result), { status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    const file = new File(['hello'], 'note.txt', { type: 'text/plain' });
    expect(await submitFeedback(input, file)).toEqual(result);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/feedback');
    expect(options.method).toBe('POST');
    expect(options.headers).toBeUndefined();
    expect(options.body.get('file').name).toBe('note.txt');
    const feedback = options.body.get('feedback') as Blob;
    expect(feedback.type).toBe('application/json');
    expect(JSON.parse(await feedback.text())).toEqual(input);
  });
  it('omits the file part if absent', async () => {
    const mock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ id: 2, status: 'received', createdAt: 'now' })));
    vi.stubGlobal('fetch', mock);
    await submitFeedback(input, null);
    expect(mock.mock.calls[0][1].body.has('file')).toBe(false);
  });
  it.each([429, 413, 500])('handles HTTP %s', async status => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('failure', { status })));
    await expect(submitFeedback(input, null)).rejects.toThrow();
  });
  it('preserves backend validation errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: 'Файл буруу.' }), { status: 400 })));
    await expect(submitFeedback(input, null)).rejects.toThrow('Файл буруу.');
  });
  it('handles network errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    await expect(submitFeedback(input, null)).rejects.toThrow('Сервертэй холбогдож чадсангүй.');
  });
});

