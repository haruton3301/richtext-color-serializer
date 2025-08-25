import { useState, useEffect } from 'react';
import type { ColorMapping, TextSegment } from '../types';
import {
  parseRichTextFromClipboard,
  simulateClipboardData,
} from '../utils/clipboardParser';
import { serializeTextSegments } from '../utils/serializer';
import { handleClipboardError } from '../utils/errorHandling';
import { DEFAULT_COLOR, UI_TEXT } from '../constants';

interface TextProcessorProps {
  colorMappings: ColorMapping[];
}

export function TextProcessor({ colorMappings }: TextProcessorProps) {
  const [serializedText, setSerializedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSegments, setCurrentSegments] = useState<TextSegment[]>([]);

  // Re-serialize when color mappings change
  useEffect(() => {
    if (currentSegments.length > 0) {
      const serialized = serializeTextSegments(currentSegments, {
        colorMappings,
        defaultColor: DEFAULT_COLOR,
      });
      setSerializedText(serialized);
    }
  }, [colorMappings, currentSegments]);

  const handlePasteFromClipboard = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const parsedSegments = await parseRichTextFromClipboard();
      setCurrentSegments(parsedSegments);

      const serialized = serializeTextSegments(parsedSegments, {
        colorMappings,
        defaultColor: '#000000',
      });
      setSerializedText(serialized);
    } catch (err) {
      const appError = handleClipboardError(err);
      setError(appError.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestData = () => {
    const testHtml = `
      <span style="color: #000000;">This is normal text. </span>
      <span style="color: #d97706;">This is amber text. </span>
      <span style="color: #dc2626;">This is red text. </span>
      <span style="color: #000000;">Back to normal.</span>
    `;

    const parsedSegments = simulateClipboardData(testHtml);
    setCurrentSegments(parsedSegments);

    const serialized = serializeTextSegments(parsedSegments, {
      colorMappings,
      defaultColor: '#000000',
    });
    setSerializedText(serialized);
    setError(null);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(serializedText);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = serializedText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
        <h2 className="text-lg font-semibold text-orange-900 mb-4">
          {UI_TEXT.RICH_TEXT_PROCESSOR_TITLE}
        </h2>

        <div className="flex gap-3 mb-4">
          <button
            onClick={handlePasteFromClipboard}
            disabled={isLoading}
            className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
          >
{isLoading ? UI_TEXT.BUTTONS.PROCESSING : UI_TEXT.BUTTONS.PASTE_FROM_CLIPBOARD}
          </button>

          <button
            onClick={handleTestData}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors"
          >
{UI_TEXT.BUTTONS.LOAD_TEST_DATA}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 rounded-md text-red-700">
            {error}
          </div>
        )}
      </div>

      {serializedText && (
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-green-900">
              {UI_TEXT.SERIALIZED_OUTPUT_TITLE}
            </h3>
            <button
              onClick={copyToClipboard}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
{UI_TEXT.BUTTONS.COPY}
            </button>
          </div>
          <pre className="bg-white p-4 rounded border border-green-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
            {serializedText}
          </pre>
        </div>
      )}
    </div>
  );
}
