import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import FormPanel from "../components/layout/FormPanel";
import PreviewPanel from "../components/layout/PreviewPanel";

export default function Home() {
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem("theme") || "light";
	});

	useEffect(() => {
		const root = document.documentElement;

		if (theme === "dark") {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prev) => {
			const newTheme = prev === "light" ? "dark" : "light";
			localStorage.setItem("theme", newTheme);
			return newTheme;
		});
	};
	const [formData, setFormData] = useState(() => {
		const saved = localStorage.getItem("portfolioData");
		return saved
			? JSON.parse(saved)
			: {
					name: "",
					bio: "",
					skills: "",
					projects: [{ title: "", description: "", link: "" }],
				};
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// project field change
	const handleProjectChange = (index, e) => {
		const { name, value } = e.target;

		const updatedProjects = [...formData.projects];
		updatedProjects[index][name] = value;

		setFormData((prev) => ({
			...prev,
			projects: updatedProjects,
		}));
	};

	// add new project
	const addProject = () => {
		setFormData((prev) => ({
			...prev,
			projects: [...prev.projects, { title: "", description: "", link: "" }],
		}));
	};

	const removeProject = (index) => {
		const updatedProjects = formData.projects.filter((_, i) => i !== index);

		setFormData((prev) => ({
			...prev,
			projects: updatedProjects,
		}));
	};

	useEffect(() => {
		localStorage.setItem("portfolioData", JSON.stringify(formData));
	}, [formData]);

	return (
		<div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
			<Header
				theme={theme}
				toggleTheme={toggleTheme}
			/>

			<main className="flex flex-1 flex-col md:flex-row">
				<FormPanel
					formData={formData}
					handleChange={handleChange}
					handleProjectChange={handleProjectChange}
					addProject={addProject}
					removeProject={removeProject}
				/>
				<PreviewPanel formData={formData} />
			</main>
		</div>
	);
}
