import styled from "styled-components"

export const InputWrapper = styled(({ isBigSize, ...rest }) => <div {...rest} />)`
  .ant-input {
    background-color: white !important;
    color: rgb(0, 0, 0) !important;
    padding: ${props => props.isBigSize ? "8px" : ""} !important;
  }

  .ant-input-search .ant-input-affix-wrapper {
    height: auto !important;
  }

  .ant-input-search .ant-input-search-button {
    height: ${props => props.isBigSize ? "48px" : ""} !important;
    width: ${props => props.isBigSize ? "50px" : ""} !important;
    font-size: ${props => props.isBigSize ? "16px" : ""} !important;
  }

  .ant-input-outlined:hover,
  .ant-input-outlined:active,
  .ant-input-outlined:focus {
    border: 1px solid var(--color-primary-hover) !important;
    background-color: white !important;
  }

  .ant-input-outlined:focus-within {
    box-shadow: none !important;
    border: 1px solid var(--color-primary-hover) !important;
    background-color: white !important;
  }

  .anticon.ant-input-password-icon {
    border-color: transparent !important;
    &:hover {
      color: rgba(0, 0, 0, 0.45) !important;
    }
  }

  .ant-input-search>.ant-input-group>.ant-input-group-addon:last-child .ant-input-search-button:not(.ant-btn-primary):hover {
    color: var(--color-primary-hover);
  }

  .ant-input-outlined.ant-input-disabled {
    border-color: rgba(0, 0, 0, 0.25) !important;
    color: rgba(0, 0, 0, 0.25) !important;
  }
  .ant-input-search .ant-input:focus+.ant-input-group-addon .ant-input-search-button:not(.ant-btn-primary),
  .ant-btn-variant-outlined:not(:disabled):not(.ant-btn-disabled):hover {
    border-color: var(--color-primary)
  }
  .ant-input-number-outlined:hover,
  .ant-input-number-outlined:focus-within {
    border-color: var(--color-primary-hover) !important;
  }
 
`