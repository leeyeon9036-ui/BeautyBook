import AdminDashboard from '../AdminDashboard';
import type { Booking } from '@shared/schema';

export default function AdminDashboardExample() {
  // Mock bookings data
  const mockBookings: Booking[] = [
    {
      id: 1,
      bookingDate: "2024-10-15",
      bookingTime: "14:00",
      name: "김철수",
      phone: "010-1234-5678",
      school: "고려대학교",
      studentId: "2024123456",
      email: "student@korea.ac.kr",
      location: "안암동",
      priceRange: "2-3만원",
      stylistGender: "무관",
      stylistAge: "20대",
      desiredStyle: "숏컷, 레이어드컷 원합니다",
      otherRequirements: "주차 가능한 곳 선호합니다",
      photoUrl: null,
      createdAt: new Date("2024-10-08T10:30:00"),
    },
    {
      id: 2,
      bookingDate: "2024-10-16",
      bookingTime: "11:30",
      name: "이영희",
      phone: "010-9876-5432",
      school: "성균관대학교",
      studentId: "2023987654",
      email: "student@skku.edu",
      location: "정릉동",
      priceRange: "3-4만원",
      stylistGender: "여성",
      stylistAge: "30대",
      desiredStyle: "파마 상담 원합니다",
      otherRequirements: null,
      photoUrl: null,
      createdAt: new Date("2024-10-08T09:15:00"),
    },
  ];

  const handleLogout = () => {
    console.log('Logout clicked');
    alert('로그아웃되었습니다');
  };

  return <AdminDashboard bookings={mockBookings} onLogout={handleLogout} />;
}
