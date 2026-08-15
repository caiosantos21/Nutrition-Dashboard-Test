import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Meal } from '../types/nutrition';
import { colors, radius, spacing, typography } from '../theme/theme';

interface MealCardProps {
  meal: Meal;
}

export const MealCard: React.FC<MealCardProps> = ({ meal }) => {
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
      <Text style={styles.kcal}>{meal.kcal} kcal</Text>
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
  kcal: {
    ...typography.mealKcal,
    color: colors.textPrimary,
  },
});
