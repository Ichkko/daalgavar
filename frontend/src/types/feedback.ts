export interface FeedbackInput { name: string; email: string; message: string; website: string }
export interface FeedbackResponse { id: number; status: string; createdAt: string }
export type FeedbackErrors = Partial<Record<keyof FeedbackInput | 'file', string>>;

