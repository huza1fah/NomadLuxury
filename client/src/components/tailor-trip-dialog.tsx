import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MapPin, Plus, Minus, Calendar } from "lucide-react"
import { useState } from "react"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  contactNumber: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  referralSource: z.string().min(1, "Please let us know how you found us"),
  contactPreference: z.string().min(1, "Please specify your contact preference"),
  destination: z.string().min(1, "Please specify your desired destination"),
  departureDate: z.date(),
  returnDate: z.date(),
  departureAirport: z.string().min(1, "Please specify departure airport"),
  reasonForTravel: z.string().min(1, "Please specify reason for travel"),
  travelers: z.object({
    adults: z.number().min(1, "At least 1 adult is required"),
    children: z.number(),
    childrenAges: z.string(),
  }),
  ratingPreference: z.string(),
  preferredHotel: z.string(),
  budget: z.string().min(1, "Please specify your budget"),
  boardBasis: z.string().min(1, "Please specify board basis preference"),
  specialRequests: z.string(),
  additionalInfo: z.string(),
})

const steps = [
  {
    title: "Personal Information",
    description: "Let's start with your contact details",
    fields: ["fullName", "contactNumber", "email", "referralSource", "contactPreference"]
  },
  {
    title: "Travel & Group Details",
    description: "Plan your perfect getaway",
    fields: ["destination", "departureDate", "returnDate", "departureAirport", "reasonForTravel", "travelers"]
  },
  {
    title: "Accommodation Preferences",
    description: "Help us find your perfect luxury stay",
    fields: ["ratingPreference", "preferredHotel", "budget", "boardBasis"]
  },
  {
    title: "Additional Information",
    description: "Any special requests to make your trip extraordinary?",
    fields: ["specialRequests", "additionalInfo"]
  }
]

export function TailorTripDialog() {
  const [step, setStep] = useState(0)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      contactNumber: "",
      email: "",
      referralSource: "",
      contactPreference: "",
      destination: "",
      departureDate: new Date(),
      returnDate: new Date(),
      departureAirport: "",
      reasonForTravel: "",
      travelers: {
        adults: 1,
        children: 0,
        childrenAges: "",
      },
      ratingPreference: "",
      preferredHotel: "",
      budget: "",
      boardBasis: "",
      specialRequests: "",
      additionalInfo: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here we'll add the submission logic later
  }

  const currentStep = steps[step]
  const isLastStep = step === steps.length - 1

  const renderFormFields = () => {
    const fields = currentStep.fields

    return fields.map((field) => {
      if (field === "travelers") {
        return (
          <div key={field} className="space-y-6">
            <FormLabel className="text-white text-lg">Travelers</FormLabel>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-white rounded-lg p-4">
                <div>
                  <h4 className="font-medium text-[#a0c4ff]">Adults</h4>
                  <p className="text-sm text-[#a0c4ff]/70">Age 12+</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      const currentAdults = form.getValues("travelers.adults")
                      if (currentAdults > 1) {
                        form.setValue("travelers.adults", currentAdults - 1)
                      }
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-[#a0c4ff] w-8 text-center">{form.getValues("travelers.adults")}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      const currentAdults = form.getValues("travelers.adults")
                      form.setValue("travelers.adults", currentAdults + 1)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between bg-white rounded-lg p-4">
                <div>
                  <h4 className="font-medium text-[#a0c4ff]">Children</h4>
                  <p className="text-sm text-[#a0c4ff]/70">Age 2-11</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      const currentChildren = form.getValues("travelers.children")
                      if (currentChildren > 0) {
                        form.setValue("travelers.children", currentChildren - 1)
                      }
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-[#a0c4ff] w-8 text-center">{form.getValues("travelers.children")}</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={() => {
                      const currentChildren = form.getValues("travelers.children")
                      form.setValue("travelers.children", currentChildren + 1)
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {form.getValues("travelers.children") > 0 && (
                <FormField
                  control={form.control}
                  name="travelers.childrenAges"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Children's ages at time of travel</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. 5, 7, 12" {...field} className="bg-white border-white/20 text-[#a0c4ff] placeholder:text-[#a0c4ff]/50" />
                      </FormControl>
                      <FormMessage className="text-white" />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>
        )
      }

      if (field === "departureDate" || field === "returnDate") {
        return (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-white">
                  {field.name === "departureDate" ? "Departure Date" : "Return Date"}
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-white text-[#a0c4ff]",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || (field.name === "returnDate" && date < form.getValues("departureDate"))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
        )
      }

      if (field === "ratingPreference") {
        return (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Rating Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-white/20 text-[#a0c4ff]">
                      <SelectValue placeholder="Select hotel rating" className="text-[#a0c4ff]/50" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">3 Star</SelectItem>
                    <SelectItem value="4">4 Star</SelectItem>
                    <SelectItem value="5">5 Star</SelectItem>
                    <SelectItem value="5plus">5 Star Plus</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
        )
      }

      if (field === "boardBasis") {
        return (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Board Basis Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white border-white/20 text-[#a0c4ff]">
                      <SelectValue placeholder="Select board basis" className="text-[#a0c4ff]/50" />
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
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
        )
      }

      if (field === "specialRequests" || field === "additionalInfo") {
        return (
          <FormField
            key={field}
            control={form.control}
            name={field}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">
                  {field.name === "specialRequests" ? "Special Requests" : "Additional Information"}
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={
                      field.name === "specialRequests"
                        ? "e.g. room type/view, extras, occasion"
                        : "Any other information that can help us build the best trip for you"
                    }
                    className="min-h-[100px] bg-white border-white/20 text-[#a0c4ff] placeholder:text-[#a0c4ff]/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-white" />
              </FormItem>
            )}
          />
        )
      }

      return (
        <FormField
          key={field}
          control={form.control}
          name={field}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {field.name
                  .split(/(?=[A-Z])/)
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </FormLabel>
              <FormControl>
                <Input {...field} className="bg-white border-white/20 text-[#a0c4ff] placeholder:text-[#a0c4ff]/50" />
              </FormControl>
              <FormMessage className="text-white" />
            </FormItem>
          )}
        />
      )
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg py-8 px-10 justify-start w-full shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px] bg-white text-primary hover:bg-white/90">
          <MapPin className="mr-4 h-6 w-6" />
          Tailor Your Trip
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0 bg-[#a0c4ff]">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-3xl font-bold text-center mb-2 text-white">{currentStep.title}</DialogTitle>
              <DialogDescription className="text-center text-white/80 text-lg">
                {currentStep.description}
              </DialogDescription>
            </DialogHeader>

            {/* Step counter */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-6">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === step ? 'bg-white' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/20 rounded-full h-1.5 mb-8">
              <div
                className="bg-white h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              />
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  {renderFormFields()}
                </div>

                <div className="flex justify-between gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                  >
                    Previous
                  </Button>
                  <Button
                    type={isLastStep ? "submit" : "button"}
                    onClick={() => !isLastStep && setStep(step + 1)}
                    className="bg-white text-[#a0c4ff] hover:bg-white/90"
                  >
                    {isLastStep ? "Submit Enquiry" : "Next Step"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}