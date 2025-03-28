import ReactEcharts from 'echarts-for-react'

const StatisticBookingByMonth = ({ totalBooking }) => {

  const option = {
    title: {
      text: 'Thống kê booking theo tháng',
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: totalBooking?.TotalBookingByMonth?.map(item => item?.Month),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: totalBooking?.TotalBookingByMonth?.map(item => item?.Total),
        type: 'line',
        smooth: true,
        name: "Giáo viên"
      },
    ],
  }


  return (
    <div>
      <ReactEcharts option={option} style={{ height: '300px', width: '100%' }} />
    </div>
  )
}

export default StatisticBookingByMonth