import { useRef } from 'react';
import { ACCEPTED_FILE_TYPES } from '../schemas/feedbackSchema';
interface Props { file: File | null; error?: string; onChange: (file: File | null) => void }
export function FileUpload({ file, error, onChange }: Props) {
  const input = useRef<HTMLInputElement>(null);
  return <div className="field">
    <label htmlFor="file">Хавсралт <span className="optional">Заавал биш</span></label>
    <div className="upload-box">
      <span className="upload-icon" aria-hidden="true">↑</span>
      <div><strong>Нэмэлт мэдээлэл хавсаргах</strong><p id="file-hint">JPG, PNG, PDF, TXT · 5 MB хүртэл</p></div>
      <input ref={input} id="file" name="file" type="file" accept={ACCEPTED_FILE_TYPES.join(',')} aria-invalid={Boolean(error)} aria-describedby={'file-hint' + (error ? ' file-error' : '')} onChange={event => onChange(event.target.files?.[0] ?? null)} />
    </div>
    {file && <div className="file-selection"><span>{file.name} · {(file.size / 1024).toFixed(1)} KB</span><button type="button" onClick={() => { if (input.current) input.current.value = ''; onChange(null); }}>Арилгах</button></div>}
    {error && <small className="field-error" id="file-error">{error}</small>}
  </div>;
}

