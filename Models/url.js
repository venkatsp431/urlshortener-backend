import mongoose from "mongoose";
// const { customAlphabet } = require('nanoid');
import { customAlphabet } from "nanoid";

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
});

// Define your custom alphabet for short URLs (optional)
const customAlphabetChars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateShortId = customAlphabet(customAlphabetChars, 7); // Change the length as needed

// Function to generate a short URL
const generateShortUrl = () => {
  // Generate a random short ID
  const shortId = generateShortId();

  // Create the short URL based on your domain
  const shortUrl = `https://incomparable-k.app/${shortId}`; // Replace 'your-domain.com' with your actual domain

  return shortUrl;
};

// module.exports = generateShortUrl;

const Url = mongoose.model("Url", urlSchema);
export { Url };
export { generateShortUrl };
