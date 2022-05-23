import { createHash } from 'crypto';

export function sha256hash(data:any): string {
  const stringData = JSON.stringify(data);
  const hash = createHash('sha256').update(stringData).digest('hex');
  return hash;
}
