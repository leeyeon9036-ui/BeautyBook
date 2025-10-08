import { type Booking, type InsertBooking, type AdminUser, bookings, adminUsers } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getAdminUser(username: string): Promise<AdminUser | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const [booking] = await db
      .insert(bookings)
      .values({
        ...insertBooking,
        desiredStyle: insertBooking.desiredStyle || null,
        otherRequirements: insertBooking.otherRequirements || null,
        photoUrl: insertBooking.photoUrl || null,
      })
      .returning();
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    const allBookings = await db.select().from(bookings).orderBy(bookings.createdAt);
    return allBookings.reverse();
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    const [user] = await db.select().from(adminUsers).where(eq(adminUsers.username, username));
    return user || undefined;
  }
}

export const storage = new DatabaseStorage();
