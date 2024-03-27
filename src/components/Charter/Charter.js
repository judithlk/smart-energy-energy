import Chart from "react-apexcharts";

export function Charter({ parameters }) {
  var options = {
    chart: {
      id: "basic-bar",
      // height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        borderRadiusApplication: 'end',
        horizontal: true,
        columnWidth: '80%',
        barHeight: '80%',
        dataLabels: {
          position: 'middle'
        },
        colors: {
          ranges: [{
            from: 0,
            to: 100,
            color: '#008000'
          }
          ],
          backgroundBarColors: ["#D0F0C0"],
          backgroundBarOpacity: 0.3
        }
      }
    },
    grid: {
      show: false
    },
    xaxis: {
      categories: ['Voltage (V)', 'Current (mA)', 'Power (W)', 'Power Rating (Wh)'],
      labels: {
        show: false
      }
    }
  }

  var series = [
    {
      name: "Reading",
      data: parameters
    }
  ]

  return (
    <div className="mixed-chart">
      <Chart
        options={options}
        series={series}
        type="bar"    
        width='90%'
      />
    </div>
  );
}

