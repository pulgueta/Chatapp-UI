import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Ticket, ticketSchema } from "@/schemas";
import { BASE_URL } from "@/lib/utils";

export const TicketForm = ({ token }: { token: string }) => {
	const form = useForm<Ticket>({
		resolver: zodResolver(ticketSchema),
		defaultValues: {
			title: "",
			description: "",
			severity: "LOW",
			username: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const ticket = await fetch(`${BASE_URL}/api/tickets`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());
		console.log(ticket);

		if (!ticket) {
			toast.error("Error creating ticket");
		}

		toast.success(`${ticket.id} has been submitted`, {
			description: "Wait until an admin takes your ticket.",
		});

		form.reset();
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className='space-y-4'>
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									autoComplete='username'
									disabled={form.formState.isSubmitting}
									placeholder='nu4tech'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='title'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ticket title</FormLabel>
							<FormControl>
								<Input
									autoComplete='ticket title'
									disabled={form.formState.isSubmitting}
									placeholder='Printer not working'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Ticket description</FormLabel>
							<FormControl>
								<Textarea
									autoComplete='ticket description'
									disabled={form.formState.isSubmitting}
									placeholder='My printer stopped working when...'
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='severity'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Severity of ticket</FormLabel>
							<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder='Select a verified email to display' />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{Object.values(
										ticketSchema.shape.severity._def.values
									).map((severity) => (
										<SelectItem
											key={severity}
											value={severity}
										>
											{severity}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button
					disabled={form.formState.isSubmitting}
					className='w-full'
					type='submit'
				>
					{form.formState.isSubmitting
						? "Creating ticket..."
						: "Submit ticket"}
				</Button>
			</form>
		</Form>
	);
};
