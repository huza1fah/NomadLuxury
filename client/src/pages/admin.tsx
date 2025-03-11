import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import type { Enquiry } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminDashboard() {
  const { data: enquiries, isLoading } = useQuery<Enquiry[]>({
    queryKey: ["/api/enquiries"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>Holiday Enquiries</CardTitle>
          <CardDescription>
            View and manage holiday enquiries from clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of holiday enquiries.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Travel Dates</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {enquiries?.map((enquiry) => (
                <TableRow key={enquiry.id}>
                  <TableCell>
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{enquiry.fullName}</TableCell>
                  <TableCell>{enquiry.destination}</TableCell>
                  <TableCell>{enquiry.travelDates}</TableCell>
                  <TableCell className="capitalize">{enquiry.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
