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
- Dados mockados isolados em `src/data`, servindo apenas como estado **inicial**.

## Estado editável (Context)

Todo o estado que pode ser alterado pelo usuário (refeições, alimentos salvos,
metas diárias e unidade) vive em `src/context/AppDataContext.tsx`, acessado
via o hook `useAppData()`. Nenhuma tela guarda cópia própria dos dados —
todas leem e escrevem através do context.

## Modais (`src/components/modals`)

- `AppModal` — casca genérica (backdrop + card + título + fechar), usada por todos os outros.
- `FormField` — label + input padronizado, usado nos formulários.
- `AddMealModal` — adicionar refeição (nome, ingredientes, kcal).
- `AddFoodModal` — adicionar alimento salvo (nome, porção, kcal).
- `EditGoalModal` — genérico, reaproveitado pelas 4 metas de Settings.
- `SelectModal` — seleção única genérica, usada hoje para trocar "Units".
- `AboutModal` — conteúdo estático de "About NutriTrack".

## Exclusão de itens

`MealCard` e `InfoRow` aceitam uma prop `onDelete`. Ao tocar no ícone "✕",
é exibido um `Alert` de confirmação (`src/utils/confirmDelete.ts`) antes de
remover o item do context.

## Ajustes de correção

- **Sobreposição com a barra de navegação do Android**: corrigido fazendo o
  `SafeAreaView` do `AppShell` respeitar `edges={['top', 'bottom']}`, então
  os botões "LOG FOOD" e "Add Food" não ficam mais atrás dos botões de
  gesto/navegação do sistema.
- **Horário fixo removido**: o relógio já aparece na barra de status do
  Android, então foi retirado do header do app.
- **Data dinâmica**: `src/utils/date.ts` calcula a data atual real (`SAT, AUG 15`,
  por exemplo) em vez do valor fixo `SUN, FEB 1`.

## Refeições ligadas aos alimentos cadastrados (2ª rodada de ajustes)

- `kcal consumido` do tracker agora é **derivado**: soma real dos `kcal` de
  todas as refeições do dia (nada de valor fixo). Qualquer alteração na
  lista de refeições atualiza o anel/resumo do header automaticamente.
- `Meal.foods` substitui o antigo `Meal.items` (texto livre): cada refeição
  guarda uma lista de `MealFoodEntry` (`foodId`, `name`, `kcal`), sempre
  originada dos alimentos cadastrados na aba Foods.
- **`MealFormModal`** (substitui o antigo `AddMealModal`) cobre tanto criar
  quanto editar uma refeição:
  - lista os alimentos salvos com um seletor tipo checklist (`ToggleRow`);
  - calcula o total de kcal automaticamente pela soma dos itens marcados;
  - calcula quanto ainda resta da meta diária (excluindo a própria refeição
    quando em modo de edição, para não descontá-la duas vezes);
  - bloqueia o botão de salvar e mostra uma mensagem de erro em vermelho se
    o total ultrapassar o restante da meta diária.
  - tocar em um card de refeição (`MealCard`) abre esse mesmo modal em modo
    de edição, já com os alimentos atuais marcados.
- **Metas em Settings**: `Protein/Carbs/Fat Goal` agora exibem a unidade
  conforme `Units` (g para Metric, oz para Imperial) — **sem conversão de
  valor**, só troca do rótulo, por decisão de produto. `Daily Calorie Goal`
  continua sempre em `kcal`. Isso é resolvido por `src/utils/units.ts`
  (`getWeightUnit`).
- Qualquer edição de meta em Settings já reflete imediatamente no header
  (Today), pois tudo lê do mesmo `AppDataContext`.
