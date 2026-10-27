import fs from "fs";
import path from "path";

const STORAGE_DIR = path.join(process.cwd(), "storage", "resumes");

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

export async function savePrivateResume(
  file: File
): Promise<{ storedName: string; originalName: string; size: number; mimeType: string }> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Generate safe unique filename
  const timestamp = Date.now();
  const safeRandom = Math.random().toString(36).substring(2, 9);
  const ext = path.extname(file.name) || ".pdf";
  const storedName = `resume_${timestamp}_${safeRandom}${ext}`;
  const filePath = path.join(STORAGE_DIR, storedName);

  await fs.promises.writeFile(filePath, buffer);

  return {
    storedName,
    originalName: file.name,
    size: file.size,
    mimeType: file.type,
  };
}

export function getPrivateResumePath(storedName: string): string | null {
  // Prevent path traversal
  const safeName = path.basename(storedName);
  const filePath = path.join(STORAGE_DIR, safeName);
  if (fs.existsSync(filePath)) {
    return filePath;
  }
  return null;
}
