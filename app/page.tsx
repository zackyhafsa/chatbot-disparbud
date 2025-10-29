import BudayaSection from "./components/BudayaSection";
import CtaSection from "./components/CtaSection";
import DestinasiSection from "./components/DestinasiSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import KulinerSection from "./components/KulinerSection";
import Robot from "./components/Robot";

const page = () => {
  return (
    <>
      <main>
        <HeroSection />
        <DestinasiSection />
        <BudayaSection />
        <KulinerSection />
        <CtaSection />
        <Robot />
      </main>
      <Footer />
    </>
  );
};

export default page;
