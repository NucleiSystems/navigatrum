import { useDispatch } from "react-redux";
import { removeToken } from "../slices/tokenStore";

const Logout = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>logout</h1>
      <button
        onClick={() => {
          dispatch(removeToken());
        }}
      >
        logout
      </button>
    </div>
  );
};
export default Logout;
