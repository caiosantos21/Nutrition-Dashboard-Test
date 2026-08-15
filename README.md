# NutriTrack — Nutrition Dashboard (Expo)

Mesmo projeto do dashboard nutricional, agora rodando com **Expo + TypeScript**.
A vantagem do Expo: não precisa configurar Android SDK / Xcode nem gerar pastas
nativas — dá pra rodar direto no celular com o app **Expo Go**.

## Como rodar

1. Extraia este `.zip` dentro de:
   `C:\Users\caio_.CAIO\OneDrive\Documentos\GitHub\Nutrition-Dashboard-Test` (ou em uma pasta separada, ex: `Nutrition-Dashboard-Expo`).

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Suba o servidor de desenvolvimento:

   ```bash
   npx expo start
   ```

4. No celular, instale o app **Expo Go** (Play Store / App Store), abra e
   escaneie o QR Code que aparece no terminal/navegador. O app carrega
   diretamente, sem precisar de cabo USB nem `adb`.

   Alternativas no terminal, com o Expo já rodando:
   - pressione `a` → abre num emulador Android (se tiver o Android Studio configurado)
   - pressione `i` → abre num simulador iOS (só em macOS)
   - pressione `w` → abre no navegador

## Diferenças em relação à versão React Native CLI

- Não existem pastas `android/` e `ios/` — o Expo gerencia isso internamente
  (elas só aparecem se você rodar `npx expo prebuild`, quando quiser "ejetar"
  para customização nativa avançada).
- `App.tsx` é o próprio entry point (via `expo/AppEntry.js` no `package.json`),
  então não há `index.js` separado.
- Status bar controlada pelo componente `<StatusBar />` de `expo-status-bar`.

## Arquitetura

A estrutura interna (`src/`) é **idêntica** à versão CLI — só a camada de
bootstrap/config muda entre Expo e RN CLI, a UI e a lógica são as mesmas:

```
src/
  theme/          → design tokens (cores, espaçamento, tipografia)
  types/          → tipos de domínio (Meal, MacroNutrient, DailySummary, HistoryEntry, FoodItem, SettingItem)
  data/           → mock data (substituir depois por chamadas de API)
  components/     → peças de UI puras e reutilizáveis
    CircularProgress.tsx   → anel de progresso (kcal)
    ProgressTrack.tsx      → barra linear reutilizada pelo MacroBar e pelo header
    MacroBar.tsx            → linha de macro (Protein/Carbs/Fat)
    MealCard.tsx             → card de refeição (aba Today)
    InfoRow.tsx               → linha genérica usada em History, Foods e Settings
    SectionTitle.tsx           → título de seção
    ScreenContainer.tsx         → casca de tela (ScrollView + padding + footer opcional)
    TabBar.tsx                   → abas Today/History/Foods/Settings
    AppButton.tsx                  → botão único (solid/outline)
    PlusIcon.tsx                    → ícone "+" circular
    DailySummaryHeader.tsx            → cabeçalho verde (CircularProgress + MacroBar)
  navigation/
    AppShell.tsx        → header + tabs fixos, troca a tela ativa por um mapa tab → tela
  screens/
    TodayScreen.tsx / HistoryScreen.tsx / FoodsScreen.tsx / SettingsScreen.tsx
App.tsx             → entry point, injeta SafeAreaProvider + AppShell
```

### Princípios seguidos

- Nenhum valor de cor/espaçamento/fonte hardcoded — tudo vem de `theme/theme.ts`.
- `MacroBar`, `InfoRow`, `AppButton` e `ScreenContainer` eliminam repetição de
  JSX entre macros, listas (History/Foods/Settings) e botões.
- Navegação simples por estado (`AppShell`), sem dependência de lib de rotas —
  fácil de trocar depois por React Navigation se o app crescer.
- Dados mockados isolados em `src/data`, prontos para virar uma camada de API.
