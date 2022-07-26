const db = require("./connection");
const { User, Category } = require("../models");

db.once("open", async () => {
    await Category.deleteMany();

    const categories = await Category.insertMany([
        { name: 'Food' },
        { name: 'Household Supplies' },
        { name: 'Electronics' },
        { name: 'Books' },
        { name: 'Toys' }
    ]);

    await User.deleteMany();

    const jack = await User.create({
        username: "Jack",
        email: 'jack@test.com',
        password: 'password12345',
        identity: [
            {
                name: "I am determined...",
                ambitions: [
                    {
                        name: "Test Ambition",
                        timeLimit: 7,
                        category: categories[0]._id,
                        user: jack._id,
                        public: false,
                    },
                ]
            },
        ]
      });

      const jill = await User.create({
        username: "jill",
        email: 'jill@test.com',
        password: 'password12345',
        identity: [
            {
                name: "I am inspired...",
                ambitions: [
                    {
                        name: "Other Ambition",
                        timeLimit: 28,
                        category: categories[2]._id,
                        user: jill._id,
                        public: false,
                    },
                ]
            },
        ]
      });

    console.log('Users seeded');

    process.exit();
});