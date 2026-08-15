import React from 'react';
import { InfoRow } from '../components/InfoRow';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { settingsItems } from '../data/mockData';

export const SettingsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <SectionTitle>PREFERENCES</SectionTitle>

      {settingsItems.map((item) => (
        <InfoRow
          key={item.id}
          title={item.label}
          rightText={item.value}
          showChevron={!item.value}
        />
      ))}
    </ScreenContainer>
  );
};
