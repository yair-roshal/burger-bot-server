const express = require("express");
const router = express.Router();
const GroupsController = require("../controllers/groups.controller.js");

router.route("/groups/:restaurant_id").get(GroupsController.getGroups);
router.route("/groups").post(GroupsController.createGroup);
router.route("/groups").put(GroupsController.updateGroup);
router.route("/groups/:id").delete(GroupsController.deleteGroup);

module.exports = router;
