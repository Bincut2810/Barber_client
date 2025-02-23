import { Button } from "antd"
import "../style.scss"

const ButtonCustom = ({
  className,
  onClick,
  loading,
  disabled,
  icon,
  ...remainProps
}) => {

  return (
    <Button
      className={className}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      icon={icon}
      {...remainProps}
    >
      {remainProps?.children}
    </Button>
  )
}

export default ButtonCustom