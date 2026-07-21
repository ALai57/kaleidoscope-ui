import type { RecipeContent, Timeline } from '../../types/recipe';

export const salmonContent: RecipeContent = {
  title: 'Miso-Glazed Salmon Rice Bowls',
  servings: '2',
  sections: [
    { name: 'Salmon', ingredients: ['2 salmon fillets', 'miso', 'mirin'], steps: [
      'Whisk miso, mirin, soy sauce & grated ginger',
      'Coat the fillets, flesh-side down',
      'Leave at room temp so it cooks evenly',
      'Pat salmon dry, season lightly',
      'Sear skin-side down, 4 min',
      'Flip, spoon glaze over, 3 min',
      'Rest 2 min off the heat',
    ] },
    { name: 'Rice', ingredients: ['1 cup rice'], steps: [
      'Rinse rice until the water runs clear',
      'Add water 1 : 1.25, bring to a boil',
      'Cover, drop to lowest heat, 18–20 min',
      'Do not lift the lid',
      'Off heat, keep covered, 10 min',
      'Fluff with a fork before plating',
    ] },
    { name: 'Greens & sauce', ingredients: ['bok choy', 'scallions'], steps: [
      'Whisk soy, rice vinegar, sesame oil & honey',
      'Set aside for drizzling',
      'Halve the baby bok choy',
      'Slice scallions & chili',
      'Mince the garlic',
      'Garlic in hot oil, 30 sec',
      'Bok choy cut-side down, 2 min',
      'Splash of water, cover, 2 min',
    ] },
    { name: 'Assembly', ingredients: [], steps: [
      'Bowl of rice, salmon on top',
      'Bok choy alongside',
      'Drizzle sauce, scatter scallion & sesame',
    ] },
  ],
};

export const salmonTimeline: Timeline = {
  version: 1,
  generator_version: 1,
  generated_at: '2026-07-14T00:00:00Z',
  total_minutes: 50,
  overrides: [],
  components: [
    { name: 'Salmon', steps_hash: 'sha256:salmon', phases: [
      { id: 'Salmon/Marinate', label: 'Marinate', kind: 'passive', steps: [0, 1, 2], estimate: 24, deps: [], start: 0 },
      { id: 'Salmon/Sear & glaze', label: 'Sear & glaze', kind: 'active', steps: [3, 4, 5, 6], estimate: 10, deps: ['Salmon/Marinate'], start: 30 },
    ] },
    { name: 'Rice', steps_hash: 'sha256:rice', phases: [
      { id: 'Rice/Start rice', label: 'Start rice', kind: 'active', steps: [0, 1], estimate: 5, deps: [], start: 6 },
      { id: 'Rice/Simmer', label: 'Simmer', kind: 'passive', steps: [2, 3], estimate: 20, deps: ['Rice/Start rice'], start: 11 },
      { id: 'Rice/Rest', label: 'Rest', kind: 'passive', steps: [4, 5], estimate: 10, deps: ['Rice/Simmer'], start: 31 },
    ] },
    { name: 'Greens & sauce', steps_hash: 'sha256:greens', phases: [
      { id: 'Greens & sauce/Whisk sauce', label: 'Whisk sauce', kind: 'active', steps: [0, 1], estimate: 6, deps: [], start: 0 },
      { id: 'Greens & sauce/Prep greens', label: 'Prep greens', kind: 'active', steps: [2, 3, 4], estimate: 5, deps: [], start: 22 },
      { id: 'Greens & sauce/Sauté greens', label: 'Sauté greens', kind: 'active', steps: [5, 6, 7], estimate: 6, deps: ['Greens & sauce/Prep greens'], start: 40 },
    ] },
    { name: 'Assembly', steps_hash: 'sha256:assembly', phases: [
      { id: 'Assembly/Plate up', label: 'Plate up', kind: 'active', steps: [0, 1, 2], estimate: 4, deps: ['Salmon/Sear & glaze', 'Rice/Rest', 'Greens & sauce/Sauté greens'], start: 46 },
    ] },
  ],
};

/** A recipe whose generator gave each single-phase component a phase labeled
 *  after the component itself — the shape that surfaced the "Prep broth · Prep
 *  broth" duplicate. Used to test that views collapse the redundant repetition. */
export const redundantLabelContent: RecipeContent = {
  title: 'Spanish Vegan Paella',
  servings: '4',
  sections: [
    { name: 'Prep broth', ingredients: ['4 cups broth', 'saffron'], steps: ['Warm the broth', 'Steep the saffron'] },
    { name: 'Cook', ingredients: ['rice', 'olive oil'], steps: ['Toast the rice', 'Simmer until absorbed'] },
  ],
};

export const redundantLabelTimeline: Timeline = {
  version: 1,
  generator_version: 1,
  generated_at: '2026-07-21T00:00:00Z',
  total_minutes: 25,
  overrides: [],
  components: [
    { name: 'Prep broth', steps_hash: 'sha256:broth', phases: [
      { id: 'Prep broth/Prep broth', label: 'Prep broth', kind: 'active', steps: [0, 1], estimate: 5, deps: [], start: 0 },
    ] },
    { name: 'Cook', steps_hash: 'sha256:cook', phases: [
      { id: 'Cook/Cook', label: 'Cook', kind: 'active', steps: [0, 1], estimate: 20, deps: ['Prep broth/Prep broth'], start: 5 },
    ] },
  ],
};
