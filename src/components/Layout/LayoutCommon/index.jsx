import { ContentContainerStyled, ContentStyled, LayoutStyled } from "../styled"

const LayoutCommon = ({ children }) => {


  return (
    <LayoutStyled>
      <ContentContainerStyled>
        <ContentStyled>
          {children}
        </ContentStyled>
      </ContentContainerStyled>
    </LayoutStyled>
  )
}

export default LayoutCommon