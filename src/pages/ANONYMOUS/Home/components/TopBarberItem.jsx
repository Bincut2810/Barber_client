import { Rate } from "antd"
import { BarberListItemStyled } from "../../BarberList/styled"

const TopBarberItem = ({ item }) => {
  return (
    <BarberListItemStyled>
      <img
        src={item?.AvatarPath}
        alt=""
        style={{ width: "100%", height: "280px" }}
        className="mb-12"
      />
      <div className="fw-600 mb-8">{item?.FullName}</div>
      <Rate
        value={item?.TotalStars / item?.Stars?.length}
        disabled
        style={{
          fontSize: "15px"
        }}
      />
    </BarberListItemStyled>
  )
}

export default TopBarberItem