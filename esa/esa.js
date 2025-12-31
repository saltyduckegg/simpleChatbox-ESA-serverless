// let messagesListJson = {
//     messages: [{
//         "role": "system",
//         "content": "You are a helpful assistant."
//     },
//     {
//         "role": "user",
//         "content": "你好。"
//     },
//     {
//         "role": "assistant",
//         "content": "你好啊,我是通义千问。"
//     }]
// }



async function getKEY() {
    try {
        // 初始化 Edge KV 连接
        const edgeKV = new EdgeKV({ namespace: "kv" });// 命名空间是 kv
        let getType = { type: "text" };
        let value = await edgeKV.get("key", getType);
        // 检查键是否存在
        if (value === undefined) {
            return "EdgeKV get: key not found";
        } else {
            console.log("!!!!!!!!!!!!!!!!!!!!!!")
            return value;
        }
    } catch (e) {
        return "EdgeKV get error" + e;
    }
}
// 导出默认的 fetch 处理函数



export default {
    async fetch(request) {
        const referer = request.headers.get('Referer');
        const origin = request.headers.get('Origin');
        const allowedOrigin = 'https://simplechatbox-esa-serverless.lzzlzz.com';
        const isAllowed =
            (referer && referer.startsWith(allowedOrigin)) ||
            (origin && origin === allowedOrigin);

        if (!isAllowed) {
            return new Response('Forbidden: Invalid Referer or Origin', { status: 403 });
        }
        const body = await request.json();
        let messages = body.messages;
        messages = JSON.parse(messages);
        return await getMessages(messages);
    }
};


async function getMessages(messages) {
    try {
        const response = await fetch('https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions',
            {
                method: 'POST',
                body: JSON.stringify({
                    model: "qwen-flash",
                    messages: messages

                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getKEY()}`
                }
            })
        if (!response.ok) {
            return new Response('There was a problem with the API')
        }
        const data = await response.json()
        console.log(data)
        console.log(data.choices[0].message)
        const msgObj = data.choices[0].message;
        const responseBody = {
            message: msgObj
        };
        return new Response(JSON.stringify(responseBody), {
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        });
    } catch (err) {
        return new Response(err)
    }
}
