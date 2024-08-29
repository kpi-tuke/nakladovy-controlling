import { InputSelectType, ItemSelectOption } from './store/rootReducer';

const profits: Omit<ItemSelectOption, 'type'>[] = [
  { value: 601, label: '601 - Tržby za vlastné výrobky' },
  { value: 602, label: '602 - Tržby z predaja služieb' },
  { value: 604, label: '604 - Tržby za tovar' },
  { value: 606, label: '606 - Výnosy zo zákazky' },
  { value: 607, label: '607 - Výnosy z nehnuteľnosti na predaj' },
  { value: 611, label: '611 - Zmena stavu nedokončenej výroby' },
  { value: 612, label: '612 - Zmena stavu polotovarov' },
  { value: 613, label: '613 - Zmena stavu výrobkov' },
  { value: 614, label: '614 - Zmena stavu zvierat' },
  { value: 621, label: '621 - Aktivácia materiálu a tovaru' },
  { value: 622, label: '622 - Aktivácia vnútroorganizačných služieb' },
  { value: 623, label: '623 - Aktivácia dlhodobého nehmotného majetku' },
  { value: 624, label: '624 - Aktivácia dlhodobého hmotného majetku' },
  {
    value: 641,
    label:
      '641 - Tržby z predaja dlhodobého nehmotného majetku a dlhodobého hmotného majetku',
  },
  { value: 642, label: '642 - Tržby z predaja materiálu' },
  { value: 644, label: '644 - Zmluvné pokuty, penále a úroky z omeškania' },
  { value: 645, label: '645 - Ostatné pokuty, penále a úroky z omeškania' },
  { value: 646, label: '646 - Výnosy z odpísaných pohľadávok' },
  { value: 648, label: '648 - Ostatné výnosy z hospodárskej činnosti' },
  {
    value: 655,
    label: '655 - Zúčtovanie komplexných nákladov budúcich období',
  },
  {
    value: 657,
    label:
      '657 - Zúčtovanie oprávky k opravnej položke k nadobudnutému majetku',
  },
  { value: 661, label: '661 - Tržby z predaja cenných papierov a podielov' },
  { value: 662, label: '662 - Úroky' },
  { value: 663, label: '663 - Kurzové zisky' },
  { value: 664, label: '664 - Výnosy z precenenia cenných papierov' },
  { value: 665, label: '665 - Výnosy z dlhodobého finančného majetku' },
  { value: 666, label: '666 - Výnosy z krátkodobého finančného majetku' },
  { value: 667, label: '667 - Výnosy z derivátových operácií' },
  { value: 668, label: '668 - Ostatné finančné výnosy' },
];

const costs: Omit<ItemSelectOption, 'type'>[] = [
  { value: 501, label: '501 - Spotreba materiálu' },
  { value: 502, label: '502 - Spotreba energie' },
  { value: 503, label: '503 - Spotreba ostatných neskladovateľných dodávok' },
  { value: 504, label: '504 - Predaný tovar' },
  {
    value: 505,
    label: '505 - Tvorba a zúčtovanie opravných položiek k zásobám',
  },
  { value: 507, label: '507 - Predaná nehnuteľnosť' },
  { value: 511, label: '511 - Opravy a udržiavanie' },
  { value: 512, label: '512 - Cestovné náklady' },
  { value: 513, label: '513 - Náklady na reprezentáciu' },
  { value: 518, label: '518 - Ostatné služby' },
  { value: 521, label: '521 - Mzdové náklady' },
  {
    value: 522,
    label: '522 - Príjmy spoločníkov a členov zo závislej činnosti',
  },
  { value: 523, label: '523 - Odmeny členom orgánov spoločnosti a družstva' },
  { value: 524, label: '524 - Zákonné sociálne poistenie' },
  { value: 525, label: '525 - Ostatné sociálne poistenie' },
  { value: 526, label: '526 - Sociálne náklady fyzickej osoby/podnikateľa' },
  { value: 527, label: '527 - Zákonné sociálne náklady' },
  { value: 528, label: '528 - Ostatné sociálne náklady' },
  { value: 531, label: '531 - Daň z motorových vozidiel' },
  { value: 532, label: '532 - Daň z nehnuteľnosti' },
  { value: 538, label: '538 - Ostatné dane a poplatky' },
  {
    value: 541,
    label:
      '541 - Zostatková cena predaného dlhodobého nehmotného majetku a dlhodobého hmotného majetku',
  },
  { value: 542, label: '542 - Predaný materiál' },
  { value: 543, label: '543 - Dary' },
  { value: 544, label: '544 - Zmluvné pokuty, penále a úroky z omeškania' },
  { value: 545, label: '545 - Ostatné pokuty, penále a úroky z omeškania' },
  { value: 546, label: '546 - Odpis pohľadávky' },
  {
    value: 547,
    label: '547 - Tvorba a zúčtovanie opravných položiek k pohľadávkam',
  },
  { value: 548, label: '548 - Ostatné náklady na hospodársku činnosť' },
  { value: 549, label: '549 - Manká a škody' },
  {
    value: 551,
    label:
      '551 - Odpisy dlhodobého nehmotného majetku a dlhodobého hmotného majetku',
  },
  {
    value: 553,
    label: '553 - Tvorba a zúčtovanie opravných položiek k dlhodobému majetku',
  },
  {
    value: 555,
    label: '555 - Zúčtovanie komplexných nákladov budúcich období',
  },
  {
    value: 557,
    label:
      '557 - Zúčtovanie oprávky k opravnej položke k nadobudnutému majetku\n',
  },
  { value: 561, label: '561 - Predané cenné papiere a podiely' },
  { value: 562, label: '562 - Úroky' },
  { value: 563, label: '563 - Kurzové straty' },
  { value: 564, label: '564 - Náklady na precenenie cenných papierov' },
  {
    value: 565,
    label: '565 - Tvorba a zúčtovanie opravných položiek k finančnému majetku',
  },
  { value: 566, label: '566 - Náklady na krátkodobý finančný majetok' },
  { value: 567, label: '567 - Náklady na derivátové operácie' },
  { value: 568, label: '568 - Ostatné finančné náklady' },
  { value: 569, label: '569 - Manká a škody na finančnom majetku' },
  { value: 591, label: '591 - Splatná daň z príjmov' },
  { value: 592, label: '592 - Odložená daň z príjmov' },
  { value: 595, label: '595 - Dodatočné odvody dane z príjmov' },
  {
    value: 596,
    label: '596 - Prevod podielov na výsledku hospodárenia spoločníkom',
  },
];

export const costOptions: ItemSelectOption[] = costs.map((item) => ({
  ...item,
  type: InputSelectType.COSTS,
}));

export const profitOptions: ItemSelectOption[] = profits.map((item) => ({
  ...item,
  type: InputSelectType.PROFITS,
}));

export const allOptions = [...costOptions, ...profitOptions];

export const ADD_CUSTOM_ITEM_LABEL = 'Iná položka...';

export const customOption = {
  value: -1,
  label: ADD_CUSTOM_ITEM_LABEL,
  type: InputSelectType.CUSTOM,
};
