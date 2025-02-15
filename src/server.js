const express = require('express');
const cors = require('cors');
const { main } = require('./index');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/research', async (req, res) => {
  try {
    const { topic } = req.body;
    if (!topic) {
      return res.status(400).json({ message: '请提供产品主题' });
    }

    const result = await main(topic);
    res.json(result);
  } catch (error) {
    console.error('API错误:', error);
    res.status(500).json({ message: error.message || '服务器内部错误' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});