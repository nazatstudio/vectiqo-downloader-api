const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Vectiqo Pro Private Cloud Server is Running smoothly!');
});

app.post('/api/fetch', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ status: 'error', message: 'No URL provided' });
    }

    try {
        let videoId = "";
        
        // সব ধরনের ইউটিউব ও শর্টস লিঙ্ক (Clean & Tracking ID সহ) চেনার উন্নত লজিক
        const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
        const match = url.match(regExp);
        
        if (match && match[1]) {
            videoId = match[1];
        } else {
            return res.json({ status: 'error', message: 'Invalid YouTube URL structure' });
        }

        // বিজ্ঞাপন মুক্ত পিউর ডাউনলোড গেটওয়ে ম্যাপিং
        const result = {
            status: 'success',
            title: `Vectiqo_Video_${videoId}`,
            url_720p: `https://loader.to/api/button/?url=https://www.youtube.com/watch?v=${videoId}&f=720`,
            url_360p: `https://loader.to/api/button/?url=https://www.youtube.com/watch?v=${videoId}&f=360`,
            url_audio: `https://loader.to/api/button/?url=https://www.youtube.com/watch?v=${videoId}&f=mp3`
        };

        res.json(result);

    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is operating on port ${PORT}`);
});
