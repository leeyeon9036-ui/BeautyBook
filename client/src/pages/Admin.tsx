import { useState } from "react";
import AdminLogin from "@/components/AdminLogin";
import AdminDashboard from "@/components/AdminDashboard";
import type { Booking } from "@shared/schema";

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings] = useState<Booking[]>([]);

  const handleLogin = (username: string, password: string) => {
    // Simple authentication check
    if (username === "admin" && password === "1234") {
      setIsLoggedIn(true);
    } else {
      alert("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard bookings={bookings} onLogout={handleLogout} />;
}
