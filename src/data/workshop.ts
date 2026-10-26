import { getWorkshopProjects } from '../lib/github';
import type { WorkshopCard } from '../types/portfolio';

export const workshopProjects: WorkshopCard[] = await getWorkshopProjects();
export { getWorkshopProjects };
export default workshopProjects;
