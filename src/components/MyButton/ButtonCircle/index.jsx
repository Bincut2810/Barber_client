import { Tooltip } from "antd"
import { ButtonCicleStyled } from "./styled"
import "../style.scss"

const ButtonCircle = ({
  title,
  icon,
  onClick,
  disabled,
  placement = "top",
  ...remainProps
}) => {

  return (
    <Tooltip
      title={title}
      placement={placement}
      arrow={false}
    >
      <ButtonCicleStyled
        icon={icon}
        onClick={onClick}
        disabled={disabled}
        {...remainProps}
      >
        {remainProps?.children}
      </ButtonCicleStyled>
    </Tooltip>
  )
}

export default ButtonCircle