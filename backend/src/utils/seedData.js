import dotenv from 'dotenv';
import mongoose from 'mongoose';

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Product from '../models/Product.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();

    const manager = await User.create({
      name: 'Manager One',
      email: 'manager@slooze.xyz',
      password: 'Password123',
      role: 'MANAGER',
    });

    const storeKeeper = await User.create({
      name: 'Store Keeper One',
      email: 'keeper@slooze.xyz',
      password: 'Password123',
      role: 'STORE_KEEPER',
    });

    const sampleProducts = [
      {
        name: 'Premium Basmati Rice',
        category: 'Grains',
        price: 80,
        stock: 120,
        unit: 'kg',
        supplier: 'Golden Farms',
        description: 'High quality aged basmati rice.',
        createdBy: manager._id,
        updatedBy: manager._id,
      },
      {
        name: 'Organic Milk',
        category: 'Dairy',
        price: 55,
        stock: 40,
        unit: 'liters',
        supplier: 'Green Valley Dairies',
        description: 'Fresh organic cow milk.',
        createdBy: storeKeeper._id,
        updatedBy: storeKeeper._id,
      },
      {
        name: 'Red Apples',
        category: 'Fruits',
        price: 120,
        stock: 25,
        unit: 'kg',
        supplier: 'Himalayan Orchards',
        description: 'Crisp and juicy red apples.',
        createdBy: manager._id,
        updatedBy: manager._id,
      },
    ];

    await Product.insertMany(sampleProducts);

    console.log('✅ Seed data created successfully');
    console.log('Manager login: manager@slooze.xyz / Password123');
    console.log('Store Keeper login: keeper@slooze.xyz / Password123');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error', error);
    process.exit(1);
  }
};

seed();
