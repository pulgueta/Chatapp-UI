import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { LoaderIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { BASE_URL, cn } from "@/lib/utils";

type Ticket = {
	id: string;
	ticketTitle: string;
	ticketDescription: string;
	ticketSeverity: string;
	submittedBy: string;
	createdAt: Date;
	updatedAt: Date;
	userId: null;
};

export const Tickets = ({ token }: { token: string }) => {
	const [tickets, setTickets] = useState<Ticket[]>([]);

	useEffect(() => {
		const getTickets = async () => {
			await fetch(`${BASE_URL}/api/tickets`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((tickets) => setTickets(tickets));
		};

		getTickets();
	}, [token]);

	return tickets.length >= 1 ? (
		tickets.map((ticket) => (
			<Card key={ticket.id} className='w-64 lg:w-auto lg:max-w-md'>
				<CardHeader>
					<CardTitle className='truncate'>
						Ticket {ticket.id}
					</CardTitle>
					<CardDescription>
						Submitted by: {ticket.submittedBy}
					</CardDescription>
					<Badge
						className={cn("text-white w-fit", {
							"bg-blue-400": ticket.ticketSeverity === "LOW",
							"bg-yellow-400": ticket.ticketSeverity === "MEDIUM",
							"bg-red-600": ticket.ticketSeverity === "HIGH",
							"bg-red-800": ticket.ticketSeverity === "URGENT",
						})}
					>
						{ticket.ticketSeverity}
					</Badge>
				</CardHeader>
				<CardContent>{ticket.ticketDescription}</CardContent>
				<CardFooter>
					<Link
						to={`/dashboard/${ticket.id}`}
						className={buttonVariants({ className: "w-full" })}
					>
						Take ticket
					</Link>
				</CardFooter>
			</Card>
		))
	) : (
		<LoaderIcon className='size-4 animate-spin' />
	);
};
