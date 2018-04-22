const fs = require('fs');

cmd.get('raspitstill -o cam.jpg',
    async function (err, data, stderr) {
        const img = fs.readFileSync('cam.jpg');
        const b64 = Buffer.from(img).toString('base64');
        const payload = `data:image/jpg;base64,${b64}`;
        await axios.post('http:/emerge.theblockchaininstitute.io/upload', { file: payload });

    }
);