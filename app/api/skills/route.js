import skillsData from '../../../data/skills.json';

export async function GET() {
  return Response.json(skillsData);
}
