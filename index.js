const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// বেসিক চেক করার জন্য হোম রুট
app.get('/', (req, res) => {
    res.send('Vectiqo Pro Private Cloud Server is Running smoothly!');
});

// ইউটিউব লিঙ্ক প্রসেস করার মূল ইঞ্জিন API
app.post('/api/fetch', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ status: 'error', message: 'No URL provided' });
    }

    try {
        // ইউটিউব আইডি এক্সট্র্যাক্ট করা
        let videoId = "";
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
        const match = url.match(regExp);
        
        if (match && match[2].length === 11) {
            videoId = match[2];
        } else {
            return res.json({ status: 'error', message: 'Invalid YouTube URL structure' });
        }

        // হাই-স্পিড পিউর সিডিএন স্ট্রিম লিঙ্ক ম্যাপিং (যা বিজ্ঞাপন ছাড়া সরাসরি ফাইল রিড করবে)
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
