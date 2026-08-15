import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AppModal } from './AppModal';
import { FormField } from './FormField';
import { AppButton } from '../AppButton';
import { spacing } from '../../theme/theme';

interface AddMealModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (meal: { title: string; items: string[]; kcal: number }) => void;
}

export const AddMealModal: React.FC<AddMealModalProps> = ({ visible, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [itemsText, setItemsText] = useState('');
  const [kcal, setKcal] = useState('');

  const resetForm = () => {
    setTitle('');
    setItemsText('');
    setKcal('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const isValid = title.trim().length > 0 && Number(kcal) > 0;

  const handleSubmit = () => {
    if (!isValid) return;

    const items = itemsText
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    onSubmit({ title: title.trim(), items, kcal: Number(kcal) });
    resetForm();
    onClose();
  };

  return (
    <AppModal visible={visible} title="Add Meal" onClose={handleClose}>
      <FormField
        label="Meal name"
        placeholder="e.g. Grilled Chicken Salad"
        value={title}
        onChangeText={setTitle}
      />
      <FormField
        label="Ingredients (comma separated)"
        placeholder="e.g. Whole Wheat Bread, Olive Oil Dressing"
        value={itemsText}
        onChangeText={setItemsText}
      />
      <FormField
        label="Calories (kcal)"
        placeholder="e.g. 450"
        keyboardType="numeric"
        value={kcal}
        onChangeText={setKcal}
      />
      <AppButton
        label="Add Meal"
        variant="solid"
        onPress={handleSubmit}
        style={[styles.submitButton, !isValid && styles.disabled]}
      />
    </AppModal>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    marginTop: spacing.sm,
  },
  disabled: {
    opacity: 0.5,
  },
});
