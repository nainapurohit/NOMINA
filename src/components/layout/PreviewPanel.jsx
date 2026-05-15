// PreviewPanel.jsx
import React, { useRef, useState } from "react";
import { buildHtmlTemplate } from "../pdf/template";
import { generatePdfFromHtml } from "../pdf/pdfExporter";
import { isValidHttpUrl } from "../pdf/utils";

/**
 * PreviewPanel component
 * - formData: { name, bio, skills, projects }
 */
export default function PreviewPanel({ formData = {} }) {
	const previewRef = useRef();
	const [isGenerating, setIsGenerating] = useState(false);
	const [progress, setProgress] = useState("");

	const a4WidthPx = 595;
	const a4HeightPx = 842;

	const onProgress = (info) => {
		// info can be { step } or { step, page, totalPages } etc.
		if (info.step === "slicing" && info.page && info.totalPages) {
			setProgress(`Adding page ${info.page} of ${info.totalPages}...`);
		} else if (info.step === "try-links") {
			setProgress("Attempting link-preserving export...");
		} else if (info.step === "fallback-images") {
			setProgress("Falling back to image slicing...");
		} else if (info.step === "create-iframe") {
			setProgress("Preparing content...");
		} else if (info.step === "insert-page-breaks") {
			setProgress("Tuning page breaks...");
		} else if (info.step === "server-render") {
			setProgress("Uploading to server for rendering...");
		} else {
			setProgress(info.step || "");
		}
	};

	const downloadPDF = async () => {
		if (isGenerating) return;
		setIsGenerating(true);
		setProgress("Starting export...");

		try {
			// Basic validation: ensure links are http(s) or show warning in preview
			if (Array.isArray(formData.projects)) {
				for (const p of formData.projects) {
					if (p && p.link && !isValidHttpUrl(p.link)) {
						alert(
							`Warning: project link "${p.link}" looks invalid and will not be included as a clickable link in the PDF.`,
						);
						break;
					}
				}
			}

			const html = buildHtmlTemplate(formData, { a4WidthPx, a4HeightPx });

			const result = await generatePdfFromHtml(html, {
				a4WidthPx,
				a4HeightPx,
				onProgress,
				useServer: false, // set true if you have a server endpoint
				serverEndpoint: "/api/render-pdf",
			});

			if (!result.success) {
				// eslint-disable-next-line no-alert
				alert("PDF generation failed. Check console for details.");
			}
		} catch (err) {
			console.error("Export error:", err);
			alert("An unexpected error occurred while generating the PDF.");
		} finally {
			setIsGenerating(false);
			setProgress("");
		}
	};

	return (
		<section className="w-full md:w-1/2 p-6 flex flex-col">
			<div className="flex justify-end mb-4">
				<button
					onClick={downloadPDF}
					disabled={isGenerating}
					className={`px-4 py-2 rounded-lg border border-black/20 dark:border-white/20 transition ${
						isGenerating
							? "opacity-60 cursor-not-allowed"
							: "hover:bg-black/5 dark:hover:bg-white/10"
					}`}>
					{isGenerating ? "Generating PDF..." : "Download PDF"}
				</button>
			</div>

			{isGenerating && (
				<div className="mb-4 text-sm text-gray-600">
					<strong>Export:</strong> {progress}
				</div>
			)}

			<div
				ref={previewRef}
				className="border border-black/10 dark:border-white/10 rounded-xl p-8 flex-1 overflow-y-auto min-h-0">
				<div className="mb-8">
					<h1 className="text-4xl font-bold">{formData.name || "Your Name"}</h1>
					<p className="mt-3 opacity-70 text-lg">
						{formData.bio || "Your short professional bio will appear here"}
					</p>
				</div>

				<div className="mb-8">
					<h2 className="text-sm font-semibold uppercase opacity-60">Skills</h2>
					<div className="mt-3 flex flex-wrap gap-2">
						{formData.skills ? (
							formData.skills.split(",").map((skill, i) => (
								<span
									key={i}
									className="px-3 py-1 border rounded-full text-sm">
									{skill.trim()}
								</span>
							))
						) : (
							<span className="opacity-50 text-sm">No skills added yet</span>
						)}
					</div>
				</div>

				<div>
					<h2 className="text-sm font-semibold uppercase opacity-60">
						Projects
					</h2>

					{Array.isArray(formData.projects) &&
					formData.projects.some((p) => p && p.title) ? (
						<div className="mt-4 grid gap-4">
							{formData.projects.map((project, i) => (
								<div
									key={i}
									className="p-4 border rounded-lg project">
									<h3 className="font-semibold text-lg">
										{project.title || "Untitled Project"}
									</h3>
									<p className="mt-2 opacity-70">
										{project.description || "Project description"}
									</p>
									{project.link && isValidHttpUrl(project.link) ? (
										<a
											href={project.link}
											target="_blank"
											rel="noopener noreferrer"
											className="underline text-sm mt-2 inline-block">
											View Project →
										</a>
									) : project.link ? (
										<div className="text-xs text-red-500 mt-2">
											Invalid link
										</div>
									) : null}
								</div>
							))}
						</div>
					) : (
						<div className="mt-3 opacity-50 text-sm">
							Your projects will appear here.
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
