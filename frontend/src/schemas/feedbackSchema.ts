import { z } from 'zod';
export const feedbackSchema = z.object({
  name: z.string().trim().min(1, 'Нэрээ оруулна уу.').max(120, 'Нэр 120 тэмдэгтээс хэтрэхгүй байна.'),
  email: z.string().trim().min(1, 'И-мэйлээ оруулна уу.').email('Зөв и-мэйл хаяг оруулна уу.').max(254, 'И-мэйл хэт урт байна.'),
  message: z.string().trim().min(1, 'Санал хүсэлтээ бичнэ үү.').max(10000, 'Санал хүсэлт 10,000 тэмдэгтээс хэтрэхгүй байна.'),
  website: z.string().max(200),
});
export const MAX_FILE_SIZE = 5 * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'text/plain'];
export function validateFile(file: File | null): string | undefined {
  if (!file) return;
  if (file.size === 0) return 'Хоосон файл хавсаргах боломжгүй.';
  if (file.size > MAX_FILE_SIZE) return 'Файлын хэмжээ 5 MB-аас хэтрэхгүй байна.';
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) return 'JPG, PNG, PDF эсвэл TXT файл сонгоно уу.';
}

