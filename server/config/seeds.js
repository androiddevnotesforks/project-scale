const db = require("./connection");
const { User, Category, Identity, Ambitions } = require("../models");

db.once("open", async () => {
    await Ambitions.deleteMany();
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { ambitionCategories: "Lose weight." },
        { ambitionCategories: "Save money." },
        { ambitionCategories: "Something." },
        { ambitionCategories: "Something Else." },
        { ambitionCategories: "Type faster." }
    ]);
    
    console.log('Categories seeded');

    await Identity.deleteMany();

    const identities = await Identity.insertMany([
        { identityCategories: 'I am determined!' }, 
        { identityCategories: 'I am inspired!' },
        { identityCategories: 'I am responsible!'},
        { identityCategories: 'I am Iron Man!' },
        { identityCategories: 'I am a programmer.'},
    ]);
    
    console.log("Identities seeded");

    await User.deleteMany();

    const jack = await User.create({
        username: "Jack",
        email: 'jack@test.com',
        password: 'password12345',
      });

      const jill = await User.create({
        username: "jill",
        email: 'jill@test.com',
        password: 'password12345',
      });

    console.log('Users seeded');

    process.exit();
});