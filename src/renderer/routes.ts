type Route = {
  path: string;
  title: string;
  addToReport: boolean;
  printToPDF: boolean;
  save: boolean;
};

export enum RouteName {
  HOME = '/welcome',
  SELECT = '/taskselect',
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
