import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://HarshilKavar:5UL4CaNvNTDZYwtG@trakercluster.j76f55x.mongodb.net/demo"
    );
    console.log(db.connection.host);
    console.log(db.connection.name);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectToDB;
