import HeroSection from "@/components/HeroSection";
import ServiceBenefits from "@/components/ServiceBenefits";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServiceBenefits />
      <BookingForm />
      
      <footer className="border-t py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>성북구 대학생 미용실 예약 대행 서비스</p>
          <p className="mt-2">문의: contact@example.com</p>
        </div>
      </footer>
    </div>
  );
}
