const axios = require('axios');
const mongoose = require('mongoose');
const News = require("./models/News");
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected for seeding");

    // Correct URL with API Key from env
    const API_URL = `https://newsapi.org/v2/everything?q=tesla&from=2025-12-20&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(API_URL);
    const articles = response.data.articles;

    // Data format
    const formattedNews = articles.map(item => ({
      title: item.title,
      description: item.description,
      url: item.url,
      urlToImage: item.urlToImage,
      publishedAt: item.publishedAt,
      sourceName: item.source?.name || ''
    }));

    await News.deleteMany({});
    await News.insertMany(formattedNews);
    console.log("Data successfully saved to MongoDB");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding data", error);
    process.exit(1);
  }
};

seedData();
