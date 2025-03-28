import ReactECharts from 'echarts-for-react'

const StatisticTotalAccount = ({ totalAccount }) => {

  const chartOptions = {
    title: {
      text: `Số lượng tài khoản ${totalAccount?.TotalAccount}`,
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
          { value: totalAccount?.TotalBarber, name: 'Barber' },
          { value: totalAccount?.TotalUser, name: 'Khách hàng' },
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

export default StatisticTotalAccount