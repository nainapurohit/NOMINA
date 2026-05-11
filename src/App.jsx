import { useState } from "react";
import Input from "./components/ui/Input";
import Textarea from "./components/ui/Textarea";

export default function App() {
	const [formData, setFormData] = useState({ name: "", bio: "", skills: "" });

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const toggleTheme = () => {
		document.documentElement.classList.toggle("dark");
	};

	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white">
			{/* Top Bar */}
			<header className="h-14 border-b border-black/10 dark:border-white/10 flex items-center justify-between px-4">
				<div className="font-semibold">Nomina</div>
				<button
					onClick={toggleTheme}
					className="px-3 py-1 border border-black/20 dark:border-white/20 rounded">
					Toggle Theme
				</button>
			</header>

			{/* Main Content */}
			<main className="flex flex-1 flex-col md:flex-row items-stretch">
				{/* Left Panel */}
				<section className="w-full md:w-1/2 border-r border-black/10 dark:border-white/10 p-6 flex flex-col">
					<div className="space-y-4">
						<Input
							name="name"
							placeholder="Enter name"
							value={formData.name}
							onChange={handleChange}
						/>
						<Textarea
							name="bio"
							placeholder="Enter bio"
							value={formData.bio}
							onChange={handleChange}
						/>
						<Input
							name="skills"
							placeholder="Enter skills separated by commas"
							value={formData.skills}
							onChange={handleChange}
						/>
					</div>
				</section>

				{/* Right Panel */}
				<section className="w-full md:w-1/2 p-6 flex flex-col">
					<div className="border border-black/10 dark:border-white/10 rounded-lg p-6 flex-1 overflow-y-auto">
						<h1 className="text-3xl font-semibold">
							{formData.name || "Your Name"}
						</h1>
						<p className="mt-3 text-black/70 dark:text-white/70">
							{formData.bio || "Your bio will appear here"}
						</p>
						<div className="mt-6">
							<h3 className="text-sm font-semibold text-black/60 dark:text-white/60 uppercase">
								Skills
							</h3>
							<div className="mt-2 flex flex-wrap gap-2">
								{formData.skills ? (
									formData.skills.split(",").map((skill, i) => (
										<span
											key={i}
											className="px-3 py-1 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 rounded-full text-sm">
											{skill.trim()}
										</span>
									))
								) : (
									<span className="text-black/50 dark:text-white/50 text-sm">
										No skills added yet
									</span>
								)}
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
