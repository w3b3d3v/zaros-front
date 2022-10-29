import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

export default function Vault({ values }) {
  const options = {
    credits: {
      enabled: false,
    },
    colors: ["#22D3EE", "#E2F5EF", "#48907F"],
    chart: {
      plotBackgroundColor: true,
      plotBorderWidth: null,
      plotShadow: false,
      backgroundColor: "transparent",
      type: "pie",
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ["50%", "75%"],
      },
    },
    title: {
      text: "",
      show: false,
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          connectorColor: "silver",
        },
      },
    },
    series: [
      {
        innerSize: "50%",
        name: "Share",
        data: [
          { name: "ETH", y: values.eth },
          { name: "USDC", y: values.usdc },
          { name: "DAI", y: values.dai },
        ],
      },
    ],
  }

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}
