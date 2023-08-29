const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contacts");


router.get("/", ctrl.listContacts);

router.get("/:contactId", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:contactId", isValidId, ctrl.removeContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);


module.exports = router;
