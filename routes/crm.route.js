const router = require("express").Router();

const {
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/crm.controller");

router.post("/createContact", createContact);
router.get("/getContact", getContact);
router.post("/updateContact", updateContact);
router.post("/deleteContact", deleteContact);

module.exports = router;
