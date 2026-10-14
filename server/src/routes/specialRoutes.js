import express from 'express';
import mongoose from 'mongoose';
import SpecialOfTheDay from '../models/SpecialOfTheDay.js';

const router = express.Router();

const defaultSpecial = {
  title: "Tomorrow's Chef Special Showcase",
  subtitle: "Handpicked innovative gastronomy prepared exclusively for tomorrow's lunch and evening service.",
  dateText: "Available Tomorrow · From 12:00 PM",
  isActive: true,
  dishes: [
    {
      name: "Pineapple Biryani",
      tag: "Fragrant Heritage",
      description: "Slow-dum basmati infused with sweet caramelised pineapple cubes, royal saffron, and roasted cashews.",
      price: 420,
      isVeg: true,
    },
    {
      name: "Orange Dip Manchurian",
      tag: "Citrus Fusion",
      description: "Crispy vegetable spheres glazed with fresh Valencia orange reduction and roasted garlic chili.",
      price: 380,
      isVeg: true,
    },
    {
      name: "Three-Flavour Sushi",
      tag: "Japanese Craft",
      description: "Avocado, asparagus tempura, and spicy yuzu crunch rolled in nori and toasted sesame seeds.",
      price: 450,
      isVeg: true,
    },
    {
      name: "Charcoal Fettuccine Pasta",
      tag: "Smoky Truffle",
      description: "Activated charcoal artisan pasta ribbons in smoky bell pepper emulsion with fresh burrata.",
      price: 440,
      isVeg: true,
    },
    {
      name: "Tandoori Paneer Pizza",
      tag: "Woodfired Oven",
      description: "Thin-crust sourdough with charred spiced cottage cheese, san marzano tomato sauce, and basil.",
      price: 450,
      isVeg: true,
    },
    {
      name: "Zesty Lemon Sorbet & Gelato",
      tag: "Sweet Finish",
      description: "Palate-cleansing organic lemon sorbet crowned with candied citrus rind and mint oil.",
      price: 280,
      isVeg: true,
    },
  ],
};

router.get('/specials', async (req, res, next) => {
  try {
    let special = null;
    if (mongoose.connection.readyState === 1) {
      special = await SpecialOfTheDay.findOne({ isActive: true }).sort({ createdAt: -1 });
    }
    if (!special) {
      special = defaultSpecial;
    }
    res.json({
      success: true,
      data: special,
    });
  } catch (err) {
    next(err);
  }
});

export default router;
