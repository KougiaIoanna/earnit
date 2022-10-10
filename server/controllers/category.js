const Category = require("../models/category");
const JSON = require("../helpers/jsonResponse");
const db = require("../models/db");
const jwt = require("jsonwebtoken");
const jwtDecode = require("../helpers/jwtDecode");

exports.createCategory = async (req, res) => {
  const { categoryName, categoryType, icon } = req.body;
  const id = jwtDecode(req.headers.authorization);
  if (
    categoryName === undefined ||
    categoryName === null ||
    categoryType === undefined ||
    categoryType === null
  ) {
    JSON(res, false, "mandatory fields(name,type) cannot be null");
    return;
  }
  await Category.create(
    id,
    categoryName,
    categoryType,
    icon,
    (err, category) => {
      if (!err) JSON(res, true, { data: category });
      if (err) JSON(res, false, err);
    }
  );
};

exports.getIncomeCategories = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  await Category.getAllIncome(id, (err, categories) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: categories });
  });
};

exports.getSpendingCategories = async (req, res) => {
  const id = jwtDecode(req.headers.authorization);
  await Category.getAllSpending(id, (err, categories) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: categories });
  });
};

exports.getCategoryById = async (req, res) => {
  const categoryId = req.params.category_id;

  await Category.getById(categoryId, (err, category) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: category });
  });
};

exports.getCategoryFromName = async (req, res) => {
  const categoryName = req.params.category_name;

  const userId = jwtDecode(req.headers.authorization);

  await Category.getCategoryFromName(userId, categoryName, (err, id) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: id });
  });
};

exports.updateCategory = async (req, res) => {
  const categoryName = req.body.categoryName;
  const icon = req.body.icon;
  const categoryId = req.params.category_id;
  if (categoryName === undefined || categoryName === null) {
    JSON(res, false, "category name is a mandatory field");
    return;
  }
  await Category.update(categoryId, categoryName, icon, (err, categories) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: categories });
  });
};

exports.updateBudget = async (req, res) => {
  const { categoryId, budgetId } = req.body;
  if (
    categoryId === null ||
    categoryId === undefined ||
    budgetId === null ||
    budgetId === undefined
  ) {
    JSON(res, false, "category id cannot be null");
    return;
  }
  await Category.updateBudget(categoryId, budgetId, (err, categories) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: categories });
  });
};

exports.hideCategory = async (req, res) => {
  const categoryId = req.params.category_id;
  await Category.hideCategory(categoryId, (err, category) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { data: category });
  });
};

exports.deleteCategory = async (req, res) => {
  const categoryId = req.params.category_id;

  await Category.delete(categoryId, (err, categories) => {
    if (err) JSON(res, false, err);
    JSON(res, true, { status: "successfully deleted" });
  });
};
