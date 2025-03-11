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
import { MapPin } from "lucide-react"
import { useState } from "react"

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
})

const steps = [
  {
    title: "Personal Information",
    description: "Let's start with your contact details",
    fields: ["fullName", "contactNumber", "email", "referralSource", "contactPreference"]
  },
  {
    title: "Travel Details",
    description: "Tell us about your desired destination",
    fields: ["destination", "travelDates", "duration", "departureAirport", "reasonForTravel"]
  },
  {
    title: "Group Information",
    description: "Who will be traveling with you?",
    fields: ["travelers", "groupDetails"]
  },
  {
    title: "Accommodation Preferences",
    description: "Help us find your perfect stay",
    fields: ["ratingPreference", "preferredHotel", "budget", "boardBasis"]
  },
  {
    title: "Additional Information",
    description: "Any special requests or requirements?",
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
          <div key={field} className="space-y-4">
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
                  <FormLabel>Children's ages</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. 5, 7, 12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
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
                <FormLabel>
                  {field.name === "specialRequests" ? "Special Requests" : "Additional Information"}
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder={
                      field.name === "specialRequests" 
                        ? "e.g. room type/view, extras, occasion"
                        : "Any other information that can help us build the best trip for you"
                    }
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
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
              <FormLabel>
                {field.name
                  .split(/(?=[A-Z])/)
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden p-0">
        <ScrollArea className="h-full max-h-[90vh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center mb-2">{currentStep.title}</DialogTitle>
              <DialogDescription className="text-center text-muted-foreground">
                {currentStep.description}
              </DialogDescription>
            </DialogHeader>

            {/* Progress indicator */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 mt-4">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${((step + 1) / steps.length) * 100}%` }}
              ></div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
                {renderFormFields()}

                <div className="flex justify-between gap-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 0}
                  >
                    Previous
                  </Button>
                  <Button
                    type={isLastStep ? "submit" : "button"}
                    onClick={() => !isLastStep && setStep(step + 1)}
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