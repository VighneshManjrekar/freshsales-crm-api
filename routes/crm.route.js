const router = require("express").Router();

const { createContact } = require("../controllers/crm.controller");

router.post("/createContact", createContact);

module.exports = router;
