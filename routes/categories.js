var express = require("express");
var router = express.Router();
const db = require("../models");
const Category = db.Category;

/* GET home page. */
router.get("/categories", async function (req, res, next) {
  Category.findAll().then((data) => {
    res.render("categories/index", {
      categories: data,
    });
  });
});

// Add a new category
router.get("/categories/add", function (req, res, next) {
  res.render("categories/add");
});

router.post("/categories", function (req, res, next) {
  if (!req.body.category_name) {
    res.render("categories/add", {
      type: "danger",
      message: "category name can not be empty !",
    });
    return;
  }

  const category = {
    category_name: req.body.category_name,
  };

  Category.create(category)
    .then((data) => {
      res.render("categories/add", {
        type: "success",
        message: "Category " + data.category_name + " created successfully.",
      });
    })
    .catch((err) => {
      res.render("categories/add", {
        type: "danger",
        message:
          err.message || "Some error occurred while creating the category.",
      });
    });
});

// Update a category
router.get("/categories/edit/:id", function (req, res, next) {
  Category.findByPk(req.params.id)
    .then((data) => {
      res.render("categories/edit", {
        data: data,
      });
    })
    .catch((err) => {
      res.render("categories/edit", {
        type: "danger",
        message: "Category doesn't exist.",
      });
    });
});

router.post("/categories/edit/:id", function (req, res, next) {
  const id = req.params.id;
  if (!req.body.category_name) {
    res.render("categories/edit", {
      type: "danger",
      message: "category name can not be empty !",
    });
    return;
  }

  Category.update(req.body, {
    where: { id: id },
  })
    .then((numCategory) => {
      if (numCategory == 1) {
        res.redirect("/categories");
      } else {
        res.render("categories/edit", {
          type: "danger",
          message: "Cannot update category with id=${id} !",
        });
      }
    })
    .catch((err) => {
      res.render("categories/edit", {
        type: "danger",
        message: "Error updating category with id=${id} !",
      });
    });
});

router.post("/categories/delete/:id", function (req, res, next) {
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  }).then((numCategory) => {
    res.redirect("/categories");
  });
});

module.exports = router;
