const express = require("express");
const bodyParser = require("body-parser"); // Import body-parser
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
const path = require("path");

// Create an Express app
const app = express();

// Define middleware for parsing JSON and urlencoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public directory
app.use(express.static("public"));

// Serve static files from the routes directory (if necessary)
app.use("/routes", express.static(path.join(__dirname, "routes")));

// Define API routes
app.use("/api", apiRoutes);

// Define HTML routes
app.use("/", htmlRoutes);

// Set up server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
