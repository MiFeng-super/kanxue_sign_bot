const rp = require('request-promise')

const cookie  = process.env.KANXUE_COOKIE;
const Authorization = process.env.AUTHORIZATION
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
        uri: `https://bbs.kanxue.com/app-signin.htm`,
        json: true,
        method: 'POST',
        headers: {
            'User-Agent': 'HD1910(Android/7.1.2) (pediy.UNICFBC0DD/1.0.5) Weex/0.26.0 720x1280',
            'Cookie': cookie,
            'Connection': 'keep-alive',
            'Accept': '*/*',
            'Authorization': Authorization
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
