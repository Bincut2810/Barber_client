import { Spin } from "antd"
import ListIcons from "../ListIcons"

const SpinCustom = ({
  spinning,
  ...remainProps
}) => {

  return (
    <Spin
      spinning={spinning}
      {...remainProps}
      indicator={ListIcons.ICON_LOADING}
    />
  )
}

export default SpinCustom