const axios = require('axios');
const path = require('path');
const fs = require('fs');

const profitAndLoss = JSON.parse(fs.readFileSync(path.join(__dirname, '../uploads/profitAndLoss.json')));
const balanceSheet = JSON.parse(fs.readFileSync(path.join(__dirname, '../uploads/balanceSheet.json')));

let threads = {};

exports.askQuestion = async (req, res) => {
  const { question, userId } = req.body;

  if (!threads[userId]) {
    threads[userId] = [];
  }

  let data = '';
  if (question.includes('revenue during March')) {
    data = JSON.stringify(profitAndLoss, null, 2); 
  } else if (question.includes('expenses for the next month')) {
    data = JSON.stringify(balanceSheet, null, 2); 
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo", 
      messages: [
        { role: 'system', content: 'You are an AI Assistant specialized in financial advice. Be professional and detailed in your answers.' },
        ...threads[userId].map(msg => ({ role: 'user', content: msg })),
        { role: 'user', content: question },
        { role: 'system', content: `Data: ${data}` }
      ],
      max_tokens: 150,
      temperature: 0.5,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    threads[userId].push(`User: ${question}\nAssistant: ${response.data.choices[0].message.content}`);
    if (threads[userId].length > 25) {
      threads[userId].shift();
    }

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
