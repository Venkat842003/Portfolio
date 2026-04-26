import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../ui/Loading";

function AppLayout() {
  return (
    <div className="bg-neutral-900 text-neutral-50">
      <Header />
      <main className="mx-auto max-w-5/6 min-h-screen  px-8  pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
