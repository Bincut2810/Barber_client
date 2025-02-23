import { Input, InputNumber } from 'antd'
import { InputWrapper } from './styled'

const InputCustom = ({
  type,
  placeholder,
  value,
  onChange,
  onPressEnter,
  suffix,
  disabled,
  isBigSize,
  ...remainProps
}) => {

  const ElementInput = type === "isPassword"
    ? Input.Password
    : type === "isTextArea"
      ? Input.TextArea
      : type === "isSearch"
        ? Input.Search
        : type === "isNumber"
          ? InputNumber
          : Input

  return (
    <InputWrapper isBigSize={isBigSize}>
      <ElementInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onPressEnter={onPressEnter}
        suffix={suffix}
        disabled={disabled}
        {...remainProps}
      />
    </InputWrapper>
  )
}

export default InputCustom