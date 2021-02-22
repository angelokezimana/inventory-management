var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoriesRouter = require("./routes/categories");

var app = express();

// view engine setup
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "main",
    partialsDir: ["views/partials"],
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.get("/users", usersRouter);

//categories
app.get("/categories", categoriesRouter);
app.get("/categories/add", categoriesRouter);
app.post("/categories", categoriesRouter);
app.get("/categories/edit/:id", categoriesRouter);
app.post("/categories/edit/:id", categoriesRouter);
app.post("/categories/delete/:id", categoriesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
