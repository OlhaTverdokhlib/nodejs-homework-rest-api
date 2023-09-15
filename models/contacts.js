const {Schema, model} = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");


const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",

    }
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().min(2).max(40).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(12).max(15).required(),
});

const updateSchema = Joi.object().required();

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});


const schemas = {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
