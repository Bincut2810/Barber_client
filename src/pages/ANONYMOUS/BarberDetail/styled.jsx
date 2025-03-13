import styled from "styled-components"

export const PatentChildBorder = styled.div`
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
`
export const TabStyled = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0;
    position: sticky;
    top: ${props => (!!props.isEdit ? "-12px" : 0)};
    background-color: #fff;
    /* z-index: 100; */
  }
  .ant-tabs-nav {
    :before {
      border: 1px solid #ccc;
    }
  }
  .ant-tabs .ant-tabs-tab + .ant-tabs-tab {
    margin-left: 8px;
  }
  .ant-tabs-tab {
    border: 1px solid #ccc !important;
  }
  .ant-tabs-tab-active {
    border-bottom: none !important;
  }
`

export const DivTimeContainer = styled.div`
  border: 1px solid var(--color-border-matte);
  padding: 8px;
  border-radius: 8px;
`

export const ServiceItemStyled = styled.div`
border-bottom: 1px solid #d1d4d6;
padding: 12px 0px;
`

export const TimeItemStyled = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
  &.active {
    background-color: var(--color-primary-hover);
    color: white
  }
  &.disabled {
    border: 1px solid var(--color-border-matte);
    color: var(--color-border-matte);
    cursor: not-allowed;
  }
`