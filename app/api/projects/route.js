import projectsData from '@/data/projects.json';

export async function GET() {
  return Response.json(projectsData);
}
