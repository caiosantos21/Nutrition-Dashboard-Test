import React, { useState } from 'react';
import { MealCard } from '../components/MealCard';
import { AppButton } from '../components/AppButton';
import { PlusIcon } from '../components/PlusIcon';
import { ScreenContainer } from '../components/ScreenContainer';
import { SectionTitle } from '../components/SectionTitle';
import { AddMealModal } from '../components/modals/AddMealModal';
import { useAppData } from '../context/AppDataContext';

export const TodayScreen: React.FC = () => {
  const { meals, addMeal, removeMeal } = useAppData();
  const [isAddMealVisible, setAddMealVisible] = useState(false);

  return (
    <ScreenContainer footer={<AppButton label="LOG FOOD" variant="solid" />}>
      <SectionTitle>MEALS</SectionTitle>

      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} onDelete={removeMeal} />
      ))}

      <AppButton
        label="Add Meal"
        variant="outline"
        icon={<PlusIcon />}
        onPress={() => setAddMealVisible(true)}
      />

      <AddMealModal
        visible={isAddMealVisible}
        onClose={() => setAddMealVisible(false)}
        onSubmit={addMeal}
      />
    </ScreenContainer>
  );
};
