import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertAdminUserSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Booking submission
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.json({ success: true, booking });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, error: error.errors });
      } else {
        console.error("Error creating booking:", error);
        res.status(500).json({ success: false, error: "Failed to create booking" });
      }
    }
  });

  // Get all bookings (for admin)
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json({ success: true, bookings });
    } catch (error) {
      console.error("Error fetching bookings:", error);
      res.status(500).json({ success: false, error: "Failed to fetch bookings" });
    }
  });

  // Admin login
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ success: false, error: "Username and password required" });
      }

      const user = await storage.getAdminUser(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
      }

      res.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ success: false, error: "Login failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
