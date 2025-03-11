import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  referralSource: z.string().min(1, "Please let us know how you found us"),
  contactPreference: z.string().min(1, "Please specify your contact preference"),
  destination: z.string().min(1, "Please specify your desired destination"),
  travelDates: z.string().min(1, "Please specify your travel dates"),
  duration: z.string().min(1, "Please specify the duration"),
  departureAirport: z.string().min(1, "Please specify departure airport"),
  reasonForTravel: z.string().min(1, "Please specify reason for travel"),
  travelers: z.object({
    adults: z.string().min(1, "Please specify number of adults"),
    children: z.string(),
    childrenAges: z.string(),
  }),
  groupDetails: z.string(),
  ratingPreference: z.string(),
  preferredHotel: z.string(),
  budget: z.string().min(1, "Please specify your budget"),
  boardBasis: z.string().min(1, "Please specify board basis preference"),
  specialRequests: z.string(),
  additionalInfo: z.string(),
});

export default function TailorTripForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      referralSource: "",
      contactPreference: "",
      destination: "",
      travelDates: "",
      duration: "",
      departureAirport: "",
      reasonForTravel: "",
      travelers: {
        adults: "",
        children: "",
        childrenAges: "",
      },
      groupDetails: "",
      ratingPreference: "",
      preferredHotel: "",
      budget: "",
      boardBasis: "",
      specialRequests: "",
      additionalInfo: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Here we'll add the submission logic later
  }

  return (
    <div className="min-h-screen bg-[#a0c4ff] py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-primary">Tailor Your Trip</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="referralSource"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Where did you hear about us?</FormLabel>
                    <FormControl>
                      <Input placeholder="Please state who via if applicable" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Best time to contact you and preferred method</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Weekday afternoons via phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input placeholder="Where would you like to go?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="travelDates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Travel Dates</FormLabel>
                    <FormControl>
                      <Input placeholder="Please state if flexible" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (total number of nights)</FormLabel>
                    <FormControl>
                      <Input placeholder="How many nights?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureAirport"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure Airport</FormLabel>
                    <FormControl>
                      <Input placeholder="Please list if more than one option" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reasonForTravel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason for travel</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. family holiday, anniversary, birthday, business" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="travelers.adults"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Adults</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelers.children"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="travelers.childrenAges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Children's ages at time of travel</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5, 7, 12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="groupDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group Details</FormLabel>
                    <FormControl>
                      <Input placeholder="Please state how many in each room if traveling as a group" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ratingPreference"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select hotel rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="3">3 Star</SelectItem>
                        <SelectItem value="4">4 Star</SelectItem>
                        <SelectItem value="5">5 Star</SelectItem>
                        <SelectItem value="5plus">5 Star Plus</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredHotel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Hotel Choice</FormLabel>
                    <FormControl>
                      <Input placeholder="Do you have a specific hotel in mind?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allocated Expenditure</FormLabel>
                    <FormControl>
                      <Input placeholder="Please state your budget for this trip" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="boardBasis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Board Basis Preference</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select board basis" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="room_only">Room Only</SelectItem>
                        <SelectItem value="bb">Bed & Breakfast</SelectItem>
                        <SelectItem value="hb">Half Board</SelectItem>
                        <SelectItem value="fb">Full Board</SelectItem>
                        <SelectItem value="ai">All Inclusive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialRequests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Special Requests</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="e.g. room type/view, extras, occasion" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Any other information that can help us build the best trip for you" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Submit Enquiry
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
