import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const schemaPath = path.resolve('prisma/schema.prisma');
const env = process.env.NODE_ENV === 'production' ? 'postgresql' : 'sqlite';

console.log(`Switching database provider to: ${env}`);

let schema = fs.readFileSync(schemaPath, 'utf8');
const updatedSchema = schema.replace(
  /provider = "(sqlite|postgresql)"/g,
  `provider = "${env}"`
);

if (schema !== updatedSchema) {
  fs.writeFileSync(schemaPath, updatedSchema);
  console.log('schema.prisma updated.');
  
  console.log('Regenerating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
} else {
  console.log('schema.prisma already correct.');
}
