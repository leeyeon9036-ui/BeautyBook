import { Calendar, Scissors, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const benefits = [
  {
    icon: Calendar,
    title: "빠른 예약",
    description: "원하는 날짜와 시간에 맞춰 빠르게 예약하세요"
  },
  {
    icon: Scissors,
    title: "맞춤 추천",
    description: "학생에게 맞는 최적의 미용실을 찾아드립니다"
  },
  {
    icon: Star,
    title: "학생 할인",
    description: "대학생 전용 특별 할인 혜택을 받으세요"
  }
];

export default function ServiceBenefits() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon;
          return (
            <Card key={index} className="p-6 text-center" data-testid={`card-benefit-${index}`}>
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
