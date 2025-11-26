import { HashLoader } from "react-spinners";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex justify-center items-center py-20">
  <HashLoader
  color="#FFC4C4"
  size={100}
/>
    </div>

  )
}