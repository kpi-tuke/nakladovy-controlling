type Route = {
  path: string;
  title: string;
  addToReport: boolean;
  printToPDF: boolean;
  save: boolean;
};

export enum RouteName {
  HOME = '/',
  SELECT = '/taskselect',
  ECONOMIC_ANALYSIS = '/economicAnalysis',
  PERETO_ANALYSIS = '/paretoAnalysis',
  SORTIMENT_ANALYSIS = '/paretoAnalysis',
  CVP_ANALYSIS = '/cvpAnalysis',
  INDEX_ANALYSIS = '/indexAnalysis',
  STRUCTURE_ANALYSIS = '/structureAnalysis',
  EVALUATION = '/evaluation',
}

export const routes: Route[] = [
  {
    path: RouteName.HOME,
    title: 'Úvod',
    addToReport: false,
    printToPDF: false,
    save: false,
  },
  {
    path: RouteName.SELECT,
    title: 'Výber analýzy',
    addToReport: false,
    printToPDF: false,
    save: false,
  },
];

export const getRouteDetails = (path: string) =>
  routes.find((r) => r.path === path);
