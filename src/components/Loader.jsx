import { FadeLoader } from "react-spinners";

const Loader = () => {
  return (
    <p className="centered-message">
      <FadeLoader color="#82bceb" height={7} margin={3} />
    </p>
  );
};

export default Loader;
