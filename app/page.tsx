// app/page.tsx
'use client';

import { ModalProvider } from '@/contexts/ModalContext';
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import ExploreProducts from '@/components/home/ExploreProducts';
import IndustryCTA from '@/components/ui/IndustryCTA';
import SlideModal from '@/components/ui/SlideModal';
import WhoWeServe from "@/components/home/WhoWeServe";
import ProductAtarBoxSetion from "@/components/products/ProductAtarBoxSetion";
import NikahNamaBox from "@/components/products/NikahNamaBox";
import ManufacturingProcess from "@/components/home/ManufacturingProcess";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import ContactForm from "@/components/home/ContactForm";
import MapSection from "@/components/home/MapSection"; // 👈 NEW IMPORT
import { FloatingButtons } from '@/components/ui/FloatingButtons';
import homepageData from '@/data/homepage.json';
import { useModal } from '@/contexts/ModalContext';

// Inner component that uses the modal context
function HomeContent() {
  const { isModalOpen, closeModal } = useModal();

  return (
    <>
      <Hero />
      <About />
      <WhyChooseUs />
      <FeaturedProducts data={homepageData.featuredProducts} />
      <IndustryCTA />
      
      <NikahNamaBox data={{
        heading: "Nikah Nama Box",
        description: "Discover our luxury collection",
        cta: {
          text: "View All Products",
          href: "/products"
        }
      }} />
      
      <WhoWeServe />
      
      <ProductAtarBoxSetion data={{
        heading: "Premium Attar Boxes",
        description: "Discover our luxury collection",
        cta: {
          text: "View All Products",
          href: "/products"
        }
      }} />
      
      {/* <ExploreProducts data={homepageData.exploreProducts} /> */}
     
      <ManufacturingProcess />
      <Testimonials />
      <FAQ />
      <ContactForm />
      
      {/* 🗺️ NEW MAP SECTION - Clean and professional */}
      <MapSection />
      
      {/* Floating Buttons */}
      <FloatingButtons />
      
      <SlideModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

// Main component with Provider
export default function Home() {
  return (
    <ModalProvider>
      <HomeContent />
    </ModalProvider>
  );
}


// const onFormSubmit = (event: React.FormEvent) => {
//   event.preventDefault();
//   // Handle form submission logic here
//   console.log("Form submitted");
//   fetch('/api/send-email',{
//     method: 'POST',
//     cache: 'no-cache',
//     body: JSON.stringify({
//       name,
//       email
//   }),
//   headers:{
//     'Content-Type': 'application/json'
//   }
// })
// .then(res => res.json())
// .then(data => {
//   console.log('Success:', data);
// });

// }