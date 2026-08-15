import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Meal } from '../types/nutrition';
import { colors, radius, spacing, typography } from '../theme/theme';
import { confirmDelete } from '../utils/confirmDelete';

interface MealCardProps {
  meal: Meal;
  onDelete?: (id: string) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, onDelete }) => {
  const handleDelete = () => {
    if (onDelete) {
      confirmDelete(meal.title, () => onDelete(meal.id));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{meal.title}</Text>
        {meal.items.map((item) => (
          <Text key={item} style={styles.item}>
            {item}
          </Text>
        ))}
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.kcal}>{meal.kcal} kcal</Text>
        {onDelete && (
          <TouchableOpacity onPress={handleDelete} hitSlop={8} style={styles.deleteButton}>
            <Text style={styles.deleteIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  textColumn: {
    flexShrink: 1,
  },
  title: {
    ...typography.mealTitle,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  item: {
    ...typography.mealSubItem,
    color: colors.textSecondary,
  },
  rightColumn: {
    alignItems: 'flex-end',
  },
  kcal: {
    ...typography.mealKcal,
    color: colors.textPrimary,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
  deleteIcon: {
    fontSize: 14,
    color: colors.textMuted,
  },
});
