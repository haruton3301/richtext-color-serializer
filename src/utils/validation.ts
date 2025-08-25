import type { ValidationResult } from '../types';
import { isValidHexColor } from './colorUtils';
import { VALIDATION_MESSAGES } from '../constants';

export function validateColorInput(color: string): ValidationResult {
  if (!isValidHexColor(color)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_HEX_COLOR,
    };
  }
  return { isValid: true };
}

export function validateTagName(tagName: string): ValidationResult {
  const trimmed = tagName.trim();

  if (!trimmed) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.EMPTY_TAG_NAME,
    };
  }

  if (!/^[a-zA-Z][a-zA-Z0-9-]*$/.test(trimmed)) {
    return {
      isValid: false,
      error: VALIDATION_MESSAGES.INVALID_TAG_NAME,
    };
  }

  return { isValid: true };
}

export function validateColorMapping(
  color: string,
  tagName: string
): ValidationResult {
  const colorValidation = validateColorInput(color);
  if (!colorValidation.isValid) {
    return colorValidation;
  }

  const tagValidation = validateTagName(tagName);
  if (!tagValidation.isValid) {
    return tagValidation;
  }

  return { isValid: true };
}
