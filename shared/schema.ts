import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const tripRequests = pgTable("trip_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  bestTimeToContact: text("best_time_to_contact").notNull(),
  referralSource: text("referral_source").notNull(),

  departureAirport: text("departure_airport").notNull(),
  destination: text("destination").notNull(),
  fromDate: timestamp("from_date").notNull(),
  toDate: timestamp("to_date").notNull(),
  isFlexibleDates: boolean("is_flexible_dates").default(false),
  travelReason: text("travel_reason").notNull(),
  otherTravelReason: text("other_travel_reason"),

  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  childrenAges: json("children_ages").$type<number[]>(),

  hotelRating: integer("hotel_rating").notNull(),
  preferredHotel: text("preferred_hotel"),
  boardBasis: text("board_basis").notNull(),
  budget: text("budget").notNull(),

  specialRequests: text("special_requests"),
  additionalInformation: text("additional_information"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertTripRequestSchema = createInsertSchema(tripRequests, {
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    preferredContactMethod: z.string().min(1, "Please select a contact method"),
    bestTimeToContact: z.string().min(1, "Please specify best time to contact"),
    referralSource: z.string().min(1, "Please select how you heard about us"),

    departureAirport: z.string().min(1, "Please enter departure airport"),
    destination: z.string().min(2, "Please enter your desired destination"),
    fromDate: z.string().datetime({
      message: "Please provide a valid date and time",
    }),
    toDate: z.string().datetime({
      message: "Please provide a valid date and time",
    }),
    isFlexibleDates: z.boolean().default(false),
    travelReason: z.string().min(1, "Please select a reason for travel"),
    otherTravelReason: z.string().optional(),

    adults: z.number().min(1, "At least 1 adult required"),
    children: z.number().min(0),
    childrenAges: z.array(z.number()).optional(),

    hotelRating: z.number().min(1).max(5),
    preferredHotel: z.string().optional(),
    boardBasis: z.string().min(1, "Please select board basis"),
    budget: z.string().min(1, "Please enter your budget range"),

    specialRequests: z.string().optional().default(""),
    additionalInformation: z.string().optional().default(""),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertTripRequest = z.infer<typeof insertTripRequestSchema>;
export type TripRequest = typeof tripRequests.$inferSelect;