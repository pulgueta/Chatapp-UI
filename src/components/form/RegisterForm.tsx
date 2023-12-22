import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Register, registerSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/utils";

export const RegisterForm = () => {
	const form = useForm<Register>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = form.handleSubmit(async (data) => {
		const user = await fetch(`${BASE_URL}/api/auth/register`, {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((res) => res.text());

		if (!user) {
			return console.log(user);
		}

		alert("User created");
	});

	return (
		<Form {...form}>
			<form onSubmit={onSubmit}>
				<div className='mb-8 grid grid-cols-1 gap-6 md:grid-cols-2'>
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
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										autoComplete='email'
										disabled={form.formState.isSubmitting}
										type='email'
										placeholder='nu4tech@nuatech.co'
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
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm password</FormLabel>
								<FormControl>
									<Input
										autoComplete='confirmPassword'
										disabled={form.formState.isSubmitting}
										placeholder='Confirm your password'
										type='password'
										{...field}
									/>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					disabled={form.formState.isSubmitting}
					className='w-full'
					type='submit'
				>
					{form.formState.isSubmitting ? (
						<LoaderIcon className='size-4 animate-spin' />
					) : (
						"Create account"
					)}
				</Button>
			</form>
		</Form>
	);
};
