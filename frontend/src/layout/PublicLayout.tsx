import { Outlet } from "react-router-dom";
import { Footer } from "../components/Footer/Footer";

const PublicLayout = () => {
  return (
    <>
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
