export default function Textarea({ className = "", ...props }) {
	return (
		<textarea
			{...props}
			className={
				"w-full px-3 py-2 border rounded-md bg-white dark:bg-transparent text-black dark:text-white border-black/30 dark:border-white/20 placeholder-black/50 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10" +
				className
			}
		/>
	);
}
