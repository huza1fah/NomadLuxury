import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  contactNumber: text("contact_number").notNull(),
  email: text("email").notNull(),
  referralSource: text("referral_source"),
  contactPreference: text("contact_preference"),
  destination: text("destination").notNull(),
  travelDates: text("travel_dates").notNull(),
  duration: text("duration").notNull(),
  departureAirport: text("departure_airport").notNull(),
  travelReason: text("travel_reason"),
  adults: integer("adults").notNull(),
  children: integer("children").notNull(),
  childrenAges: text("children_ages"),
  groupDetails: text("group_details"),
  ratingPreference: text("rating_preference"),
  preferredHotel: text("preferred_hotel"),
  budget: text("budget").notNull(),
  boardBasis: text("board_basis").notNull(),
  specialRequests: text("special_requests"),
  additionalInfo: text("additional_info"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default('new'),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEnquirySchema = createInsertSchema(enquiries);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEnquiry = z.infer<typeof insertEnquirySchema>;
export type Enquiry = typeof enquiries.$inferSelect;