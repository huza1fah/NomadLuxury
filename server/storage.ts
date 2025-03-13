import { users, type User, type InsertUser, tripRequests, type TripRequest, type InsertTripRequest } from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Trip request methods
  createTripRequest(request: InsertTripRequest): Promise<TripRequest>;
  getTripRequest(id: number): Promise<TripRequest | undefined>;
  getAllTripRequests(): Promise<TripRequest[]>;
}

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export class PostgresStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async createTripRequest(request: InsertTripRequest): Promise<TripRequest> {
    // Create a new object with the request data
    const tripRequestData = {
      ...request,
      // Convert ISO date strings to Date objects
      fromDate: new Date(request.fromDate),
      toDate: new Date(request.toDate),
      // Set default values for optional fields
      childrenAges: request.childrenAges || [],
      otherTravelReason: request.otherTravelReason || null,
      preferredHotel: request.preferredHotel || null,
      specialRequests: request.specialRequests || null,
      additionalInformation: request.additionalInformation || null
    };

    const result = await db.insert(tripRequests).values(tripRequestData).returning();
    return result[0];
  }

  async getTripRequest(id: number): Promise<TripRequest | undefined> {
    const result = await db.select().from(tripRequests).where(eq(tripRequests.id, id));
    return result[0];
  }

  async getAllTripRequests(): Promise<TripRequest[]> {
    return await db.select().from(tripRequests);
  }
}

export const storage = new PostgresStorage();