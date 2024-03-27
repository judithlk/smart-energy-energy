import React from "react";
import ReactApexChart from "react-apexcharts";

export function Meter({ kwh }) {
  var options = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
      sparkline: {
        enabled: true
      }
    },
    plotOptions: {
      radialBar: {
        startAngle: -150,
        endAngle: 150,
        track: {
          background: ["#efefef", "aa6666", "11bb43"],
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: true,
            color: '#353535',
            fontSize: '2em',
            offsetY: 30
          },
          value: {
            offsetY: -25,
            fontSize: '2em',
            color: '#008000',
            formatter: function (val) {
              return val
            }
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'gradient',
      colors: ['#0BDA51'],
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.5,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        gradientToColors: ["#ff2222"],
        stops: [0, 100],
      },
    },
    labels: ['Wh'],
  }

  return (
    <div>
      <div>
        <ReactApexChart options={options} series={[kwh]} type="radialBar" />
      </div>
      <div></div>
    </div >
  )

}
