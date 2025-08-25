export interface ColorMapping {
  readonly id: string;
  readonly color: string;
  readonly tagName: string;
}

export interface TextSegment {
  readonly text: string;
  readonly color: string;
  readonly isDefault: boolean;
}

export interface SerializeOptions {
  readonly colorMappings: readonly ColorMapping[];
  readonly defaultColor: string;
}

// Utility types
export type ColorMappingFormHandler = (mapping: ColorMapping) => void;
export type ColorMappingRemoveHandler = (id: string) => void;

// Error types
export interface AppError {
  message: string;
  code?: string;
  cause?: unknown;
}

export type ValidationResult =
  | {
      isValid: true;
    }
  | {
      isValid: false;
      error: string;
    };
