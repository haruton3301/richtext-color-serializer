import type { TextSegment } from '../types';
import { normalizeColor } from './colorUtils';

export async function parseRichTextFromClipboard(): Promise<TextSegment[]> {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const item of clipboardItems) {
      if (item.types.includes('text/html')) {
        const htmlBlob = await item.getType('text/html');
        const htmlText = await htmlBlob.text();
        return parseHtmlToSegments(htmlText);
      }
    }

    const plainText = await navigator.clipboard.readText();
    return [{ text: plainText, color: '#000000', isDefault: true }];
  } catch (error) {
    console.error('Failed to read clipboard:', error);
    throw new Error(
      'Unable to access clipboard. Please ensure you have granted clipboard permissions.'
    );
  }
}

function parseHtmlToSegments(html: string): TextSegment[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const segments: TextSegment[] = [];

  function extractColorFromElement(element: Element): string | null {
    // Check inline style first
    const inlineColor = (element as HTMLElement).style?.color;
    if (inlineColor) {
      try {
        return normalizeColor(inlineColor);
      } catch {
        // Continue to other methods if normalization fails
      }
    }

    // Check style attribute
    const styleAttr = element.getAttribute('style');
    if (styleAttr) {
      const colorMatch = styleAttr.match(/color\s*:\s*([^;]+)/i);
      if (colorMatch) {
        try {
          return normalizeColor(colorMatch[1].trim());
        } catch {
          // Continue if normalization fails
        }
      }
    }

    // Check for common color attributes
    const colorAttr = element.getAttribute('color');
    if (colorAttr) {
      try {
        return normalizeColor(colorAttr);
      } catch {
        // Continue if normalization fails
      }
    }

    return null;
  }

  function traverseNode(node: Node, inheritedColor = '#000000') {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (text) {
        segments.push({
          text: text,
          color: inheritedColor,
          isDefault: inheritedColor === '#000000',
        });
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const elementColor = extractColorFromElement(element);
      const currentColor = elementColor ?? inheritedColor;

      // Handle line breaks explicitly
      if (element.tagName.toLowerCase() === 'br') {
        segments.push({
          text: '\n',
          color: inheritedColor,
          isDefault: inheritedColor === '#000000',
        });
      }

      for (const child of Array.from(node.childNodes)) {
        traverseNode(child, currentColor);
      }
    }
  }

  traverseNode(doc.body);
  return segments.filter((segment) => segment.text.length > 0);
}

export function simulateClipboardData(htmlContent: string): TextSegment[] {
  return parseHtmlToSegments(htmlContent);
}
