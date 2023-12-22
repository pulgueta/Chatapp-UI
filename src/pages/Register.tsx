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
import { Separator } from "@/components/ui/separator";
import { RegisterForm } from "@/components/form/RegisterForm";

const Register = () => {
	return (
		<div className='min-h-svh p-4 antialiased flex items-center justify-center flex-col gap-4'>
			<Card>
				<CardHeader>
					<CardTitle>Register</CardTitle>
					<CardDescription>
						Create a user to enter the HelpDesk software.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<RegisterForm />
				</CardContent>
				<CardFooter className='flex flex-col items-center justify-center'>
					<Separator className='mb-4' />
					<span>
						Already have an account?{" "}
						<Link
							to='/login'
							className={buttonVariants({ variant: "link" })}
						>
							Login
						</Link>
					</span>
				</CardFooter>
			</Card>
		</div>
	);
};
export default Register;
