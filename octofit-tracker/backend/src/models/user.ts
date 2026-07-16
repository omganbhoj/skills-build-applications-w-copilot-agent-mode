import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    role: { type: String, enum: ['member', 'captain', 'coach'], default: 'member' },
    fitnessLevel: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' }
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
