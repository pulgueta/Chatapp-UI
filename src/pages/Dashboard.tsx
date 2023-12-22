import { Tickets } from "@/components/Tickets";
import { TicketForm } from "@/components/form/TicketForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
	const token = localStorage.getItem("token") || "";

	const role = localStorage.getItem("role") || "";

	return (
		<main className='min-h-svh p-4 antialiased flex items-center justify-center flex-col gap-4'>
			{role === "ADMIN" ? (
				<>
					<h1 className='font-bold text-3xl text-center'>
						Tickets created:
					</h1>
					<section className='flex flex-col lg:flex-row lg:flex-wrap items-center justify-around gap-4'>
						<Tickets token={token} />
					</section>
				</>
			) : (
				<Card className='w-full lg:w-96'>
					<CardHeader>
						<CardTitle>Create a ticket</CardTitle>
						<CardDescription>
							Submit a ticket to be taken care of.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<TicketForm token={token} />
					</CardContent>
				</Card>
			)}
		</main>
	);
};
export default Dashboard;
