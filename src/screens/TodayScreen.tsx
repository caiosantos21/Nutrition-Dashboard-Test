import React from 'react';
import { MealCard } from '../components/MealCard';
import { AppButton } from '../components/AppButton';
import { PlusIcon } from '../components/PlusIcon';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { meals } from '../data/mockData';

export const TodayScreen: React.FC = () => {
  return (
    <ScreenContainer footer={<AppButton label="LOG FOOD" variant="solid" />}>
      <SectionTitle>MEALS</SectionTitle>

      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}

      <AppButton label="Add Meal" variant="outline" icon={<PlusIcon />} />
    </ScreenContainer>
  );
};
