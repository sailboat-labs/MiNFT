const express = require("express");
const mongoose = require("mongoose");
const examples = require("./examples.json");
const recipes = require("./recipes.json");
const users = require("./users.json");

const recipeModel = require("./models/recipes.js");

(async () => {
  const app = express();
  mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.once("connected", () =>
    console.log("💚 connected to Db")
  );
  mongoose.connection.on("error", () =>
    console.log("🚫error connecting to db")
  );

  /**
   *-------------------------------------------------------
   */

  const appRouter = express.Router();

  appRouter.get("/", async (req, res) => {
    try {
      let result = await recipeModel.find({
        // likes_count: {
        //   $in: [0, 2],
        // },
        // "quantity.amount": 12,
        // "quantity.unit": "oz",
        // type: {
        //   $in: ["Dinner", "Lunch"],
        // },
        // rating: { $size: 4 },
        $expr: {
          likes: {
            $sum: "$likes",
          },
        },
      });
      console.log(result.length);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  });

  app.use("/~/api", appRouter);

  app.listen(process.env.PORT || 1001, () =>
    console.log("🚀 server running on port 1001")
  );
})();

async function insertRecipies(recipes) {
  try {
    await recipeModel.insertMany(recipes);
  } catch (err) {
    console.error(err);
  }
}
