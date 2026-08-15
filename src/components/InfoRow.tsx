import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, radius, spacing, typography } from '../theme/theme';

interface InfoRowProps {
  title: string;
  subtitle?: string;
  rightText?: string;
  showChevron?: boolean;
  onPress?: () => void;
}

/**
 * Linha genérica em card branco: título + (subtítulo opcional) à esquerda,
 * valor/chevron à direita. Usada para itens de histórico, alimentos salvos
 * e opções de configuração — em vez de criar um card específico para cada aba.
 */
export const InfoRow: React.FC<InfoRowProps> = ({
  title,
  subtitle,
  rightText,
  showChevron,
  onPress,
}) => {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.textColumn}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.rightColumn}>
        {rightText && <Text style={styles.rightText}>{rightText}</Text>}
        {showChevron && <Text style={styles.chevron}>›</Text>}
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  textColumn: {
    flexShrink: 1,
  },
  title: {
    ...typography.mealTitle,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.mealSubItem,
    color: colors.textSecondary,
    marginTop: 2,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightText: {
    ...typography.mealKcal,
    color: colors.textSecondary,
  },
  chevron: {
    fontSize: 20,
    color: colors.textMuted,
    marginLeft: spacing.sm,
  },
});
