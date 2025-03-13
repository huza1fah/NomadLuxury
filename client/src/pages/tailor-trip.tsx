import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


const travelReasons = [
  "Honeymoon",
  "Anniversary",
  "Family Holiday",
  "Corporate Travel",
  "Solo Adventure",
  "Other"
] as const;

const boardBasisOptions = [
  "Room Only",
  "Bed & Breakfast",
  "Half Board",
  "Full Board",
  "All Inclusive"
] as const;

const contactMethods = [
  "Phone",
  "Email",
  "WhatsApp"
] as const;

const referralSources = [
  "Google",
  "Instagram",
  "Facebook",
  "Friend/Family",
  "Previous Customer",
  "Other"
] as const;

const tripFormSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredContactMethod: z.enum(contactMethods),
  bestTimeToContact: z.string().min(1, "Please specify best time to contact"),
  referralSource: z.enum(referralSources),

  // Step 2: Travel Details
  departureAirport: z.string().min(1, "Please enter departure airport"),
  destination: z.string().min(2, "Please enter your desired destination"),
  fromDate: z.date({
    required_error: "Please select a start date for your trip",
  }),
  toDate: z.date({
    required_error: "Please select an end date for your trip",
  }),
  isFlexibleDates: z.boolean().default(false),
  travelReason: z.enum(travelReasons),
  otherTravelReason: z.string().optional(),

  // Step 3: Group Details
  adults: z.number().min(1, "At least 1 adult required"),
  children: z.number().min(0),
  childrenAges: z.array(z.number()).optional(),

  // Step 4: Preferences
  hotelRating: z.number().min(1).max(5),
  preferredHotel: z.string().optional(),
  boardBasis: z.enum(boardBasisOptions),
  budget: z.string().min(1, "Please enter your budget range"),

  // Step 5: Additional Information
  specialRequests: z.string(),
  additionalInformation: z.string(),
});

type TripFormValues = z.infer<typeof tripFormSchema>;

export default function TailorTrip() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const { toast } = useToast();

  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      isFlexibleDates: false,
      adults: 1,
      children: 0,
      childrenAges: [],
      hotelRating: 4,
    },
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  async function onSubmit(data: TripFormValues) {
    try {
      const response = await fetch('/api/trip-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit trip request');
      }

      // Reset form and show success message
      form.reset();
      setCurrentStep(1);
      toast({
        title: "Success!",
        description: "Your trip request has been submitted. We'll be in touch soon!",
      });
    } catch (error) {
      console.error('Error submitting trip request:', error);
      toast({
        title: "Error",
        description: "Failed to submit trip request. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="min-h-screen bg-[#a0c4ff] py-12 px-4">
      <Card className="max-w-2xl mx-auto bg-white/95">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-primary">
            Tailor Your Perfect Journey
            <p className="text-lg mt-2 text-muted-foreground">
              {currentStep === 1 && "Step 1: Personal Information"}
              {currentStep === 2 && "Step 2: Travel Details"}
              {currentStep === 3 && "Step 3: Group Details"}
              {currentStep === 4 && "Step 4: Travel Preferences"}
              {currentStep === 5 && "Step 5: Additional Information"}
            </p>
          </CardTitle>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full",
                  currentStep > index
                    ? "bg-primary"
                    : currentStep === index + 1
                    ? "bg-primary/50"
                    : "bg-gray-200"
                )}
              />
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Full Name" {...field} />
                        </FormControl>
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
                          <Input type="email" placeholder="your@email.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="+44" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredContactMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Contact Method</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select contact method" />
                          </SelectTrigger>
                          <SelectContent>
                            {contactMethods.map((method) => (
                              <SelectItem key={method} value={method}>
                                {method}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bestTimeToContact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Contact</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Weekday afternoons" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="referralSource"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Where did you hear about us?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select source" />
                          </SelectTrigger>
                          <SelectContent>
                            {referralSources.map((source) => (
                              <SelectItem key={source} value={source}>
                                {source}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="departureAirport"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departure Airport</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. London Heathrow" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Destination</FormLabel>
                        <FormControl>
                          <Input placeholder="Where would you like to go?" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col md:flex-row gap-4">
                    <FormField
                      control={form.control}
                      name="fromDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>From Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="toDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>To Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < form.getValues("fromDate") || date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="isFlexibleDates"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            My dates are flexible
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="travelReason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason for Travel</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select reason" />
                          </SelectTrigger>
                          <SelectContent>
                            {travelReasons.map((reason) => (
                              <SelectItem key={reason} value={reason}>
                                {reason}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  {form.watch("travelReason") === "Other" && (
                    <FormField
                      control={form.control}
                      name="otherTravelReason"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Please specify</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="adults"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Adults</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="children"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Children</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              field.onChange(value);
                              // Reset children ages array when number of children changes
                              form.setValue(
                                "childrenAges",
                                Array(value).fill(0)
                              );
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {form.watch("children") > 0 && (
                    <div className="space-y-2">
                      <FormLabel>Ages of Children at Travel</FormLabel>
                      {Array.from({ length: form.watch("children") }).map((_, index) => (
                        <Input
                          key={index}
                          type="number"
                          min={0}
                          max={17}
                          placeholder={`Child ${index + 1} age`}
                          value={form.watch("childrenAges")?.[index] || ""}
                          onChange={(e) => {
                            const ages = [...(form.watch("childrenAges") || [])];
                            ages[index] = parseInt(e.target.value);
                            form.setValue("childrenAges", ages);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="hotelRating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Hotel Rating</FormLabel>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              type="button"
                              variant={field.value >= rating ? "default" : "outline"}
                              className="p-2"
                              onClick={() => field.onChange(rating)}
                            >
                              <StarIcon className="h-4 w-4" />
                            </Button>
                          ))}
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preferredHotel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Hotel (if any)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hotel name" {...field} />
                        </FormControl>
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select board basis" />
                          </SelectTrigger>
                          <SelectContent>
                            {boardBasisOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Range</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. £2000-£3000" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Room preferences, special occasions, etc."
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalInformation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <textarea
                            className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Any other details that can help us build the best trip for you"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="flex justify-between mt-6">
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Previous
                  </Button>
                )}
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="ml-auto">
                    Next
                  </Button>
                ) : (
                  <Button type="submit" className="ml-auto">
                    Submit Request
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}