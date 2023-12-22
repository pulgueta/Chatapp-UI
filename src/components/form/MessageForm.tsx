import { Loader2Icon, SendIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Message, messageSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/lib/utils";

export const MessageForm = ({ token }: { token: string }) => {
	const role = localStorage.getItem("role") as "ADMIN" | "USER";
	const form = useForm<Message>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			message: "",
			role,
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const chat = await fetch(`${BASE_URL}/api/chats`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());

		console.log(chat);
		form.reset();
	});

	return (
		<form onSubmit={onSubmit} className='flex items-center gap-x-4'>
			<Input
				{...form.register("message")}
				disabled={form.formState.isSubmitting}
				placeholder='Your message...'
			/>
			<Button size='icon'>
				{form.formState.isSubmitting ? (
					<Loader2Icon className='size-4 animate-spin' />
				) : (
					<SendIcon className='size-4' />
				)}
			</Button>
		</form>
	);
};
