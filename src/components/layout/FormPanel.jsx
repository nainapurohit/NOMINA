import Input from "../ui/Input";
import Textarea from "../ui/Textarea";

export default function FormPanel({
	formData,
	handleChange,
	handleProjectChange,
	addProject,
	removeProject,
}) {
	return (
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

				{/* PROJECTS SECTION */}
				<div className="pt-6 border-t border-black/10 dark:border-white/10">
					<h2 className="text-sm font-semibold uppercase tracking-wider mb-4">
						Projects
					</h2>

					{formData.projects.map((project, index) => (
						<div
							key={index}
							className="mb-6 p-4 rounded-lg border border-black/10 dark:border-white/10 space-y-3">
							{/* Project Title */}
							<input
								type="text"
								name="title"
								placeholder="Project title"
								value={project.title}
								onChange={(e) => handleProjectChange(index, e)}
								className="w-full p-2 rounded bg-transparent border border-black/20 dark:border-white/20"
							/>

							{/* Project Description */}
							<textarea
								name="description"
								placeholder="Project description"
								value={project.description}
								onChange={(e) => handleProjectChange(index, e)}
								className="w-full p-2 rounded bg-transparent border border-black/20 dark:border-white/20"
								rows="3"
							/>

							{/* Project Link */}
							<input
								type="text"
								name="link"
								placeholder="Project link"
								value={project.link}
								onChange={(e) => handleProjectChange(index, e)}
								className="w-full p-2 rounded bg-transparent border border-black/20 dark:border-white/20"
							/>

							{/* Delete button */}
							<button
								type="button"
								onClick={() => removeProject(index)}
								className="text-sm text-red-500 hover:underline">
								Remove project
							</button>
						</div>
					))}

					{/* Add project button */}
					<button
						type="button"
						onClick={addProject}
						className="px-4 py-2 border border-black/20 dark:border-white/20 rounded">
						+ Add Project
					</button>
				</div>
			</div>
		</section>
	);
}
