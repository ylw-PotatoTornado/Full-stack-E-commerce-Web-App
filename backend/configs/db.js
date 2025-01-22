import dotenv from "dotenv";
import { Sequelize } from 'sequelize';
import { UserModel } from '../models/User.model.js';
import { AddressModel } from '../models/Address.model.js';
import { CategoryModel } from '../models/Category.model.js';
import { ProductModel } from '../models/Product.model.js';
import { InventoryModel } from '../models/Inventory.model.js';
import { CategoryProductModel } from '../models/CategoryProduct.model.js';
import { CartModel } from '../models/Cart.model.js';
import { CartProductModel } from '../models/CartProduct.model.js';
import { OrderModel } from '../models/Order.model.js';
import { OrderProductModel } from '../models/OrderProduct.model.js';
import { RatingModel } from '../models/Rating.model.js';

dotenv.config();

{/** Init sequelize instance */}
const sequelize = new Sequelize(
    process.env.DB_URI, 
    {
        dialect: 'postgres',
        logging: false,
    })


{/** Init data models */}
const User = UserModel(sequelize);
const Address = AddressModel(sequelize);
const Category = CategoryModel(sequelize);
const Product = ProductModel(sequelize);
const Inventory = InventoryModel(sequelize);
const CategoryProduct = CategoryProductModel(sequelize);
const Cart = CartModel(sequelize);
const CartProduct = CartProductModel(sequelize);
const Order = OrderModel(sequelize);
const OrderProduct = OrderProductModel(sequelize);
const Rating = RatingModel(sequelize);

{/** Define model relationships */}
User.hasMany(Address, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Address.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

User.hasMany(Cart, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Cart.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

User.hasMany(Order, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Order.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})


Cart.hasMany(CartProduct, {
    foreignKey: 'cart_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
CartProduct.belongsTo(Cart, {
    foreignKey: 'cart_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Order.hasMany(OrderProduct, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
OrderProduct.belongsTo(Order, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Order.hasMany(Rating, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Rating.belongsTo(Order, {
    foreignKey: 'order_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Product.hasMany(CartProduct, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
CartProduct.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})


Product.hasMany(CategoryProduct, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
CategoryProduct.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Category.hasMany(CategoryProduct, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
CategoryProduct.belongsTo(Category, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})


Product.hasOne(Inventory, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Inventory.belongsTo(Product, {
    foreignKey: 'product_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})



{/** Establish DB Connection */}
export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB successfully connected');
        if (process.env.NODE_ENV !== 'production') {
            console.log('Synchronizing database schema...');
            await sequelize.sync();
            console.log('Database Schema synced');
        } else {
            console.log(`Database Schema synchronization require manual check for ${process.env.NODE_ENV} environment.`)
        }
    } catch (error) {
        console.error('DB connection failed', error);
        throw error;
    }
}