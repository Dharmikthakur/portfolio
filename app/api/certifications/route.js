import certificationsData from '../../../data/certifications.json';

export async function GET() {
  return Response.json(certificationsData);
}
