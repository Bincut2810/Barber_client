import { Descriptions, Empty } from "antd"
import { formatMoney } from "src/lib/stringUtils"

const Service = ({ user }) => {


  return (
    <div className="p-12">
      {
        !!user?.Services?.length ?
          <Descriptions
            items={
              user?.Services?.map(i => ({
                key: i?._id,
                label: i?.ServiceName,
                children: formatMoney(i?.ServicePrice)
              }))
            }
          />
          : <Empty description={`${user?.FullName} chưa điền thông tin này`} />
      }
    </div>
  )
}

export default Service