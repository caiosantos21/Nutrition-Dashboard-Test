import { DailySummary, FoodItem, HistoryEntry, Meal, SettingItem, TabItem } from '../types/nutrition';

export const dailySummary: DailySummary = {
  kcalConsumed: 1500,
  kcalGoal: 2000,
  protein: { label: 'Protein', current: 80, goal: 120, unit: 'g' },
  carbs: { label: 'Carbs', current: 200, goal: 250, unit: 'g' },
  fat: { label: 'Fat', current: 50, goal: 70, unit: 'g' },
};

export const meals: Meal[] = [
  {
    id: '1',
    title: 'Oatmeal with berries',
    items: ['2% Milk', 'Almonds'],
    kcal: 380,
  },
  {
    id: '2',
    title: 'Grilled Chicken Salad',
    items: ['Whole Wheat Bread', 'Olive Oil Dressing'],
    kcal: 450,
  },
];

export const tabs: TabItem[] = [
  { key: 'today', label: 'TODAY' },
  { key: 'history', label: 'HISTORY' },
  { key: 'foods', label: 'FOODS' },
  { key: 'settings', label: 'SETTINGS' },
];

export const historyEntries: HistoryEntry[] = [
  { id: '1', date: 'Feb 1', weekday: 'Sunday', kcalConsumed: 1500, kcalGoal: 2000 },
  { id: '2', date: 'Jan 31', weekday: 'Saturday', kcalConsumed: 1980, kcalGoal: 2000 },
  { id: '3', date: 'Jan 30', weekday: 'Friday', kcalConsumed: 2150, kcalGoal: 2000 },
  { id: '4', date: 'Jan 29', weekday: 'Thursday', kcalConsumed: 1870, kcalGoal: 2000 },
  { id: '5', date: 'Jan 28', weekday: 'Wednesday', kcalConsumed: 1620, kcalGoal: 2000 },
];

export const savedFoods: FoodItem[] = [
  { id: '1', name: 'Oatmeal with berries', kcalPerServing: 280, servingSize: '1 bowl' },
  { id: '2', name: 'Grilled Chicken Breast', kcalPerServing: 231, servingSize: '100 g' },
  { id: '3', name: 'Whole Wheat Bread', kcalPerServing: 81, servingSize: '1 slice' },
  { id: '4', name: 'Almonds', kcalPerServing: 164, servingSize: '28 g' },
  { id: '5', name: '2% Milk', kcalPerServing: 122, servingSize: '1 cup' },
  { id: '6', name: 'Olive Oil Dressing', kcalPerServing: 119, servingSize: '1 tbsp' },
];

export const settingsItems: SettingItem[] = [
  { id: '1', label: 'Daily Calorie Goal', value: '2000 kcal' },
  { id: '2', label: 'Protein Goal', value: '120 g' },
  { id: '3', label: 'Carbs Goal', value: '250 g' },
  { id: '4', label: 'Fat Goal', value: '70 g' },
  { id: '5', label: 'Units', value: 'Metric' },
  { id: '6', label: 'Notifications', value: 'On' },
  { id: '7', label: 'Account' },
  { id: '8', label: 'About NutriTrack' },
];
