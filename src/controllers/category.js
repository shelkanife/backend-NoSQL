const Category = require("../models/category");

export async function getAllCategories(req, res) {
  const categories = await Category.getAllCategories();
  return res.status(200).send({ categories });
}
