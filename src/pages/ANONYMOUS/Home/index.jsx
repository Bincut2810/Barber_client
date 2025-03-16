import { Col, Row } from "antd"
import ChooseHairstyle from "./components/ChooseHairstyle"
import HomeItem from "./components/HomeItem"
import { useEffect, useState } from "react"
import UserService from "src/services/UserService"
import TopBarberItem from "./components/TopBarberItem"
import ButtonCircle from "src/components/MyButton/ButtonCircle"
import ListIcons from "src/components/ListIcons"
import { useNavigate } from "react-router-dom"
import Router from "src/routers"

const Home = () => {

  const hairThickness = [
    {
      image: "https://static.wixstatic.com/media/e8e291_26611e1d1f484f83ba68616da1a33d84~mv2.png/v1/fill/w_154,h_139,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2011_46_12.png",
      btn: "Tóc mỏng",
      content: "Tóc phân bố thưa, mỏng, dễ thấy da đầu"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_f08d2e072e36499dae9376a085c5b9df~mv2.png/v1/fill/w_146,h_139,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2011_46_25.png",
      btn: "Tóc vừa",
      content: "Tóc vừa, ít lộ da đầu"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_02065483442c4fe59e7b911868823195~mv2.png/v1/fill/w_154,h_139,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2011_46_19.png",
      btn: "Tóc dày",
      content: "Tóc dày, không thấy được da đầu"
    }
  ]

  const fashionStyle = [
    {
      image: "https://static.wixstatic.com/media/e8e291_a6bdfb864c3547e7a51742e2cbf5a463~mv2.png/v1/fill/w_246,h_121,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2012_15_06.png",
      btn: "Trang trọng",
      content: "Dành cho các anh văn phòng, hay diện quần tây, áo sơ mi, polo hoặc suite"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_7a9deef81d794bc3b8f002c9a95f625d~mv2.png/v1/fill/w_256,h_128,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2012_15_46.png",
      btn: "Thoải mái",
      content: "Phong cách thường nhật, áo thun, quần bò, thoải mái ít chăm chút"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_363578c42d51452e89929e95da4b4261~mv2.png/v1/fill/w_245,h_121,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2012_16_31.png",
      btn: "Thể thao",
      content: "​Dành cho các anh ưu tiên tính chất mạnh mẽ, thể thao"
    }
  ]

  const stylingFrequency = [
    {
      image: "https://static.wixstatic.com/media/e8e291_672d2a5721d0413c96e7b64bad803e7c~mv2.png/v1/fill/w_129,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-03%20l%C3%BAc%2009_33_54.png",
      btn: "Mỗi ngày",
      content: "Thường xuyên chải chuốt và dùng nhiều sản phẩm dưỡng tóc, tạo kiểu"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_846077a1772f4f7e99e1e4c1d3d70964~mv2.png/v1/fill/w_129,h_136,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-03%20l%C3%BAc%2009_33_47.png",
      btn: "2-3 lần/tuần",
      content: "Sử dụng khi cần, không dùng mỗi ngày"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_2d7a2a51882e46e593e7aacca89dcba5~mv2.png/v1/fill/w_69,h_91,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-03%20l%C3%BAc%2009_31_38.png",
      btn: "Theo dịp",
      content: "Chỉ dùng khi có dịp quan trọng, lễ, tiệc, hẹn hò..."
    }
  ]

  const hairStyle = [
    {
      image: "https://static.wixstatic.com/media/e8e291_0f8bde605c91402e8fed450a7db90b25~mv2.png/v1/fill/w_66,h_114,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2011_38_16.png",
      btn: "Tóc thẳng",
      content: "Chất tóc cọng thẳng, cứng, hơi chỉa"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_06c33d1d0c314c58a8a9e072375c108d~mv2.png/v1/fill/w_98,h_119,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2011_38_22.png",
      btn: "Tóc gợn",
      content: "Chất tóc gợn, bồng bềnh, gợn sóng"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_e444ae97490d49b6bdfc2b345b9677e0~mv2.png/v1/fill/w_89,h_109,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/%E1%BA%A2nh%20m%C3%A0n%20h%C3%ACnh%202024-09-02%20l%C3%BAc%2011_38_28.png",
      btn: "Tóc xoăn",
      content: "Chất tóc xoăn, dễ rối và xù"
    }
  ]

  const faceShape1 = [
    {
      image: "https://static.wixstatic.com/media/e8e291_7f3b305d97ea42eda85f41f523621e1e~mv2.png/v1/fill/w_159,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e8e291_7f3b305d97ea42eda85f41f523621e1e~mv2.png",
      btn: "Mặt tròn",
      content: "Khoảng cách từ gò má đến cằm của bạn gần bằng chiều dài khuôn mặt"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_cf4fdfa2dcf64938bc0b2f040d65a9d6~mv2.png/v1/fill/w_159,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e8e291_cf4fdfa2dcf64938bc0b2f040d65a9d6~mv2.png",
      btn: "Mặt kim cương",
      content: "Bạn có gò má cao và xương hàm rộng"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_6e3b0211b3a4493b8960654aa62a9ba4~mv2.png/v1/fill/w_159,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e8e291_6e3b0211b3a4493b8960654aa62a9ba4~mv2.png",
      btn: "Mặt dài",
      content: "Chiều dài gương mặt dài hơn nhiều so với chiều ngang"
    }
  ]

  const faceShape2 = [
    {
      image: "https://static.wixstatic.com/media/e8e291_20a3741cba7645a38fc038cc61a6e6e4~mv2.png/v1/fill/w_159,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e8e291_20a3741cba7645a38fc038cc61a6e6e4~mv2.png",
      btn: "Mặt vuông",
      content: "Chiều dài dương mặt và chiêu ngang gần tương đương, hàm góc cạnh"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_edc92483ce0e424eac24f4577747a4b6~mv2.png/v1/fill/w_159,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e8e291_edc92483ce0e424eac24f4577747a4b6~mv2.png",
      btn: "Mặt trái xoan",
      content: "Gương mặt lý tưởng, khi khuôn tròn chiều dài cân đối so với ngang"
    },
    {
      image: "https://static.wixstatic.com/media/e8e291_dbd0b07c6e2b4f3890a3c3c44b92fcb2~mv2.png/v1/fill/w_159,h_183,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e8e291_dbd0b07c6e2b4f3890a3c3c44b92fcb2~mv2.png",
      btn: "Mặt tam giác",
      content: "Chiều dài phần trán nhỏ hơn chiều rộng xương hàm"
    }
  ]

  const [loading, setLoading] = useState(false)
  const [topBarbers, setTopBarbers] = useState([])
  const navigate = useNavigate()

  const getListTopBarber = async () => {
    try {
      setLoading(true)
      const res = await UserService.getListTopBarber()
      if (!!res?.isError) return
      setTopBarbers(res?.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getListTopBarber()
  }, [])


  return (
    <div className="d-flex-center">
      <Row gutter={[0, 16]} style={{ width: '70%' }}>
        <Col span={24} className="mb-90">
          <ChooseHairstyle />
        </Col>
        <Col span={24} className="mb-90">
          <HomeItem
            title="Độ dày của tóc"
            items={hairThickness}
          />
        </Col>
        <Col span={24} className="mb-90">
          <HomeItem
            title="Phong cách thời trang"
            items={fashionStyle}
          />
        </Col>
        <Col span={24} className="mb-90">
          <HomeItem
            title="Tần suất tạo kiểu tóc"
            items={stylingFrequency}
          />
        </Col>
        <Col span={24} className="mb-90">
          <HomeItem
            title="Form dáng tóc"
            items={hairStyle}
          />
        </Col>
        <Col span={24} className="mb-90">
          <HomeItem
            title="Dáng mặt"
            items={faceShape1}
          />
          <HomeItem
            items={faceShape2}
          />
        </Col>
        <Col span={24} className="mb-90">
          <div className="d-flex-center mb-20">
            <div className="center-text fs-30 fw-600 mr-8">Barber được đánh giá cao nhất</div>
            <ButtonCircle
              icon={ListIcons.ICON_NEXT}
              title="Xem nhiều barber hơn"
              onClick={() => navigate(Router.DANH_SACH_BARBER)}
            />
          </div>
          <Row gutter={[12]}>
            {
              topBarbers?.map(i =>
                <Col
                  key={i?._id}
                  span={8}
                  className="cursor-pointer"
                  onClick={() => navigate(`${Router.CHI_TIET_BARBER}/${i?._id}`)}
                >
                  <TopBarberItem item={i} />
                </Col>
              )
            }
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Home