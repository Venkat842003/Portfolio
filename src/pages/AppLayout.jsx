import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../ui/Loading";

function AppLayout() {
  return (
    <div className="bg-neutral-900 text-neutral-50 ">
      <Header />
      <main className="min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 max-w-7xl">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
