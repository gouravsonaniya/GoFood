if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.ATLASDB_URL;

const mongoDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const fetched_data = await mongoose.connection.db
            .collection("food_items")
            .find({})
            .toArray();

        const foodCategory = await mongoose.connection.db
            .collection("foodCategory")
            .find({})
            .toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

    } catch (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1); // Exit the app to avoid unstable behavior.
    }
};

module.exports = mongoDB;
