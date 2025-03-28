import ReactECharts from 'echarts-for-react'

const StatisticTotalBooking = ({ totalBooking }) => {

  const chartOptions = {
    title: {
      text: `Số lượng booking ${totalBooking?.TotalBooking}`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: totalBooking?.TotalComplete, name: 'Booking đã hoàn thành' },
          { value: totalBooking?.TotalCancel, name: 'Booking đã bị hủy' },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }


  return (
    <div>
      <ReactECharts option={chartOptions} />
    </div>
  )
}

export default StatisticTotalBooking