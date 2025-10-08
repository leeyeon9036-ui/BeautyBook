import { type Booking, type InsertBooking, type AdminUser } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  createBooking(booking: InsertBooking): Promise<Booking>;
  getAllBookings(): Promise<Booking[]>;
  getAdminUser(username: string): Promise<AdminUser | undefined>;
}

export class MemStorage implements IStorage {
  private bookings: Map<number, Booking>;
  private adminUsers: Map<number, AdminUser>;
  private bookingIdCounter: number = 1;
  private adminIdCounter: number = 1;

  constructor() {
    this.bookings = new Map();
    this.adminUsers = new Map();
    
    // Initialize default admin user (admin/1234)
    const defaultAdmin: AdminUser = {
      id: this.adminIdCounter++,
      username: "admin",
      password: "1234", // In production, this should be hashed
    };
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const booking: Booking = {
      ...insertBooking,
      id,
      desiredStyle: insertBooking.desiredStyle ?? null,
      otherRequirements: insertBooking.otherRequirements ?? null,
      photoUrl: insertBooking.photoUrl ?? null,
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getAdminUser(username: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(
      (user) => user.username === username
    );
  }
}

export const storage = new MemStorage();
