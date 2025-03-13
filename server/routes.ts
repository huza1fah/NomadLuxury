import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import express from "express";
import { insertTripRequestSchema } from "@shared/schema";
import { eq } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add JSON parsing middleware
  app.use(express.json());

  // Trip request endpoint
  app.post("/api/trip-requests", async (req, res) => {
    try {
      // Validate request body against schema
      const validatedData = insertTripRequestSchema.parse(req.body);

      // Save trip request to database
      const tripRequest = await storage.createTripRequest(validatedData);

      res.status(201).json(tripRequest);
    } catch (error) {
      console.error("Error creating trip request:", error);
      res.status(400).json({ 
        error: error instanceof Error ? error.message : "Invalid request data" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}