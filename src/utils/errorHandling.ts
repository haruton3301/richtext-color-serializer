import type { AppError } from '../types';
import { ERROR_MESSAGES } from '../constants';

export function createAppError(
  message: string,
  code?: string,
  cause?: unknown
): AppError {
  return { message, code, cause };
}

export function handleClipboardError(error: unknown): AppError {
  console.error('Clipboard error:', error);

  if (error instanceof DOMException) {
    if (error.name === 'NotAllowedError') {
      return createAppError(
        ERROR_MESSAGES.CLIPBOARD_ACCESS,
        'CLIPBOARD_NOT_ALLOWED',
        error
      );
    }
  }

  return createAppError(
    ERROR_MESSAGES.UNKNOWN_ERROR,
    'CLIPBOARD_UNKNOWN',
    error
  );
}

export function isAppError(error: unknown): error is AppError {
  return typeof error === 'object' && error !== null && 'message' in error;
}

export function getErrorMessage(error: unknown): string {
  if (isAppError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return ERROR_MESSAGES.UNKNOWN_ERROR;
}
