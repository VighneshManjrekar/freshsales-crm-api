const router = require("express").Router();

const { createContact, getContact } = require("../controllers/crm.controller");

router.post("/createContact", createContact);
router.get("/getContact", getContact);

module.exports = router;
