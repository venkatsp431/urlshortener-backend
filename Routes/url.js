import express from "express";
const router = express.Router();
import { Url, generateShortUrl } from "../Models/url.js";

// Generate a short URL from a long URL
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!longUrl) {
    return res.status(400).json({ error: "longUrl is required" });
  }
  try {
    // Generate a short URL (you can use a library like nanoid)
    const shortUrl = generateShortUrl(); // Implement this function

    // Create a new URL record in the database
    const url = new Url({
      longUrl,
      shortUrl,
    });

    await url.save();

    res.status(201).json({ shortUrl, longUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;


    const url = await Url.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    url.clickCount += 1;
    await url.save();


    res.redirect(url.longUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.get("/statistics", async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

 
    const urlsPerDay = await Url.countDocuments({
      createdAt: { $gte: today },
    });

    const urlsPerMonth = await Url.countDocuments({
      createdAt: { $gte: lastMonth },
    });


    const clickCounts = await Url.find({}, "shortUrl clickCount");

    res.status(200).json({
      urlsPerDay,
      urlsPerMonth,
      clickCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export const urlRouter = router;
