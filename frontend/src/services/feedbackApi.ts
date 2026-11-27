import type { FeedbackInput, FeedbackResponse } from '../types/feedback';
export async function submitFeedback(feedback: FeedbackInput, file: File | null): Promise<FeedbackResponse> {
  const body = new FormData();
  body.append('feedback', new Blob([JSON.stringify(feedback)], { type: 'application/json' }));
  if (file) body.append('file', file);
  const baseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
  let response: Response;
  try {
    response = await fetch(baseUrl + '/feedback', { method: 'POST', body, signal: AbortSignal.timeout(30000) });
  } catch {
    throw new Error('Сервертэй холбогдож чадсангүй. Илгээлт бүртгэгдсэн байж болзошгүй тул дахин илгээхээс өмнө холболтоо шалгана уу.');
  }
  if (!response.ok) {
    if (response.status === 429) throw new Error('Хэт олон хүсэлт илгээлээ. Нэг минутын дараа дахин оролдоно уу.');
    if (response.status === 413) throw new Error('Хавсралтын хэмжээ хэт их байна. 5 MB хүртэл файл сонгоно уу.');
    const data = await response.json().catch(() => null);
    throw new Error(typeof data?.error === 'string' ? data.error : 'Санал хүсэлт илгээж чадсангүй. Дахин оролдоно уу.');
  }
  const data: unknown = await response.json();
  if (!data || typeof data !== 'object' || !('id' in data) || typeof data.id !== 'number' || !('status' in data) || typeof data.status !== 'string' || !('createdAt' in data) || typeof data.createdAt !== 'string') {
    throw new Error('Серверийн хариу танигдсангүй. Дахин илгээхээс өмнө хүсэлт бүртгэгдсэн эсэхийг шалгана уу.');
  }
  return { id: data.id, status: data.status, createdAt: data.createdAt };
}

