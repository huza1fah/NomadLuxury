import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const tripFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  destination: z.string().min(2, "Please enter your desired destination"),
  travelDates: z.string().min(1, "Please enter your preferred travel dates"),
  budget: z.string().min(1, "Please enter your budget range"),
  specialRequests: z.string(),
});

type TripFormValues = z.infer<typeof tripFormSchema>;

export default function TailorTrip() {
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripFormSchema),
    defaultValues: {
      name: "",
      email: "",
      destination: "",
      travelDates: "",
      budget: "",
      specialRequests: "",
    },
  });

  function onSubmit(data: TripFormValues) {
    console.log(data);
    // TODO: Handle form submission
  }

  return (
    <div className="min-h-screen bg-[#a0c4ff] py-12 px-4">
      <Card className="max-w-2xl mx-auto bg-white/95">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-primary">
            Tailor Your Perfect Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Your Name"
                    {...form.register("name")}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    {...form.register("email")}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Desired Destination"
                    {...form.register("destination")}
                  />
                  {form.formState.errors.destination && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.destination.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Preferred Travel Dates"
                    {...form.register("travelDates")}
                  />
                  {form.formState.errors.travelDates && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.travelDates.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Budget Range"
                    {...form.register("budget")}
                  />
                  {form.formState.errors.budget && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.budget.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Special Requests or Additional Information"
                    {...form.register("specialRequests")}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
