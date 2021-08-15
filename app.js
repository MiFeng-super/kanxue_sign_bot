const rp = require('request-promise')

const cookie  = process.env.KANXUE_COOKIE;
const serverJ = process.env.PUSH_KEY;

async function sendMsg(text, desp)
{
    if (!serverJ)
    {
        return;
    }

    const options = {
        uri:  `https://sc.ftqq.com/${serverJ}.send`,
        form: {text, desp},
        json: true,
        method: 'POST',
    }
    rp.post(options).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    })
}


async function start()
{
    if (!cookie)
    {
        console.log('请填写 Cookie 后继续');
        return;
    }
    const options = {
        uri: `https://bbs.pediy.com/user-signin.htm`,
        json: true,
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36',
            'Cookie': cookie,
            'Connection': 'keep-alive',
            'Accept': '*/*'
        }
    }
    rp.post(options).then(res => {
        console.log(res);

        if (res.code != -1)
        {
            sendMsg(`看雪签到：${res.message}雪币`, JSON.stringify(res))
        }
        else
        {
            sendMsg(`看雪签到：${res.message}`, JSON.stringify(res))
        }

    }).catch(err => {
        console.log(err);
    })
}

start()
