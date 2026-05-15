// template.js
import { escapeHtml } from "./utils";

export function buildHtmlTemplate(formData = {}, options = {}) {
	const { a4WidthPx = 595 } = options;

	const skillsHTML = formData.skills
		? formData.skills
				.split(",")
				.map((skill) => `<span class="chip">${escapeHtml(skill.trim())}</span>`)
				.join("")
		: `<span class="muted">No skills added yet</span>`;

	const projectsHTML =
		Array.isArray(formData.projects) && formData.projects.length
			? formData.projects
					.map((project) => {
						const title = escapeHtml(project.title || "Untitled Project");
						const desc = escapeHtml(
							project.description || "Project description",
						);
						const link = project.link ? escapeHtml(project.link) : "";

						const linkHtml = link
							? `<a class="project-link" href="${link}" target="_blank">View Project →</a>`
							: "";

						return `
              <div class="project">
                <h3>${title}</h3>
                <p>${desc}</p>
                ${linkHtml}
              </div>
            `;
					})
					.join("")
			: `<p class="muted">Your projects will appear here.</p>`;

	return `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<style>
body{
  font-family: Arial;
  padding:40px;
  width:${a4WidthPx}px;
}
h1{font-size:32px;margin-bottom:6px;}
h2{font-size:13px;margin-top:28px;text-transform:uppercase;}
.chip{
  display:inline-block;
  padding:6px 10px;
  border:1px solid #ccc;
  border-radius:999px;
  margin:4px;
  font-size:12px;
}
.project{
  border:1px solid #ddd;
  padding:12px;
  border-radius:10px;
  margin-top:12px;
  page-break-inside:avoid;
}
a{color:#1a73e8;}
.muted{color:#888;}
</style>
</head>

<body>

<h1>${escapeHtml(formData.name || "Your Name")}</h1>
<p>${escapeHtml(formData.bio || "Your short professional bio")}</p>

<h2>Skills</h2>
<div>${skillsHTML}</div>

<h2>Projects</h2>
${projectsHTML}

</body>
</html>`;
}
