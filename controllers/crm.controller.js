const fetch = require("node-fetch");
const sql = require("../configs/db");

// @desc   Create new contact
// @route  POST /createContact
exports.createContact = async (req, res, next) => {
  const { first_name, last_name, email, mobile_number, data_store } = req.body;

  if (data_store == "CRM") {
    const payload = {
      first_name,
      last_name,
      email,
      mobile_number,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Token token=${process.env.AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const fetchRes = await fetch(
        "https://interactly-476797496188262170.myfreshworks.com/crm/sales/api/contacts",
        options
      );
      const response = await fetchRes.json();
      res
        .status(200)
        .json({ success: true, res: "Contact created", data: response });
    } catch (err) {
      if (process.env.NODE_ENV == "development") {
        console.log("err: ", err);
      }
      res.status(500).json({ success: false, error: err.message });
    }
  } else if (data_store == "DATABASE") {
    sql.query(
      "INSERT INTO contacts (first_name, last_name, email, mobile_number) VALUES (?,?,?,?)",
      [first_name, last_name, email, mobile_number],
      (err) => {
        if (err) {
          // Log errors only in development mode
          if (process.env.NODE_ENV == "development") {
            console.log("err: ", err);
          }
          res.status(500).json({ success: false, error: err.message });
          return;
        }
        res.status(200).json({ success: true, res: "Contact created" });
      }
    );
  } else {
    res.status(400).json({
      error: "Please provide data_store parameter value as 'CRM' or 'DATABASE'",
    });
  }
};

// @desc   Get single contact
// @route  GET /getContact
exports.getContact = async (req, res, next) => {
  const { contact_id, data_store } = req.body;

  if (data_store == "CRM") {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Token token=${process.env.AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const fetchRes = await fetch(
        `https://interactly-476797496188262170.myfreshworks.com/crm/sales/api/contacts/${contact_id}`,
        options
      );
      const response = await fetchRes.json();
      res.status(200).json({ success: true, data: response });
    } catch (err) {
      if (process.env.NODE_ENV == "development") {
        console.log("err: ", err);
      }
      res.status(404).json({ success: false, error: err.message });
    }
  } else if (data_store == "DATABASE") {
    sql.query(
      "SELECT * FROM contacts WHERE id=?",
      [contact_id],
      (err, result) => {
        if (err) {
          // Log errors only in development mode
          if (process.env.NODE_ENV == "development") {
            console.log("err: ", err);
          }
          res.status(500).json({ success: false, error: err.message });
          return;
        }
        res.status(200).json({ success: true, data: result });
      }
    );
  } else {
    res.status(400).json({
      error: "Please provide data_store parameter value as 'CRM' or 'DATABASE'",
    });
  }
};

// @desc   Update contact
// @route  POST /updateContact
exports.updateContact = async (req, res, next) => {
  const { contact_id, new_email, new_mobile_number, data_store } = req.body;

  if (data_store == "CRM") {
    const payload = {
      email: new_email,
      mobile_number: new_mobile_number,
    };
    const options = {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        Authorization: `Token token=${process.env.AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const fetchRes = await fetch(
        `https://interactly-476797496188262170.myfreshworks.com/crm/sales/api/contacts/${contact_id}`,
        options
      );
      const response = await fetchRes.json();
      res
        .status(200)
        .json({ success: true, res: "Contact updated", data: response });
    } catch (err) {
      if (process.env.NODE_ENV == "development") {
        console.log("err: ", err);
      }
      res.status(500).json({ success: false, error: err.message });
    }
  } else if (data_store == "DATABASE") {
    sql.query(
      "UPDATE contacts SET email=?,mobile_number=? WHERE id='?'",
      [new_email, new_mobile_number, contact_id],
      (err,result) => {
        if (err) {
          // Log errors only in development mode
          if (process.env.NODE_ENV == "development") {
            console.log("err: ", err);
          }
          res.status(500).json({ success: false, error: err.message });
          return;
        }
        res.status(200).json({ success: true, res: "Contact updated" });
      }
    );
  } else {
    res.status(400).json({
      error: "Please provide data_store parameter value as 'CRM' or 'DATABASE'",
    });
  }
};
