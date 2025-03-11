import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes (/api/register, /api/login, /api/logout, /api/user)
  setupAuth(app);

  // Handle enquiry submission
  app.post("/api/enquiries", async (req, res) => {
    try {
      const enquiry = await storage.createEnquiry(req.body);
      res.status(201).json(enquiry);
    } catch (error) {
      res.status(500).json({ message: "Error creating enquiry" });
    }
  });

  // Get all enquiries (protected, admin only)
  app.get("/api/enquiries", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    try {
      const enquiries = await storage.getAllEnquiries();
      res.json(enquiries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enquiries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}