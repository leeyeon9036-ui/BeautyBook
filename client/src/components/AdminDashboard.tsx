import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Calendar, User, Phone, Mail, MapPin, DollarSign, Scissors } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import type { Booking } from "@shared/schema";

interface AdminDashboardProps {
  bookings: Booking[];
  onLogout: () => void;
}

export default function AdminDashboard({ bookings, onLogout }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">예약 관리</h1>
          <Button onClick={onLogout} variant="outline" data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">전체 예약 현황</h2>
          <p className="text-sm text-muted-foreground">
            총 {bookings.length}건의 예약 신청이 접수되었습니다.
          </p>
        </div>

        {bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">아직 접수된 예약이 없습니다.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-6" data-testid={`card-booking-${booking.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{booking.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      신청일: {format(new Date(booking.createdAt), "PPP HH:mm", { locale: ko })}
                    </p>
                  </div>
                  <Badge data-testid={`badge-status-${booking.id}`}>대기중</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">예약 일시:</span>
                      <span>{booking.bookingDate} {booking.bookingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">전화번호:</span>
                      <span>{booking.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">이메일:</span>
                      <span>{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">학교/학번:</span>
                      <span>{booking.school} ({booking.studentId})</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">희망 위치:</span>
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">가격대:</span>
                      <span>{booking.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Scissors className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">미용사:</span>
                      <span>{booking.stylistGender} / {booking.stylistAge}</span>
                    </div>
                  </div>
                </div>

                {(booking.desiredStyle || booking.otherRequirements) && (
                  <div className="mt-4 pt-4 border-t space-y-2">
                    {booking.desiredStyle && (
                      <div className="text-sm">
                        <span className="font-medium">원하는 스타일:</span>
                        <p className="mt-1 text-muted-foreground">{booking.desiredStyle}</p>
                      </div>
                    )}
                    {booking.otherRequirements && (
                      <div className="text-sm">
                        <span className="font-medium">기타 요구사항:</span>
                        <p className="mt-1 text-muted-foreground">{booking.otherRequirements}</p>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
