import { BarberListItemStyled } from "../styled"

const BarberListItem = ({ item }) => {
  return (
    <BarberListItemStyled>
      <img
        src={item?.AvatarPath}
        alt=""
        style={{ width: "100%", height: "350px" }}
        className="mb-12"
      />
      <div className="fw-600 mb-6">{item?.FullName}</div>
      <div className="fs-14 gray-text">{item?.Address}</div>
    </BarberListItemStyled>
  )
}

export default BarberListItem