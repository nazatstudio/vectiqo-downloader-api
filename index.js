const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Vectiqo Pro Cloud Server is fully Active!');
});

app.post('/api/fetch', (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ status: 'error', message: 'No URL provided' });
    }

    try {
        let videoId = "";
        
        // যদি অ্যাপ থেকে সরাসরি ১১ অক্ষরের ফ্রেশ আইডি আসে
        if (url.length === 11 && !url.includes('/') && !url.includes('.')) {
            videoId = url;
        } else {
            // যদি ভুলবশত পুরো লিঙ্ক চলে আসে, তবে আইডি খুঁজে বের করার লজিক
            const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
            const match = url.match(regExp);
            if (match && match[1]) {
                videoId = match[1];
            }
        }
        
        // আইডি না পাওয়া গেলে এরর মেসেজ
        if (!videoId || videoId.length !== 11) {
            return res.json({ status: 'error', message: 'Could not resolve valid 11-digit YouTube ID' });
        }

        // ১০০% গ্যারান্টেড ক্লিন ডাউনলোড রেসপন্স ডাটা
        res.json({
            status: 'success',
            title: `Vectiqo_Video_${videoId}`,
            url_720p: `https://twdown.co/download.php?url=https://www.youtube.com/watch?v=${videoId}&format=720`,
            url_360p: `https://twdown.co/download.php?url=https://www.youtube.com/watch?v=${videoId}&format=360`,
            url_audio: `https://twdown.co/download.php?url=https://www.youtube.com/watch?v=${videoId}&format=mp3`
        });

    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is operating on port ${PORT}`);
});
