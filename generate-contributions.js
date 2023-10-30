const axios = require('axios');
const fs = require('fs');

async function generateContributions() {
  try {
    const response = await axios.get('https://green-wall-iota.vercel.app/api/contribution/HanryYu');
    const contributionsData = response.data;

    fs.writeFileSync('date.json', JSON.stringify(contributionsData));

    console.log('Contributions data updated successfully.  ');
  } catch (error) {
    console.error('Error updating contributions data: ', error);
    process.exit(1);
  }
}

generateContributions();
