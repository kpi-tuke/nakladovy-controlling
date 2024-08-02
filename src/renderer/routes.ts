type Route = {
  title: string;
  printToPDF: boolean;
  save: boolean;
};

export enum RouteName {
  HOME = '/',
  SELECT = '/taskselect',
  ECONOMIC_ANALYSIS = '/economicAnalysis',
  PERETO_ANALYSIS = '/paretoAnalysis',
  SORTIMENT_ANALYSIS = '/sortimentAnalysis',
  CVP_ANALYSIS = '/cvpAnalysis',
  INDEX_ANALYSIS = '/indexAnalysis',
  STRUCTURE_ANALYSIS = '/structureAnalysis',
  EVALUATION = '/evaluation',
}

export const routes: { [key in RouteName]: Route } = {
  [RouteName.HOME]: {
    title: 'Úvod',
    printToPDF: false,
    save: false,
  },
  [RouteName.SELECT]: {
    title: 'Výber analýzy',
    printToPDF: false,
    save: false,
  },
  [RouteName.ECONOMIC_ANALYSIS]: {
    title: 'Ekonomická analýza hospodárenia',
    printToPDF: true,
    save: true,
  },
  [RouteName.STRUCTURE_ANALYSIS]: {
    title: 'Štruktúrna analýza nákladov',
    printToPDF: true,
    save: true,
  },
  [RouteName.CVP_ANALYSIS]: {
    title: 'CVP analýza (COST VOLUME PROFIT)',
    printToPDF: true,
    save: true,
  },
  [RouteName.SORTIMENT_ANALYSIS]: {
    title: 'Sortimentná analýza',
    printToPDF: true,
    save: true,
  },
  [RouteName.INDEX_ANALYSIS]: {
    title: 'Indexná analýza',
    printToPDF: true,
    save: true,
  },
  [RouteName.PERETO_ANALYSIS]: {
    title: 'Pareto analýza',
    printToPDF: true,
    save: true,
  },
  [RouteName.EVALUATION]: {
    title: 'Report',
    printToPDF: true,
    save: false,
  },
};
