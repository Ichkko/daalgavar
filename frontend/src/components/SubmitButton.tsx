export function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return <button className="submit-button" type="submit" disabled={isSubmitting}>
    {isSubmitting ? 'Илгээж байна…' : 'Санал хүсэлт илгээх'} <span aria-hidden="true">↗</span>
  </button>;
}

