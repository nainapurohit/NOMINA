// pdfExporter.js
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function createOffscreenIframe(html, width = 595) {
	const iframe = document.createElement("iframe");
	iframe.style.position = "fixed";
	iframe.style.left = "-9999px";
	iframe.style.width = `${width}px`; // ✅ fixed template literal
	iframe.style.border = "none";
	document.body.appendChild(iframe);

	const doc = iframe.contentWindow.document;
	doc.open();
	doc.write(html);
	doc.close();

	return { iframe, doc };
}

export async function generatePdfFromHtml(html, options = {}) {
	const { a4WidthPx = 595, a4HeightPx = 842 } = options;

	const { iframe, doc } = createOffscreenIframe(html, a4WidthPx);

	// small delay to allow iframe content to render
	await new Promise((resolve) => setTimeout(resolve, 500));

	const canvas = await html2canvas(doc.body, {
		scale: 2,
		backgroundColor: "#ffffff",
		useCORS: true, // ✅ ensures external images load correctly
	});

	const pdf = new jsPDF({
		orientation: "portrait",
		unit: "px",
		format: [a4WidthPx, a4HeightPx],
	});

	const img = canvas.toDataURL("image/png");

	// ✅ maintain aspect ratio
	const imgHeight = (canvas.height * a4WidthPx) / canvas.width;
	pdf.addImage(img, "PNG", 0, 0, a4WidthPx, imgHeight);

	pdf.save("MyPortfolio.pdf");

	document.body.removeChild(iframe);

	return { success: true };
}
