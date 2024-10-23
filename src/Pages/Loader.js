import { FadeLoader } from "react-spinners";
import { useLockBodyScroll } from "@uidotdev/usehooks";

export function Loader() {
  useLockBodyScroll();

  return (
    <div className="flex justify-center items-center bg-white bg-opacity-75 fixed w-full h-full z-[9999]">
      <FadeLoader color="#514a9d" />
    </div>
  );
}
