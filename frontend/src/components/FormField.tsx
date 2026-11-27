import type { ReactNode } from 'react';
interface Props { id: string; label: string; error?: string; hint?: string; children: ReactNode }
export function FormField({ id, label, error, hint, children }: Props) {
  return <div className="field">
    <label htmlFor={id}>{label} <span aria-hidden="true">*</span></label>
    {children}
    {hint && <small id={id + '-hint'}>{hint}</small>}
    {error && <small className="field-error" id={id + '-error'}>{error}</small>}
  </div>;
}

