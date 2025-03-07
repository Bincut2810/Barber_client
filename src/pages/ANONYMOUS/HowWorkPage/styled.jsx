import { Button, Card, Typography } from "antd"
import styled, { keyframes } from "styled-components"

const { Title } = Typography

export const Container = styled.div`
  padding: 10px 20px;
  background: #f0f5ff;
`

export const StepCard = styled(Card)`
  transition: transform 0.3s, box-shadow 0.3s;
  border-radius: 20px;
  height: 400px !important;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }

  img {
    border-radius: 15px;
    margin-bottom: 15px;
    width: 100%;
    height: 200px; 
    object-fit: cover; 
  }
`
export const fadeInSlide = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`

export const AnimatedTitle = styled(Title)`
  animation: ${fadeInSlide} 1s ease-out;
  text-align: center;
  margin-bottom: 40px !important;
`
export const StyledButton = styled(Button)`
  margin-top: 25px;
  height: 50px;
  font-size: 18px;
  background-color: #40a9ff;
  border: none;
  border-radius: 25px;
  transition: transform 0.3s;

  &:hover {
    background-color: #1890ff;
    transform: scale(1.05);
  }
`

export const GuaranteeContainer = styled.div`
  background: #e6f7ff;
  padding: 40px 20px;
  border-radius: 20px;
  text-align: center;
  margin-top: 30px;

  .ant-divider-horizontal {
    border-top: 1px solid #d9d9d9;
  }
`