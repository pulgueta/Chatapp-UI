import { LoaderIcon } from "lucide-react";

export const Loading = () => {
	return (
		<div className='min-h-svh p-4 flex items-center justify-center bg-white dark:bg-black'>
			<LoaderIcon className='size-6 animate-spin' />
		</div>
	);
};
