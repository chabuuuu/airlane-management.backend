import { Subject } from '@/auth/subjects';
import { ruleController } from '@/container/rule.container';
import { ModifyRulesDto } from '@/dto/rules/modify-rules.dto';
import { ActionAuth } from '@/enums/action.auth.enum';
import { checkRole } from '@/middleware/check-role.middleware';
import { classValidate } from '@/middleware/class-validate.middleware';
import { authenticateJWT } from '@/middleware/jwt.authenticate.middleware';
import express from 'express';

const rulesRouter = express.Router();

rulesRouter

.put('/modify', classValidate(ModifyRulesDto), authenticateJWT, checkRole(ActionAuth.UPDATE, Subject.Rule), ruleController.update.bind(ruleController))
.get('/', ruleController.getRules.bind(ruleController))

export default rulesRouter;