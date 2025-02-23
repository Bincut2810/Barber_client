import styled from "styled-components"

export const BarberListItemStyled = styled.div`
  border: 1px solid var(--color-border-matte);
  padding: 12px;
  &:hover{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
  .border {
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-border-matte);
  }
`