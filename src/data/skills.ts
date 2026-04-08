// Skills data — ported from home.cljs

export interface SkillIcon {
  tooltipText: string;
  src: string;
}

export interface SkillGroup {
  /** Row of icons to display together. */
  icons: SkillIcon[];
}

export interface SkillSection {
  title: string;
  groups: SkillGroup[];
}

export const SKILLS: SkillSection[] = [
  {
    title: 'Languages I use',
    groups: [
      { icons: [{ tooltipText: 'Go', src: '/static/images/golang.svg' }] },
      { icons: [{ tooltipText: 'Clojure', src: '/static/images/clojure-logo-2.svg' }] },
      {
        icons: [
          { tooltipText: 'Clojurescript', src: '/static/images/cljs.svg' },
          { tooltipText: 'Shadow CLJS', src: '/static/images/shadow-cljs.png' },
          { tooltipText: 'Reframe', src: '/static/images/re-frame.png' },
        ],
      },
      {
        icons: [
          { tooltipText: 'Javascript', src: '/static/images/javascript.svg' },
          { tooltipText: 'Typescript', src: '/static/images/typescript.svg' },
          { tooltipText: 'React', src: '/static/images/react.svg' },
          { tooltipText: 'Material UI', src: '/static/images/material-ui-logo.svg' },
          { tooltipText: 'Storybook', src: '/static/images/storybook-icon.svg' },
        ],
      },
      { icons: [{ tooltipText: 'Terraform', src: '/static/images/terraform.png' }] },
    ],
  },
  {
    title: 'Tools I use',
    groups: [
      {
        icons: [
          { tooltipText: 'Swagger/Open API', src: '/static/images/swagger.png' },
          { tooltipText: 'Open Telemetry', src: '/static/images/otel.svg' },
        ],
      },
      {
        icons: [
          { tooltipText: 'AWS', src: '/static/images/aws.svg' },
          { tooltipText: 'Sumologic', src: '/static/images/sumo.svg' },
          { tooltipText: 'Grafana Loki', src: '/static/images/grafana.svg' },
          { tooltipText: 'Bugsnag', src: '/static/images/bugsnag.svg' },
        ],
      },
      { icons: [{ tooltipText: 'Keycloak', src: '/static/images/keycloak-logo.png' }] },
      { icons: [{ tooltipText: 'Docker', src: '/static/images/docker.png' }] },
    ],
  },
];
