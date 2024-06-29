type Route = {
  path: string;
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

export const routes: Route[] = [
  {
    path: RouteName.HOME,
    title: 'Úvod',
    printToPDF: false,
    save: false,
  },
  {
    path: RouteName.SELECT,
    title: 'Výber analýzy',
    printToPDF: false,
    save: false,
  },
  {
    path: RouteName.ECONOMIC_ANALYSIS,
    title: 'Ekonomická analýza hospodárenia',
    printToPDF: true,
    save: true,
  },
  {
    path: RouteName.STRUCTURE_ANALYSIS,
    title: 'Štruktúrna analýza',
    printToPDF: true,
    save: true,
  },
  {
    path: RouteName.CVP_ANALYSIS,
    title: 'CVP analýza',
    printToPDF: true,
    save: true,
  },
  {
    path: RouteName.SORTIMENT_ANALYSIS,
    title: 'Sortimentná analýza',
    printToPDF: true,
    save: true,
  },
  {
    path: RouteName.INDEX_ANALYSIS,
    title: 'Indexná analýza',
    printToPDF: true,
    save: true,
  },
  {
    path: RouteName.PERETO_ANALYSIS,
    title: 'Pareto analýza',
    printToPDF: true,
    save: true,
  },
];

export const getRouteDetails = (path: string) =>
  routes.find((r) => r.path === path);
