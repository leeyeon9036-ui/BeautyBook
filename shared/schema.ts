import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const bookings = pgTable("bookings", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  bookingDate: text("booking_date").notNull(),
  bookingTime: text("booking_time").notNull(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  school: text("school").notNull(),
  studentId: text("student_id").notNull(),
  email: text("email").notNull(),
  location: text("location").notNull(),
  priceRange: text("price_range").notNull(),
  stylistGender: text("stylist_gender").notNull(),
  stylistAge: text("stylist_age").notNull(),
  desiredStyle: text("desired_style"),
  otherRequirements: text("other_requirements"),
  photoUrl: text("photo_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const adminUsers = pgTable("admin_users", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

const baseBookingSchema = createInsertSchema(bookings, {
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  phone: z.string().min(10, "올바른 전화번호를 입력해주세요"),
});

export const insertBookingSchema = baseBookingSchema.pick({
  bookingDate: true,
  bookingTime: true,
  name: true,
  phone: true,
  school: true,
  studentId: true,
  email: true,
  location: true,
  priceRange: true,
  stylistGender: true,
  stylistAge: true,
  desiredStyle: true,
  otherRequirements: true,
  photoUrl: true,
});

export const selectBookingSchema = createSelectSchema(bookings);

const baseAdminUserSchema = createInsertSchema(adminUsers);

export const insertAdminUserSchema = baseAdminUserSchema.pick({
  username: true,
  password: true,
});

export const selectAdminUserSchema = createSelectSchema(adminUsers);

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type AdminUser = typeof adminUsers.$inferSelect;
export type InsertAdminUser = z.infer<typeof insertAdminUserSchema>;
