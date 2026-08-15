import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppModal } from './AppModal';
import { colors, radius, spacing, typography } from '../../theme/theme';

interface SelectModalProps {
  visible: boolean;
  title: string;
  options: string[];
  selected: string;
  onClose: () => void;
  onSelect: (option: string) => void;
}

/**
 * Modal genérico de escolha única. Hoje é usado só para "Units",
 * mas serve para qualquer seletor futuro sem precisar de um modal novo.
 */
export const SelectModal: React.FC<SelectModalProps> = ({
  visible,
  title,
  options,
  selected,
  onClose,
  onSelect,
}) => {
  return (
    <AppModal visible={visible} title={title} onClose={onClose}>
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <TouchableOpacity
            key={option}
            style={[styles.option, isSelected && styles.optionSelected]}
            onPress={() => {
              onSelect(option);
              onClose();
            }}
          >
            <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
              {option}
            </Text>
            {isSelected && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        );
      })}
    </AppModal>
  );
};

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  optionSelected: {
    borderColor: colors.primaryGreen,
    backgroundColor: colors.headerBackground,
  },
  optionLabel: {
    ...typography.mealTitle,
    color: colors.textPrimary,
  },
  optionLabelSelected: {
    color: colors.primaryGreenDark,
  },
  checkmark: {
    color: colors.primaryGreen,
    fontWeight: '700',
  },
});
