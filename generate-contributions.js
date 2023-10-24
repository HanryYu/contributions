const axios = require('axios');
const fs = require('fs');

async function generateContributions() {
  try {
    const response = await axios.get('https://green-wall-o9zqtpat3-hanry.vercel.app/api/contribution/hanryyu');
    const contributionsData = response.data;

    fs.writeFileSync('date.json', JSON.stringify(contributionsData));

    console.log('Contributions data updated successfully.  ');
  } catch (error) {
    console.error('Error updating contributions data: ', error);
    process.exit(1);
  }
}

generateContributions();
