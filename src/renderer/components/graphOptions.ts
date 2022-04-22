import { ApexOptions } from 'apexcharts';
import {useMatchPrint} from "../Hooks";

export const lineGraph = (osX: string[]): ApexOptions => {

  const matches = useMatchPrint()

  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: !matches,
      },
    },
    colors: ['#2E93fA', "#59edbb", '#FF9800',  '#E91E63', '#66DA26', "#a796e0",  "#fff923", "#eda859", '#546E7A', ],
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
  }
}

export const colGraph = (osX: string[], titleY?: string): ApexOptions => {

  const matches = useMatchPrint()

  return {
    chart: {
      type: 'bar',
      toolbar: {
        show: !matches,
      },
    },
    colors: ['#2E93fA', "#59edbb", '#FF9800', '#E91E63', '#66DA26', "#a796e0",  "#fff923", "#eda859", '#546E7A', ],
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
      categories: osX.map((cause: string) => cause.split(" ")),
    },
    yaxis: [{
      title: {
        text: titleY
      }
    }],
    legend: {
      horizontalAlign: 'center',
    },
  }
}

export const CVPGraph = (osX: string[], matches: boolean,zeroEur: number, zeroTon: number, zeroProf: number ): ApexOptions => {

  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: !matches,
      },
    },
    colors: ['#2E93fA', "#59edbb", '#FF9800',  '#E91E63', '#66DA26', "#a796e0",  "#fff923", "#eda859", '#546E7A', ],
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
      points: [
        {
          x: zeroTon.toString(),
          y: zeroEur,
          marker: {
            size: 8,
          },
          label: {
            borderColor: '#FF4560',
            text: 'Nulový bod',
          },
        },
      ],
      xaxis: [
        {
          x: zeroProf.toString(),
          borderColor: '#775DD0',
          label: {
            style: {
              color: '#fa023f',
            },
            orientation: 'horizontal',
            text: 'Minimálny zisk',
          },
        },
      ],
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
  }
}
