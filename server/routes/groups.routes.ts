import express from 'express';
import GroupsController from '../controllers/groups.controller';

const router = express.Router();

router.route("/groups/:restaurant_id").get(GroupsController.getGroups.bind(GroupsController));
router.route("/groups").post(GroupsController.createGroup.bind(GroupsController));
router.route("/groups").put(GroupsController.updateGroup.bind(GroupsController));
router.route("/groups/:id").delete(GroupsController.deleteGroup.bind(GroupsController));

export default router;