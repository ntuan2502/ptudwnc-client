import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="min-h-screen w-full p-5">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
