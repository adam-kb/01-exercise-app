import { v4 as uuidv4 } from "uuid";
import multer from "multer";
import path from "path";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { NextApiRequest } from "next";

const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
const FILE_SIZE = 4 * 1024 * 1024; // 4MB limit

// Configure Multer storage
const uploadDir = path.join(process.cwd(), "media/thumbnails");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueName = `${path.basename(file.originalname, extension)}-${uuidv4()}${extension}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: FILE_SIZE
  },
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_EXTENSIONS.includes(path.extname(file.originalname))) {
      return cb(new Error("Invalid file type"));
    }
    cb(null, true);
  },
});

// Utility: Convert Request to Readable Stream
function toReadable(req: Request): Readable {
  const reader = req.body?.getReader();
  return new Readable({
    async read() {
      if (!reader) return this.push(null);
      const { done, value } = await reader.read();
      if (done) return this.push(null);
      this.push(value);
    },
  });
}

// Utility: Adapt Request for Multer
function toNextApiRequest(req: Request): NextApiRequest {
  const readable = toReadable(req);

  // Return a new object with all necessary properties
  return Object.assign(readable, {
    headers: Object.fromEntries(req.headers.entries()),
    method: req.method,
    url: req.url,
  }) as unknown as NextApiRequest;
}

export async function POST(req: Request) {
  console.log("Starting POST handler");

  // Convert the Next.js Request to a Multer-compatible object
  const adaptedRequest = toNextApiRequest(req);

  return new Promise((resolve, reject) => {
    upload.single("file")(adaptedRequest as any, {} as any, async (err: any) => {
      if (err) {
        console.error("Error handling file upload:", err);
        return resolve(
          NextResponse.json({ error: err.message || "File upload failed" }, { status: 400 })
        );
      }

      // Access uploaded file
      const file = (adaptedRequest as any).file;
      if (!file) {
        console.error("No file uploaded");
        return resolve(
          NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        );
      }

      console.log("Uploaded file:", file);

      return resolve(
        NextResponse.json({ mediaKey: file.filename }, { status: 200 })
      );
    });
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing for Multer
  },
};
