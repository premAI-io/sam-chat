export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface PremAIError extends ApiError {
  details?: string;
  model?: string;
}

export const createApiError = (error: unknown, defaultMessage: string): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      code: error.name,
    };
  }
  
  if (typeof error === 'string') {
    return {
      message: error,
    };
  }
  
  if (error && typeof error === 'object' && 'message' in error) {
    return {
      message: String(error.message),
      code: 'code' in error ? String(error.code) : undefined,
    };
  }
  
  return {
    message: defaultMessage,
    code: 'UnknownError',
  };
}; 