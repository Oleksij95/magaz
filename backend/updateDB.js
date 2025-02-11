require("dotenv").config();
const axios = require("axios");
const mongoose = require("mongoose");

// Подключение к MongoDB
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Подключено к MongoDB"))
  .catch((err) => console.error("Ошибка подключения:", err));

// Модель для хранения данных о скинах
// const SkinSchema = new mongoose.Schema({
//   name: String,
//   price: String,
//   img: String,
//   rarity: String,
// });

const ProductSchema = new mongoose.Schema({
    seo_title: { type: String, require: false, min: 3 },
    seo_description: { type: String, require: false, min: 3 },
    name: { type: String, require: true, min: 3, unique: false },
    slug: { type: String, require: false, min: 3, unique: true },
    price: { type: String, require: true },
    description: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    img: { type: String, require: false },
    rarity: { type: String, require: false },
    isPopular: { type: Boolean, default: false },
    isNewProduct: { type: Boolean, default: false },
    date_create: { type: Date, default: Date.now },
})

const Product = mongoose.model("Product", ProductSchema);

// Функция для загрузки данных о скинах
const fetchSkins = async () => {
  try {
    const response = await axios.get(process.env.STEAM_API_URL, {
      params: {
        query: "",
        appid: 730,
        norender: 1,
        count: 100,
        start: 111
      },
    });

    if (response.data && response.data.results) {
      const skins = response.data.results.map((item) => ({
        seo_title: item.name,
        seo_description: item.name + "Our shop",
        name: item.name,
        slug: item.name.replaceAll(" ", "-"),
        price: item.sell_price_text || "N/A",
        category: "67ab75e51130dd1350c8fe06",
        img: `https://community.cloudflare.steamstatic.com/economy/image/${item.asset_description.icon_url}`,
        rarity: item.asset_description.type || "Unknown",
        description: ""
      }));

      await Product.insertMany(skins);
      console.log("✅ Скины успешно сохранены в MongoDB");
    } else {
      console.log("❌ Данные о скинах не найдены");
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Запуск загрузки скинов
fetchSkins();
