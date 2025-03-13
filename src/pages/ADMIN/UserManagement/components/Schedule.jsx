import { Empty } from "antd"
import { Calendar, momentLocalizer, Views } from "react-big-calendar"
import moment from "moment"
import { convertToCurrentEquivalent } from "src/lib/dateUtils"

const localizer = momentLocalizer(moment)
moment.updateLocale('en', { week: { dow: 1 } })

const formats = {
  monthHeaderFormat: () => { }, // Định dạng tiêu đề tháng
  dayFormat: "ddd", // Định dạng hiển thị ngày trong ngày
  dayHeaderFormat: () => { }, // Tiêu đề nagyf
  dayRangeHeaderFormat: () => { }, // Định dạng tiêu đề ngày khi chọn khoảng thời gian
  agendaDateFormat: () => { }, //Cột trong lịch làm việc
}

const Schedule = ({ user }) => {


  return (
    <div className="p-12">
      {
        !!user?.Schedules?.length ?
          <Calendar
            localizer={localizer}
            startAccessor={event => {
              return new Date(event.start)
            }}
            endAccessor={event => {
              return new Date(event.end)
            }}
            style={{ width: "100%", height: 540 }}
            toolbar={false}
            defaultView={Views.WEEK}
            formats={formats}
            selectable
            events={
              user?.Schedules?.map(i => ({
                start: convertToCurrentEquivalent(new Date(i?.StartTime)),
                end: convertToCurrentEquivalent(new Date(i?.EndTime)),
              }))
            }
            onShowMore={(schedules, date) =>
              this.setState({ showModal: true, schedules })
            }
            min={new Date(new Date().setHours(6, 0, 0, 0))}
            max={new Date(new Date().setHours(23, 0, 0, 0))}
          />
          : <Empty description={`${user?.FullName} chưa điền thông tin này`} />
      }
    </div>
  )
}

export default Schedule