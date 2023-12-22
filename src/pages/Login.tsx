import { Link, Navigate } from "react-router-dom";

import { LoginForm } from "@/components/form/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Login = () => {
	const token = localStorage.getItem("token");

	if (token) {
		return <Navigate to='/dashboard' />;
	}

	return (
		<div className='min-h-svh p-4 antialiased flex items-center justify-center flex-col gap-4'>
			<Card>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription>
						Provide your credentials to enter your dashboard
					</CardDescription>
				</CardHeader>
				<CardContent>
					<LoginForm />
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-center'>
					<Separator className='mb-4' />
					<span>
						Don&apos;t have an account?
						<Link
							to='/register'
							className={buttonVariants({ variant: "link" })}
						>
							Register
						</Link>
					</span>
				</CardFooter>
			</Card>
		</div>
	);
};
export default Login;
