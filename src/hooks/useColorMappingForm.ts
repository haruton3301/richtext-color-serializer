import { useState } from 'react';
import type { ColorMapping, ColorMappingFormHandler } from '../types';
import { generateColorMappingId } from '../utils/serializer';
import { validateColorMapping } from '../utils/validation';

interface UseColorMappingFormProps {
  onAdd: ColorMappingFormHandler;
}

export function useColorMappingForm({ onAdd }: UseColorMappingFormProps) {
  const [color, setColor] = useState('');
  const [tagName, setTagName] = useState('');

  const resetForm = () => {
    setColor('');
    setTagName('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateColorMapping(color, tagName);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    const newMapping: ColorMapping = {
      id: generateColorMappingId(),
      color: color.toLowerCase(),
      tagName: tagName.trim(),
    };

    onAdd(newMapping);
    resetForm();
  };

  return {
    color,
    setColor,
    tagName,
    setTagName,
    handleSubmit,
  };
}
