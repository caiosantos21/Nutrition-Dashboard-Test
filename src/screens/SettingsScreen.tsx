import React, { useState } from 'react';
import { InfoRow } from '../components/InfoRow';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { EditGoalModal } from '../components/modals/EditGoalModal';
import { SelectModal } from '../components/modals/SelectModal';
import { AboutModal } from '../components/modals/AboutModal';
import { useAppData } from '../context/AppDataContext';
import { AppSettings } from '../types/nutrition';

type GoalKey = keyof Omit<AppSettings, 'units'>;

interface GoalRowConfig {
  key: GoalKey;
  label: string;
  unit: string;
}

const GOAL_ROWS: GoalRowConfig[] = [
  { key: 'dailyCalorieGoal', label: 'Daily Calorie Goal', unit: 'kcal' },
  { key: 'proteinGoal', label: 'Protein Goal', unit: 'g' },
  { key: 'carbsGoal', label: 'Carbs Goal', unit: 'g' },
  { key: 'fatGoal', label: 'Fat Goal', unit: 'g' },
];

const UNIT_OPTIONS = ['Metric', 'Imperial'];

export const SettingsScreen: React.FC = () => {
  const { settings, updateGoal, updateUnits } = useAppData();
  const [editingGoal, setEditingGoal] = useState<GoalRowConfig | null>(null);
  const [isUnitsVisible, setUnitsVisible] = useState(false);
  const [isAboutVisible, setAboutVisible] = useState(false);

  return (
    <ScreenContainer>
      <SectionTitle>PREFERENCES</SectionTitle>

      {GOAL_ROWS.map((row) => (
        <InfoRow
          key={row.key}
          title={row.label}
          rightText={`${settings[row.key]} ${row.unit}`}
          showChevron
          onPress={() => setEditingGoal(row)}
        />
      ))}

      <InfoRow
        title="Units"
        rightText={settings.units}
        showChevron
        onPress={() => setUnitsVisible(true)}
      />

      <InfoRow title="About NutriTrack" showChevron onPress={() => setAboutVisible(true)} />

      {editingGoal && (
        <EditGoalModal
          visible={!!editingGoal}
          label={editingGoal.label}
          unit={editingGoal.unit}
          currentValue={settings[editingGoal.key]}
          onClose={() => setEditingGoal(null)}
          onSave={(value) => updateGoal(editingGoal.key, value)}
        />
      )}

      <SelectModal
        visible={isUnitsVisible}
        title="Units"
        options={UNIT_OPTIONS}
        selected={settings.units}
        onClose={() => setUnitsVisible(false)}
        onSelect={(option) => updateUnits(option as AppSettings['units'])}
      />

      <AboutModal visible={isAboutVisible} onClose={() => setAboutVisible(false)} />
    </ScreenContainer>
  );
};
