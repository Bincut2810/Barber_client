import { Descriptions } from "antd"
import dayjs from "dayjs"
import { useSelector } from "react-redux"
import { getListComboKey } from "src/lib/commonFunction"
import { SYSTEM_KEY } from "src/lib/constant"
import { globalSelector } from "src/redux/selector"

const Information = ({ user }) => {

  const { listSystemKey } = useSelector(globalSelector)
  const gender = getListComboKey(SYSTEM_KEY.GENDER, listSystemKey)

  const commonItemInfor = [
    {
      key: '1',
      label: 'Tên',
      children: user?.FullName,
    },
    {
      key: '2',
      label: 'Năm sinh',
      children: !!user?.DateOfBirth
        ? dayjs(user?.DateOfBirth).format("DD/MM/YYYY")
        : null,
    },
    {
      key: '3',
      label: "Địa chỉ",
      children: user?.Address,
    },
    {
      key: '4',
      label: 'Số điện thoại',
      children: user?.Phone,
    },
    {
      key: '5',
      label: 'Giới tính',
      children: gender?.find(i => i?.ParentID === user?.Gender)?.ParentName,
    },
  ]


  return (
    <div className="p-12">
      <Descriptions
        items={commonItemInfor}
      />
    </div>
  )
}

export default Information