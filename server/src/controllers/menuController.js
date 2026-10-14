import mongoose from 'mongoose';
import MenuItem from '../models/MenuItem.js';
import Category from '../models/Category.js';
import { menuItemsData, categoriesData } from '../config/seedData.js';

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export async function getCategories(req, res, next) {
  try {
    let categories = [];
    if (mongoose.connection.readyState === 1) {
      categories = await Category.find().sort({ order: 1 });
    }
    if (!categories || categories.length === 0) {
      categories = categoriesData;
    }
    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });
  } catch (err) {
    next(err);
  }
}

// @desc    Get all menu items (with search, category filter, dietary filter)
// @route   GET /api/menu
// @access  Public
export async function getMenuItems(req, res, next) {
  try {
    const { category, search, vegOnly, chefPick, mustTry } = req.query;

    let items = [];
    if (mongoose.connection.readyState === 1) {
      const query = { isAvailable: true };
      if (category && category !== 'All') {
        query.category = { $regex: new RegExp(category, 'i') };
      }
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { tags: { $in: [new RegExp(search, 'i')] } },
        ];
      }
      if (vegOnly === 'true') {
        query.isVeg = true;
      }
      if (chefPick === 'true') {
        query.isChefsPick = true;
      }
      if (mustTry === 'true') {
        query.isMustTry = true;
      }
      items = await MenuItem.find(query).sort({ order: 1 });
    }

    if (!items || items.length === 0) {
      // Memory fallback filter
      let filtered = [...menuItemsData];
      if (category && category !== 'All') {
        filtered = filtered.filter(
          (i) => i.category.toLowerCase() === category.toLowerCase()
        );
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(
          (i) =>
            i.name.toLowerCase().includes(q) ||
            (i.description && i.description.toLowerCase().includes(q)) ||
            (i.tags && i.tags.some((t) => t.toLowerCase().includes(q)))
        );
      }
      if (vegOnly === 'true') {
        filtered = filtered.filter((i) => i.isVeg);
      }
      if (chefPick === 'true') {
        filtered = filtered.filter((i) => i.isChefsPick);
      }
      if (mustTry === 'true') {
        filtered = filtered.filter((i) => i.isMustTry);
      }
      items = filtered;
    }

    res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (err) {
    next(err);
  }
}

// @desc    Get single menu item by slug or ID
// @route   GET /api/menu/:identifier
// @access  Public
export async function getMenuItem(req, res, next) {
  try {
    const { identifier } = req.params;
    let item = null;

    if (mongoose.connection.readyState === 1) {
      if (mongoose.Types.ObjectId.isValid(identifier)) {
        item = await MenuItem.findById(identifier);
      } else {
        item = await MenuItem.findOne({ slug: identifier });
      }
    }

    if (!item) {
      item = menuItemsData.find(
        (i) => i.slug === identifier || i.name.toLowerCase() === identifier.toLowerCase()
      );
    }

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found',
      });
    }

    res.json({
      success: true,
      data: item,
    });
  } catch (err) {
    next(err);
  }
}
