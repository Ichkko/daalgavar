import { useState, type FormEvent } from 'react';
import { useFeedback } from '../hooks/useFeedback';
import { feedbackSchema, validateFile } from '../schemas/feedbackSchema';
import type { FeedbackErrors, FeedbackInput } from '../types/feedback';
import { FileUpload } from './FileUpload';
import { FormField } from './FormField';
import { SubmitButton } from './SubmitButton';

const empty: FeedbackInput = { name: '', email: '', message: '', website: '' };
export function FeedbackForm() {
  const [values, setValues] = useState<FeedbackInput>(empty);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<FeedbackErrors>({});
  const [uploadKey, setUploadKey] = useState(0);
  const { submit, isSubmitting, error, result } = useFeedback();
  function update(key: keyof FeedbackInput, value: string) {
    setValues(previous => ({ ...previous, [key]: value }));
    setErrors(previous => ({ ...previous, [key]: undefined }));
  }
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = feedbackSchema.safeParse(values);
    const nextErrors: FeedbackErrors = {};
    if (!parsed.success) for (const issue of parsed.error.issues) nextErrors[issue.path[0] as keyof FeedbackInput] = issue.message;
    const fileError = validateFile(file);
    if (fileError) nextErrors.file = fileError;
    setErrors(nextErrors);
    if (!parsed.success || fileError) {
      form.querySelector<HTMLElement>('[name="' + Object.keys(nextErrors)[0] + '"]')?.focus();
      return;
    }
    if (await submit(parsed.data, file)) {
      setValues(empty); setFile(null); setUploadKey(previous => previous + 1);
    }
  }
  return <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
    <div className="form-heading"><span className="eyebrow">БИД ТАНЫГ СОНСОЖ БАЙНА</span><h2>Санал хүсэлт илгээх</h2><p>Доорх мэдээллийг бөглөн бидэнтэй хуваалцаарай.</p></div>
    {result && <div className="notice success" role="status">Баярлалаа! Таны санал хүсэлтийг хүлээн авлаа. Бүртгэлийн дугаар: #{result.id}</div>}
    {error && <div className="notice failure" role="alert">{error}</div>}
    {Object.values(errors).some(Boolean) && <p className="field-error" role="alert">Тэмдэглэсэн талбаруудыг шалгана уу.</p>}
    <fieldset disabled={isSubmitting}>
      <legend className="sr-only">Санал хүсэлтийн мэдээлэл</legend>
      <div className="field-row">
        <FormField id="name" label="Таны нэр" error={errors.name}><input id="name" name="name" autoComplete="name" required maxLength={120} placeholder="Нэрээ оруулна уу" value={values.name} onChange={e => update('name', e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} /></FormField>
        <FormField id="email" label="И-мэйл хаяг" error={errors.email}><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="name@example.com" value={values.email} onChange={e => update('email', e.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} /></FormField>
      </div>
      <FormField id="message" label="Санал хүсэлт" error={errors.message} hint={values.message.length.toLocaleString() + ' / 10,000 тэмдэгт'}><textarea id="message" name="message" required maxLength={10000} rows={6} placeholder="Бид юуг сайжруулах боломжтой вэ?" value={values.message} onChange={e => update('message', e.target.value)} aria-invalid={Boolean(errors.message)} aria-describedby={'message-hint' + (errors.message ? ' message-error' : '')} /></FormField>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" autoComplete="off" tabIndex={-1} maxLength={200} value={values.website} onChange={e => update('website', e.target.value)} /></div>
      <FileUpload key={uploadKey} file={file} error={errors.file} onChange={next => { setFile(next); setErrors(previous => ({ ...previous, file: validateFile(next) })); }} />
      <div className="form-footer"><p>* тэмдэгтэй талбаруудыг заавал бөглөнө үү.</p><SubmitButton isSubmitting={isSubmitting} /></div>
    </fieldset>
  </form>;
}

