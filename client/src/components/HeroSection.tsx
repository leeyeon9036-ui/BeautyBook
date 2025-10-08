import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToForm = () => {
    const formElement = document.getElementById('booking-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[50vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 md:py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          성북구 대학생 미용실 예약
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          빠르고 편리하게 원하는 스타일의 미용실을 찾아드립니다
        </p>
        <button
          onClick={scrollToForm}
          className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          data-testid="button-scroll-to-form"
        >
          <span>예약 신청하기</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
