import { BarberListItemStyled } from "../styled"

const BarberListItem = ({ item }) => {
  return (
    <BarberListItemStyled>
      <img
        src={item?.AvatarPath}
        alt=""
        style={{ width: "100%", height: "400px" }}
        className="mb-12"
      />
      <div className="fw-600">{item?.FullName}</div>
      <div className="fs-14 gray-text">{item?.Address}</div>
    </BarberListItemStyled>
  )
}

export default BarberListItem