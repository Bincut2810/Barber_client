import dayjs from "dayjs"
import { useSelector } from "react-redux"
import TableCustom from "src/components/TableCustom"
import { formatMoney } from "src/lib/stringUtils"
import { globalSelector } from "src/redux/selector"

const StatisticServiceBooking = ({
  services,
  pagination,
  setPagination,
  total
}) => {

  const { listSystemKey } = useSelector(globalSelector)

  const columns = [
    {
      title: "STT",
      width: 35,
      align: "center",
      key: 'STT',
      dataIndex: 'STT',
      render: (_, record, index) => (
        <div className="text-center">{index + 1}</div>
      ),
    },
    {
      title: 'Tên dịch vụ',
      width: 100,
      align: 'center',
      dataIndex: 'ServiceName',
      key: 'ServiceName'
    },
    {
      title: 'Giá dịch vụ',
      width: 80,
      align: 'center',
      dataIndex: 'ServicePrice',
      key: 'ServicePrice',
      render: (val) => (
        <div>{formatMoney(val)} VNĐ</div>
      )
    },
    {
      title: "Ngày đặt lịch",
      width: 80,
      dataIndex: "createdAt",
      align: "center",
      key: "createdAt",
      render: (val) => (
        <div>{dayjs(val).format("DD/MM/YYYY HH:mm")}</div>
      )
    },
  ]


  return (
    <div>
      <TableCustom
        isPrimary
        bordered
        noMrb
        showPagination
        dataSource={services}
        columns={columns}
        editableCell
        sticky={{ offsetHeader: -12 }}
        textEmpty="Không có dữ liệu"
        rowKey="_id"
        pagination={
          !!pagination?.PageSize
            ? {
              hideOnSinglePage: total <= pagination?.PageSize,
              current: pagination?.CurrentPage,
              pageSize: pagination?.PageSize,
              responsive: true,
              total,
              showSizeChanger: total > 10,
              locale: { items_per_page: "" },
              onChange: (CurrentPage, PageSize) =>
                setPagination(pre => ({
                  ...pre,
                  CurrentPage,
                  PageSize,
                })),
            }
            : false
        }
      />
    </div>
  )
}

export default StatisticServiceBooking