import { useRef, useState } from 'react';
import { submitFeedback } from '../services/feedbackApi';
import type { FeedbackInput, FeedbackResponse } from '../types/feedback';
export function useFeedback() {
  const inFlight = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<FeedbackResponse | null>(null);
  async function submit(values: FeedbackInput, file: File | null) {
    if (inFlight.current) return false;
    inFlight.current = true;
    setIsSubmitting(true); setError(null); setResult(null);
    try {
      setResult(await submitFeedback(values, file));
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Алдаа гарлаа. Дахин оролдоно уу.');
      return false;
    } finally {
      inFlight.current = false; setIsSubmitting(false);
    }
  }
  return { submit, isSubmitting, error, result };
}

