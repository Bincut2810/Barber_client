import { ModalCustomStyled } from "./styled"


const ModalCustom = ({
  open,
  onCancel,
  title,
  width,
  footer,
  closable,
  centered = true,
  ...remainProps
}) => {

  return (
    <ModalCustomStyled
      open={open}
      onCancel={onCancel}
      title={title}
      width={width}
      footer={footer}
      closable={closable}
      centered={centered}
      {...remainProps}
    >
      {remainProps?.children}
    </ModalCustomStyled>
  )
}

export default ModalCustom