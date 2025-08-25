import type { TextSegment, SerializeOptions } from '../types';
import { colorsMatch } from './colorUtils';

export function serializeTextSegments(
  segments: TextSegment[],
  options: SerializeOptions
): string {
  const { colorMappings, defaultColor } = options;

  return segments
    .map((segment) => {
      if (colorsMatch(segment.color, defaultColor)) {
        return segment.text;
      }

      const mapping = colorMappings.find((m) =>
        colorsMatch(m.color, segment.color)
      );
      if (mapping) {
        return `<${mapping.tagName}>${segment.text}</${mapping.tagName}>`;
      }

      return `<color="${segment.color}">${segment.text}</color>`;
    })
    .join('');
}

export function generateColorMappingId(): string {
  return `mapping_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
