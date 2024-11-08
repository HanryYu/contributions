const axios = require('axios');
const fs = require('fs');

async function generateContributions() {
  try {
    // 获取贡献数据
    const response = await axios.get('https://green-wall.leoku.dev/api/contribution/HanryYu');
    const contributionsData = response.data;

    // 转换为 JSON 字符串
    const dataContent = JSON.stringify(contributionsData, null, 2);

    // 更新 Gist
    const gistId = process.env.GIST_ID;
    const token = process.env.GH_TOKEN;

    if (!gistId || !token) {
      console.error('GIST_ID 或 GH_TOKEN 未设置');
      process.exit(1);
    }

    const gistUpdateResponse = await axios.patch(
      `https://api.github.com/gists/${gistId}`,
      {
        files: {
          'date.json': {
            content: dataContent,
          },
        },
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    if (gistUpdateResponse.status === 200) {
      console.log('Gist 更新成功');
    } else {
      console.error('Gist 更新失败', gistUpdateResponse.status);
      process.exit(1);
    }

  } catch (error) {
    console.error('更新贡献数据失败:', error);
    process.exit(1);
  }
}

generateContributions();
