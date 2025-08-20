import mongoose, { Schema, Document } from 'mongoose';
import { Product } from '@/types';

interface ProductDocument extends Omit<Product, '_id'>, Document {}

const ProductSchema = new Schema<ProductDocument>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
    required: true,
  }],
  category: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    currency: {
      type: String,
      required: true,
      default: 'USD',
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  variants: [{
    name: {
      type: String,
      required: true,
    },
    values: [{
      type: String,
      required: true,
    }],
  }],
  inventory: {
    sku: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    unlimited: {
      type: Boolean,
      default: false,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  externalLink: String,
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

// Indexes
ProductSchema.index({ isActive: 1, isFeatured: -1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ 'inventory.sku': 1 });
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });

// Virtual for availability
ProductSchema.virtual('isAvailable').get(function(this: ProductDocument) {
  return this.isActive && (this.inventory.unlimited || this.inventory.quantity > 0);
});

// Method to update inventory
ProductSchema.methods.updateInventory = function(this: ProductDocument, quantity: number) {
  if (!this.inventory.unlimited) {
    this.inventory.quantity = Math.max(0, this.inventory.quantity + quantity);
  }
  return this.save();
};

// Method to check if in stock
ProductSchema.methods.isInStock = function(this: ProductDocument, requestedQuantity = 1) {
  return this.inventory.unlimited || this.inventory.quantity >= requestedQuantity;
};

// Ensure virtual fields are serialized
ProductSchema.set('toJSON', { virtuals: true });
ProductSchema.set('toObject', { virtuals: true });

export default mongoose.models.Product || mongoose.model<ProductDocument>('Product', ProductSchema);
