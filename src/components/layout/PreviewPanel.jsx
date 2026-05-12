import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function PreviewPanel({ formData }) {
	const previewRef = useRef();

	const downloadPDF = async () => {
		// Build clean HTML string (no Tailwind classes)
		const htmlTemplate = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              color: #000;
              background: #fff;
            }
            h1 { font-size: 32px; margin-bottom: 10px; }
            h2 { font-size: 14px; margin-top: 30px; text-transform: uppercase; }
            p { color: #444; }
            .chip {
              display:inline-block;
              padding:4px 10px;
              border-radius:999px;
              border:1px solid #ccc;
              margin:4px;
              font-size:12px;
            }
            .project {
              border:1px solid #ddd;
              border-radius:10px;
              padding:16px;
              margin-top:12px;
            }
            a { color: blue; }
          </style>
        </head>
        <body>
          <h1>${formData.name || "Your Name"}</h1>
          <p>${formData.bio || "Your short professional bio will appear here"}</p>

          <h2>About</h2>
          <p>A passionate developer building clean, scalable web applications.</p>

          <h2>Skills</h2>
          <div>
            ${
							formData.skills
								? formData.skills
										.split(",")
										.map((skill) => `<span class="chip">${skill.trim()}</span>`)
										.join("")
								: `<span>No skills added yet</span>`
						}
          </div>

          <h2>Projects</h2>
          ${
						formData.projects && formData.projects.some((p) => p.title)
							? formData.projects
									.map(
										(project) => `
                      <div class="project">
                        <h3>${project.title || "Untitled Project"}</h3>
                        <p>${project.description || "Project description"}</p>
                        ${
													project.link
														? `<a href="${project.link}" target="_blank">View Project →</a>`
														: ""
												}
                      </div>
                    `,
									)
									.join("")
							: `<p>Your projects will appear here.</p>`
					}
        </body>
      </html>
    `;

		// Create hidden iframe
		const iframe = document.createElement("iframe");
		iframe.style.position = "fixed";
		iframe.style.right = "0";
		iframe.style.bottom = "0";
		iframe.style.width = "800px";
		iframe.style.height = "1100px";
		iframe.style.border = "none";
		iframe.style.visibility = "hidden";
		document.body.appendChild(iframe);

		const doc = iframe.contentWindow.document;
		doc.open();
		doc.write(htmlTemplate);
		doc.close();

		// Wait for render
		await new Promise((resolve) => setTimeout(resolve, 500));

		// Screenshot iframe
		const canvas = await html2canvas(doc.body, {
			scale: 2,
			backgroundColor: "#ffffff",
		});

		document.body.removeChild(iframe);

		// Create PDF
		const imgData = canvas.toDataURL("image/png");
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "px",
			format: "a4",
		});

		const imgWidth = 595;
		const imgHeight = (canvas.height * imgWidth) / canvas.width;

		pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
		pdf.save("MyPortfolio.pdf");
	};

	return (
		<section className="w-full md:w-1/2 p-6 flex flex-col bg-transparent">
			<div className="flex justify-end mb-4">
				<button
					onClick={downloadPDF}
					className="px-4 py-2 rounded-lg border border-black/20 dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/10 transition">
					Download PDF
				</button>
			</div>
			<div
				ref={previewRef}
				className="border border-black/10 dark:border-white/10 rounded-xl p-8 flex-1 overflow-y-auto min-h-0">
				{/* Normal Tailwind preview for on-screen display */}
				<div className="mb-8">
					<h1 className="text-4xl font-bold tracking-tight">
						{formData.name || "Your Name"}
					</h1>
					<p className="mt-3 text-black/70 dark:text-white/70 text-lg leading-relaxed">
						{formData.bio || "Your short professional bio will appear here"}
					</p>
				</div>
				{/* ... keep your Tailwind preview here ... */}
			</div>
		</section>
	);
}
