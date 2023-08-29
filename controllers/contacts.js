
const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Contact, schemas } = require("../models/contacts");
const { HttpError } = require("../helpers");





const listContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { error } = schemas.updateSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "Contact deleted" });

};

const updateStatusContact = async (req, res, next) => {
  const { error } = schemas.updateFavoriteSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true});
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};


module.exports = {
  listContacts: ctrlWrapper(listContacts),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
  getContactById: ctrlWrapper(getContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
