import { ApexOptions } from 'apexcharts';

export const lineGraph = (osX: string[]): ApexOptions => {
  return {
    chart: {
      type: 'line',
      zoom: {
        enabled: false,
      },
    },
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
  return {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        columnWidth:"90%"
      }
    },
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
