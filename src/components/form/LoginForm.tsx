import { useNavigate } from "react-router-dom";
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
import { Login, loginSchema } from "@/schemas";
import { BASE_URL } from "@/lib/utils";

export const LoginForm = () => {
	const navigate = useNavigate();
	const form = useForm<Login>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			password: "",
			username: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const user = await fetch(`${BASE_URL}/api/auth/login`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => res.json());

		if (!user) {
			toast.error("Invalid credentials");
			return;
		}

		localStorage.setItem("token", user.token);
		localStorage.setItem("role", user.role);

		toast.success("Welcome back");
		navigate("/dashboard");
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
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									autoComplete='password'
									disabled={form.formState.isSubmitting}
									placeholder='Your password'
									type='password'
									{...field}
								/>
							</FormControl>

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
						? "Logging you in..."
						: "Login"}
				</Button>
			</form>
		</Form>
	);
};
