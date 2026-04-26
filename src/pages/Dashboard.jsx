import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {

  return (
    <div className="flex">
      <div className="w-35 text-base ">
        <Sidebar />
      </div>
      <div className=" px-4 flex-1 bg-neutral-800 ">
        <div className="p-6 ">
          <Outlet  />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
