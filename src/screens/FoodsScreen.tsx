import React from 'react';
import { InfoRow } from '../components/InfoRow';
import { AppButton } from '../components/AppButton';
import { PlusIcon } from '../components/PlusIcon';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { savedFoods } from '../data/mockData';

export const FoodsScreen: React.FC = () => {
  return (
    <ScreenContainer>
      <SectionTitle>SAVED FOODS</SectionTitle>

      {savedFoods.map((food) => (
        <InfoRow
          key={food.id}
          title={food.name}
          subtitle={food.servingSize}
          rightText={`${food.kcalPerServing} kcal`}
        />
      ))}

      <AppButton label="Add Food" variant="outline" icon={<PlusIcon />} />
    </ScreenContainer>
  );
};
