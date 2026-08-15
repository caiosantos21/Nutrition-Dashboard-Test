import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  AppSettings,
  DailySummary,
  FoodItem,
  Meal,
  Units,
} from '../types/nutrition';
import {
  defaultSettings,
  initialConsumption,
  initialFoods,
  initialMeals,
} from '../data/mockData';

interface NewMealInput {
  title: string;
  items: string[];
  kcal: number;
}

interface NewFoodInput {
  name: string;
  servingSize: string;
  kcalPerServing: number;
}

interface AppDataContextValue {
  dailySummary: DailySummary;
  meals: Meal[];
  foods: FoodItem[];
  settings: AppSettings;
  addMeal: (meal: NewMealInput) => void;
  removeMeal: (id: string) => void;
  addFood: (food: NewFoodInput) => void;
  removeFood: (id: string) => void;
  updateGoal: (key: keyof Omit<AppSettings, 'units'>, value: number) => void;
  updateUnits: (units: Units) => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

let idCounter = 1000; // evita colisão com os ids mockados iniciais

const generateId = (): string => String(idCounter++);

/**
 * Único lugar da aplicação que guarda estado mutável (refeições, alimentos,
 * metas). Telas e componentes apenas leem daqui e chamam as ações —
 * nenhuma tela mantém sua própria cópia dos dados.
 */
export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [meals, setMeals] = useState<Meal[]>(initialMeals);
  const [foods, setFoods] = useState<FoodItem[]>(initialFoods);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [consumption] = useState(initialConsumption);

  const addMeal = (meal: NewMealInput) => {
    setMeals((prev) => [{ id: generateId(), ...meal }, ...prev]);
  };

  const removeMeal = (id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
  };

  const addFood = (food: NewFoodInput) => {
    setFoods((prev) => [{ id: generateId(), ...food }, ...prev]);
  };

  const removeFood = (id: string) => {
    setFoods((prev) => prev.filter((food) => food.id !== id));
  };

  const updateGoal = (key: keyof Omit<AppSettings, 'units'>, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const updateUnits = (units: Units) => {
    setSettings((prev) => ({ ...prev, units }));
  };

  const dailySummary: DailySummary = useMemo(
    () => ({
      kcalConsumed: consumption.kcalConsumed,
      kcalGoal: settings.dailyCalorieGoal,
      protein: {
        label: 'Protein',
        current: consumption.proteinConsumed,
        goal: settings.proteinGoal,
        unit: 'g',
      },
      carbs: {
        label: 'Carbs',
        current: consumption.carbsConsumed,
        goal: settings.carbsGoal,
        unit: 'g',
      },
      fat: {
        label: 'Fat',
        current: consumption.fatConsumed,
        goal: settings.fatGoal,
        unit: 'g',
      },
    }),
    [consumption, settings],
  );

  const value: AppDataContextValue = {
    dailySummary,
    meals,
    foods,
    settings,
    addMeal,
    removeMeal,
    addFood,
    removeFood,
    updateGoal,
    updateUnits,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export const useAppData = (): AppDataContextValue => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData deve ser usado dentro de um AppDataProvider');
  }
  return context;
};
