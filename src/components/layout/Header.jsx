export default function Header({ theme, toggleTheme }) {
	return (
		<header className="h-14 border-b border-black/10 dark:border-white/10 flex items-center justify-between px-4">
			<div className="font-semibold">Nomina</div>
			<p className="text-xs text-black/50 dark:text-white/50">
				Instant portfolio builder
			</p>

			<button
				onClick={toggleTheme}
				className="px-3 py-1 border border-black/20 dark:border-white/20 rounded">
				{theme === "light" ? "Dark" : "Light"}
			</button>
		</header>
	);
}
