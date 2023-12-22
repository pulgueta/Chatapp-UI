import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageForm } from "@/components/form/MessageForm";
import { BASE_URL } from "@/lib/utils";

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

const Tickets = () => {
	const token = localStorage.getItem("token") ?? "";

	const [user, setUser] = useState<Ticket>();

	const { id } = useParams();

	useEffect(() => {
		const getTicket = async () => {
			await fetch(`${BASE_URL}/api/tickets/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
				.then((res) => res.json())
				.then((res) => setUser(res));
		};

		getTicket();
	}, [token, id]);

	return (
		<main className='min-h-screen p-4 antialiased flex flex-col gap-4'>
			<header className='border-b w-full'>
				<h1 className='text-xl font-semibold scroll-m-20 mb-2'>
					Ticket {id}
				</h1>
			</header>
			<section className='h-full rounded border p-4'>
				<header className='border-b'>
					<p className='text-lg font-semibold mb-2'>
						You&apos;re chatting with:{" "}
						{user?.submittedBy ?? "loading..."}
					</p>
				</header>
				<ScrollArea className='h-[calc(100vh-220px)] p-4'>
					{/* messages */}

					<div className='bg-primary w-fit p-2 rounded my-2 mr-auto text-black font-medium'>
						<p>Message from user</p>
					</div>
					<div className='bg-slate-600 w-fit p-2 rounded ml-auto font-medium'>
						<p>Message from admin</p>
					</div>
				</ScrollArea>
			</section>
			<MessageForm token={token} />
		</main>
	);
};
export default Tickets;
