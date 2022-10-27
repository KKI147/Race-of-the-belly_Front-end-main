import { useSelector } from "react-redux";
import MainCard from "../../components/MainCard";

function RestaurantList() {
  const user = useSelector((state) => state.user.data);
  console.log(user);
  return (
    <>
      <MainCard />
    </>
  );
}

export default RestaurantList;
