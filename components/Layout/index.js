import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
