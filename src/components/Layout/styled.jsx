import { Badge } from "antd"
import styled from "styled-components"

export const LayoutStyled = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
justify-content: space-between;
margin-top: 60px;
`

export const ContentContainerStyled = styled.div`
 flex-grow: 1;
`

export const ContentStyled = styled.div`
  width: 80%;
  margin: auto;
  margin-bottom: 30px;
`

export const HeaderContainerStyled = styled.div`
  box-shadow: rgba(183, 189, 195, 0.2) 0px 8px 24px;
  border-bottom: 1px solid var(--color-border-matte);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 90; 
  background-color: white;
`

export const HeaderStyled = styled.div`
  max-width: 90%;
  margin: auto;
 .ant-menu-horizontal {
    border-bottom: none !important;
  }
`
export const BadgeStyled = styled(Badge)`
  .ant-badge,
  .ant-badge-count {
    position: absolute;
    top: 0;
    inset-inline-end: 0;
    transform: translate(0%, -40%);
    transform-origin: 100% 0%;
  }
`

export const FooterContainer = styled.div`
  border-top: 1px solid var(--color-border-matte);
  margin-top: 45px;
`
export const FooterStyled = styled.div`
  width: 85%;
  margin: auto;
  /* padding: 30px 20px; */
`

export const ChatBoxContainerStyled = styled.div`
  border-top-right-radius: 8px;
  background-color: white;
  border-top-left-radius: 8px;
  min-width: 450px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  padding: 8px 12px;
  margin-right: 400px;
  /* position: fixed; 
  right: 20px;
  bottom: 20px;  */
  z-index: 1000; 
  .header {
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid var(--color-border-matte);
  }
  .messages {
    height: 400px;
  }
`

export const MenuAdminStyled = styled.div`
height: calc(100vh - 85px) !important;
display: flex;
flex-direction: column;
justify-content: space-between;
.ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title {
  color: var(--color-primary) !important;
}
.menu-container {
  border: 1px solid #ddd;
  height: calc(100% - 44px);
  overflow: hidden auto;
  padding: 12px 0;
  &::-webkit-scrollbar {
      width: 0px;
    }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    box-shadow: unset;
  }
  &::-webkit-scrollbar-thumb {
    background: #c5ced9;
    border-radius: 30px;
  }
}
.collapsed-menu {
  padding: 12px 20px;
  border: 1px solid #ddd;
}
.ant-menu-light.ant-menu-root.ant-menu-inline {
  border-inline-end: none !important
}
.ant-menu-light .ant-menu-item-selected {
  background-color: var(--color-primary-hover) !important;
  color: white;
}
`
export const ContentAdminContainerStyled = styled.div`
  height: calc(100vh - 85px) !important;
  padding: 16px 20px;
  border-top: 1px solid var(--color-border-matte);
  overflow: hidden auto;
`

export const MenuUserStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .ant-menu-item {
    border-bottom: 1px solid var(--color-border-matte) !important;
    padding: 26px 16px !important;
  }
  .ant-menu-light .ant-menu-submenu-selected >.ant-menu-submenu-title {
    color: var(--color-primary) !important;
  }
  .collapsed-menu {
    padding: 12px 20px;
    border: 1px solid #ddd;
  }
  .ant-menu-light.ant-menu-root.ant-menu-inline {
    border-inline-end: none !important
  }
  .ant-menu-light .ant-menu-item-selected {
    background-color: var(--color-primary-hover) !important;
    color: white;
  } 
`