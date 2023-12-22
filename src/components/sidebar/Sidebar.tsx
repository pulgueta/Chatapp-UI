import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export const Sidebar = () => {
	const logout = () => () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		window.location.reload();
	};
	return (
		<aside className='bg-primary-foreground max-h-screen sticky top-0 p-8'>
			<div className='hidden lg:flex lg:flex-col lg:items-start lg:justify-between h-full'>
				<div className='space-y-8'>
					<h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>
						Dashboard
					</h1>
					<section>
						<Link
							to=''
							className='border p-4 border-white/20 rounded flex flex-col max-w-xs'
						>
							<span className='font-semibold text-muted-foreground'>
								Username
							</span>
							<span className='truncate'>
								Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Cum asperiores est quibusdam
								numquam error optio aspernatur? Dicta dolor
								commodi perferendis aperiam, atque beatae
								reiciendis ratione veritatis magni quae
								voluptatem? Quidem.
							</span>
						</Link>
					</section>
				</div>
				<footer>
					<Button onClick={logout()} variant='destructive'>
						Log out
					</Button>
				</footer>
			</div>
			<Sheet>
				<SheetTrigger className='flex mx-auto lg:hidden' asChild>
					<Button size='icon'>
						<MenuIcon />
					</Button>
				</SheetTrigger>
				<SheetContent className='overflow-y-scroll'>
					<SheetHeader>
						<SheetTitle>Edit profile</SheetTitle>
						<SheetDescription>
							Make changes to your profile here. Click save when
							you're done.
						</SheetDescription>
						<Button onClick={logout()} variant='destructive'>
							Log out
						</Button>
					</SheetHeader>
					<div className='grid gap-4 py-4'>
						<SheetClose asChild>
							<Link
								to=''
								className='border p-4 border-white/20 rounded flex flex-col max-w-[16rem] mx-auto'
							>
								<span className='font-semibold text-muted-foreground'>
									Username
								</span>
								<span className='truncate'>
									Lorem ipsum dolor, sit amet consectetur
									adipisicing elit. Cum asperiores est
									quibusdam numquam error optio aspernatur?
									Dicta dolor commodi perferendis aperiam,
									atque beatae reiciendis ratione veritatis
									magni quae voluptatem? Quidem.
								</span>
							</Link>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</aside>
	);
};
