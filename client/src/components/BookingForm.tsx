import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { cn } from "@/lib/utils";

const seongbukDongs = [
  "안암동", "보문동", "정릉동", "길음동", "종암동",
  "동선동", "삼선동", "성북동", "돈암동", "월곡동",
  "장위동", "석관동", "하월곡동", "상월곡동"
];

const timeSlots = Array.from({ length: 23 }, (_, i) => {
  const hour = Math.floor(9 + i * 0.5);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2, '0')}:${minute}`;
}).filter((_, i) => i < 23);

const priceRanges = ["1만원 이하", "1-2만원", "2-3만원", "3-4만원", "4-5만원", "5만원 이상"];
const genderOptions = ["무관", "남성", "여성"];
const ageRanges = ["무관", "20대", "30대", "40대", "50대 이상"];

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      bookingDate: "",
      bookingTime: "",
      name: "",
      phone: "",
      school: "",
      studentId: "",
      email: "",
      location: "",
      priceRange: "",
      stylistGender: "",
      stylistAge: "",
      desiredStyle: "",
      otherRequirements: "",
      photoUrl: "",
    },
  });

  const onSubmit = async (values: InsertBooking) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (data.success) {
        alert("예약 신청이 완료되었습니다!");
        form.reset();
        setSelectedDate(undefined);
        setPhotoFile(null);
      } else {
        alert("예약 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("예약 신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      console.log("Photo selected:", file.name);
    }
  };

  return (
    <section id="booking-form" className="max-w-3xl mx-auto px-4 py-12 md:py-20">
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">예약 신청서</h2>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">예약 정보</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="bookingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>예약 날짜 *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "pl-3 text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                              data-testid="button-date-picker"
                            >
                              {selectedDate ? (
                                format(selectedDate, "PPP", { locale: ko })
                              ) : (
                                <span>날짜 선택</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date);
                              field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bookingTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>시간대 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-time">
                            <SelectValue placeholder="시간 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60">
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>이름 *</FormLabel>
                      <FormControl>
                        <Input placeholder="홍길동" {...field} data-testid="input-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>전화번호 *</FormLabel>
                      <FormControl>
                        <Input placeholder="010-1234-5678" {...field} data-testid="input-phone" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>학교 *</FormLabel>
                      <FormControl>
                        <Input placeholder="OO대학교" {...field} data-testid="input-school" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="studentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>학번 *</FormLabel>
                      <FormControl>
                        <Input placeholder="2024123456" {...field} data-testid="input-student-id" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>이메일 *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@university.ac.kr" {...field} data-testid="input-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">요구사항</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>위치 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-location">
                            <SelectValue placeholder="동 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60">
                          {seongbukDongs.map((dong) => (
                            <SelectItem key={dong} value={dong}>
                              {dong}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priceRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>가격 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-price">
                            <SelectValue placeholder="가격대 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {priceRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="stylistGender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>미용사 성별 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-stylist-gender">
                            <SelectValue placeholder="성별 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {genderOptions.map((gender) => (
                            <SelectItem key={gender} value={gender}>
                              {gender}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stylistAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>미용사 연령대 *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-stylist-age">
                            <SelectValue placeholder="연령대 선택" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {ageRanges.map((age) => (
                            <SelectItem key={age} value={age}>
                              {age}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="desiredStyle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>원하는 스타일</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="예: 숏컷, 레이어드컷, 파마 등 원하는 스타일을 자유롭게 작성해주세요"
                        className="resize-none"
                        rows={3}
                        {...field}
                        value={field.value ?? ""}
                        data-testid="textarea-desired-style"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="otherRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기타</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="추가로 요청하실 사항을 작성해주세요"
                        className="resize-none"
                        rows={3}
                        {...field}
                        value={field.value ?? ""}
                        data-testid="textarea-other-requirements"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>사진 업로드</FormLabel>
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover-elevate transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                    data-testid="input-photo"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {photoFile ? photoFile.name : "원하는 스타일 사진을 업로드하세요"}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-xs text-muted-foreground mb-4 text-center">
                * 제출하신 정보는 안전하게 보관되며, 예약 처리 목적으로만 사용됩니다.
              </p>
              <Button type="submit" className="w-full" size="lg" data-testid="button-submit">
                예약 신청하기
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </section>
  );
}
