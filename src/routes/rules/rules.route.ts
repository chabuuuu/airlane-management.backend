import { ruleController } from '@/container/rule.container';
import express from 'express';

const rulesRouter = express.Router();

rulesRouter

.get('/', ruleController.getRules.bind(ruleController))

export default rulesRouter;