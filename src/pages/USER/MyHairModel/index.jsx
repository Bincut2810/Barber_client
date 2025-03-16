import { Col, Descriptions, Image, Row, Space } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import ButtonCustom from "src/components/MyButton/ButtonCustom"
import { globalSelector } from "src/redux/selector"
import ResultSetting from "./components/ResultSetting"

const MyHairModel = () => {

  const { user } = useSelector(globalSelector)
  const [openResultSetting, setOpenResultSetting] = useState(false)


  return (
    <Row>
      <Col span={24}>
        <Descriptions
          title="Mẫu tóc bạn đã tạo"
          bordered
          layout="vertical"
          items={
            !!user?.Results?.length
              ? [{
                key: "1",
                label: "Khách hàng có thể nhìn thấy những mẫu tóc bạn đã tạo",
                children: (
                  <Space>
                    {
                      user?.Results?.map(i =>
                        <Image style={{ width: '150px', height: "130px" }} key={i} src={i} />
                      )
                    }
                  </Space>
                ),
              }]
              : []
          }
          extra={
            <Space>
              <ButtonCustom
                className="third-type-2"
                onClick={() => setOpenResultSetting(true)}
              >
                Chỉnh sửa
              </ButtonCustom>
            </Space>
          }
        />
      </Col>

      {
        !!openResultSetting &&
        <ResultSetting
          open={openResultSetting}
          onCancel={() => setOpenResultSetting(false)}
        />
      }

    </Row>
  )
}

export default MyHairModel