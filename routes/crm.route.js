const router = require("express").Router();

const {
  createContact,
  getContact,
  updateContact,
} = require("../controllers/crm.controller");

router.post("/createContact", createContact);
router.get("/getContact", getContact);
router.post("/updateContact", updateContact);

module.exports = router;
