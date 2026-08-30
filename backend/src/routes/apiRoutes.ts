import { Router } from 'express';
import { 
  getHealthStatus, 
  getProjects, 
  getExperiments, 
  getExperience, 
  getSkills, 
  handleContact 
} from '../controllers/apiController';

const router = Router();

router.get('/health', getHealthStatus);
router.get('/projects', getProjects);
router.get('/experiments', getExperiments);
router.get('/experience', getExperience);
router.get('/skills', getSkills);
router.post('/contact', handleContact);

export default router;
