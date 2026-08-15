export interface MacroNutrient {
  label: string;
  current: number;
  goal: number;
  unit: string;
}

export interface DailySummary {
  kcalConsumed: number;
  kcalGoal: number;
  protein: MacroNutrient;
  carbs: MacroNutrient;
  fat: MacroNutrient;
}

export interface Meal {
  id: string;
  title: string;
  items: string[];
  kcal: number;
}

export interface HistoryEntry {
  id: string;
  date: string;
  weekday: string;
  kcalConsumed: number;
  kcalGoal: number;
}

export interface FoodItem {
  id: string;
  name: string;
  kcalPerServing: number;
  servingSize: string;
}

export interface SettingItem {
  id: string;
  label: string;
  value?: string;
}

export type TabKey = 'today' | 'history' | 'foods' | 'settings';

export interface TabItem {
  key: TabKey;
  label: string;
}
