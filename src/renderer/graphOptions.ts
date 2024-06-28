import { ApexOptions } from 'apexcharts';

export const useLineGraph = (osX: string[]): ApexOptions => {
  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: osX,
    },
    yaxis: [
      {
        title: {
          text: 'ekonomická veličina (€)',
        },
      },
    ],
    legend: {
      horizontalAlign: 'center',
    },
  };
};

export const useColGraph = (
  osX: string[],
  titleY?: string,
  titleX?: string
): ApexOptions => {
  return {
    chart: {
      type: 'bar',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
      redrawOnParentResize: true,
      redrawOnWindowResize: true,
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['black'],
      },
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: osX.map((cause: string) => cause.split(' ')),
      title: {
        text: titleX,
      },
    },
    yaxis: [
      {
        title: {
          text: titleY,
        },
      },
    ],
    legend: {
      horizontalAlign: 'center',
    },
  };
};

export const useCVPGraph = (
  osX: string[],
  zeroTon: number,
  zeroProf: number
): ApexOptions => {
  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    colors: [
      '#2E93fA',
      '#59edbb',
      '#FF9800',
      '#E91E63',
      '#66DA26',
      '#a796e0',
      '#fff923',
      '#eda859',
      '#546E7A',
    ],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'straight',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    annotations: {
      xaxis: [
        {
          x: zeroProf.toString(),
          borderColor: '#FF9800',

          label: {
            offsetY: 10,
            style: {
              background: '#FF9800',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            },
            orientation: 'horizontal',
            text: 'Minimálny zisk',
          },
        },
        {
          x: zeroTon.toString(),
          borderColor: '#FF4e4e',
          label: {
            offsetY: 10,
            borderColor: '#FF4e4e',
            text: 'Nulový bod',
            orientation: 'horizontal',
            style: {
              background: '#ff4e4e',
              color: 'white',
              fontSize: '14px',
              fontWeight: 'bold',
            },
          },
        },
      ],
    },

    markers: {
      size: 1,
    },
    xaxis: {
      categories: osX,
      title: {
        text: 'objem produkcie jednotky (ks...)',
      },
    },
    yaxis: [
      {
        title: {
          text: 'ekonomická veličina (€)',
        },
      },
    ],
    legend: {
      horizontalAlign: 'center',
    },
  };
};
