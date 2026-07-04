const encoder = new TextEncoder();

function escapeText(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

export function generateTicketPdf({ name, email, phone }) {
  const title = "THE CAMPUS CEO";
  const subtitle = "Official Conference Ticket";
  const event = "Campus CEO Summit";
  const date = "July 3-5, 2026";
  const locations =
    "University Of Port Harcourt / Rivers State University / Ignatius Ajuru University";

  const esc = (s) => escapeText(String(s || ""));

  // Colors from site's theme (converted to RGB 0-1):
  const bg = "0.0588 0.0902 0.1647"; // #0f172a
  const gold = "0.831 0.686 0.216"; // #d4af37
  const textSoft = "0.796 0.835 0.882"; // #cbd5e1

  const stream = `
% Draw background
${bg} rg
0 0 612 792 re f

% Gold header
${gold} rg
0 612 612 180 re f

% Header text (white)
1 1 1 rg
BT
/F1 28 Tf
40 720 Td
(${esc(title)}) Tj
ET

1 1 1 rg
BT
/F1 14 Tf
40 700 Td
(${esc(subtitle)}) Tj
ET

% Event details
${textSoft} rg
BT
/F1 12 Tf
40 660 Td
(Event:) Tj
ET

1 1 1 rg
BT
/F1 14 Tf
120 660 Td
(${esc(event)}) Tj
ET

${textSoft} rg
BT
/F1 12 Tf
40 640 Td
(Date:) Tj
ET

1 1 1 rg
BT
/F1 14 Tf
120 640 Td
(${esc(date)}) Tj
ET

${textSoft} rg
BT
/F1 12 Tf
40 620 Td
(Locations:) Tj
ET

1 1 1 rg
BT
/F1 10 Tf
120 620 Td
(${esc(locations)}) Tj
ET

% Attendee box background (slightly lighter dark)
0.09 0.12 0.22 rg
40 360 532 220 re f

% Attendee labels
${textSoft} rg
BT
/F1 12 Tf
60 520 Td
(Name:) Tj
ET

1 1 1 rg
BT
/F1 16 Tf
140 520 Td
(${esc(name)}) Tj
ET

${textSoft} rg
BT
/F1 12 Tf
60 492 Td
(Email:) Tj
ET

1 1 1 rg
BT
/F1 12 Tf
140 492 Td
(${esc(email)}) Tj
ET

${textSoft} rg
BT
/F1 12 Tf
60 464 Td
(Phone:) Tj
ET

1 1 1 rg
BT
/F1 12 Tf
140 464 Td
(${esc(phone)}) Tj
ET

% Footer note
${textSoft} rg
BT
/F1 10 Tf
40 340 Td
(Present this ticket at the event entrance. Valid for a single attendee.) Tj
ET

`;

  const header = "%PDF-1.1\n";

  const streamBytes = encoder.encode(stream);

  const objs = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>\nendobj\n",
    `4 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n${stream}endstream\nendobj\n`,
    "5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
  ];

  const offsets = [];
  let position = encoder.encode(header).length;
  const pdfParts = [encoder.encode(header)];

  for (const part of objs) {
    offsets.push(position);
    const chunk = encoder.encode(part);
    pdfParts.push(chunk);
    position += chunk.length;
  }

  const xrefLines = ["xref\n0 6\n0000000000 65535 f \n"];
  for (const offset of offsets) {
    xrefLines.push(offset.toString().padStart(10, "0") + " 00000 n \n");
  }

  const trailer = `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${position}\n%%EOF`;
  const xref = encoder.encode(xrefLines.join("") + trailer);

  const pdfBuffer = new Uint8Array(position + xref.length);
  let cursor = 0;
  for (const chunk of pdfParts) {
    pdfBuffer.set(chunk, cursor);
    cursor += chunk.length;
  }
  pdfBuffer.set(xref, cursor);

  return URL.createObjectURL(
    new Blob([pdfBuffer], { type: "application/pdf" }),
  );
}
