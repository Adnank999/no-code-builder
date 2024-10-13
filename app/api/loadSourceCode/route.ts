import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const dirPath = path.join(process.cwd(), 'app'); 
  const files = {};

  const readFilesRecursively = (dir: string) => {
    const fileList = fs.readdirSync(dir);

    fileList.forEach((file) => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
     
        readFilesRecursively(filePath);
      } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
       
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const relativePath = path.relative(process.cwd(), filePath); // Get relative path for display
        files[relativePath] = fileContent;
      }
    });
  };

 
  readFilesRecursively(dirPath);

  return NextResponse.json({ files });
}
