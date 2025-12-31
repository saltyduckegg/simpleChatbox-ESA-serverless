let messagesList = [{
    "role": "system",
    "content": "You are a helpful assistant."
},
{
    "role": "user",
    "content": "你好。"
},
{
    "role": "assistant",
    "content": "你好啊,我是通义千问。"
}]
const messagesContainerEl = document.getElementById("historyContainer")
const textAreaEl = document.getElementById("textAreaEl")
const askBtnEl = document.getElementById("askBtnEl")
let memoryLenth = 25





askBtnEl.addEventListener("click", async function () {
    if (textAreaEl.value) {
        messagesList.push({ role: "user", content: textAreaEl.value })
        consturctCorrentMessage()
        console.log(messagesList)
        addMessages({ role: "user", content: textAreaEl.value })
        textAreaEl.value = ""
        console.log(consturctCorrentMessage())
        const newMessage = await get(consturctCorrentMessage())
        messagesList.push(newMessage)
        addMessages(newMessage)

    }
})



function consturctCorrentMessage() {
    let correntMessagesList = []
    if (messagesList.length >= memoryLenth) {
        for (let i = messagesList.length - memoryLenth + 1; i < messagesList.length; i++) {
            correntMessagesList.push(messagesList[i])
        }
    } else {
        for (let i = 1; i < messagesList.length; i++) {
            correntMessagesList.push(messagesList[i])
        }
    }
    correntMessagesList.unshift(messagesList[0])
    return correntMessagesList

}

function formatMessages2HTML(singleMessage) {
    const newSentance = document.createElement('p')
    const newContent = document.createTextNode(singleMessage.content)
    newSentance.appendChild(newContent)
    newSentance.setAttribute("class", singleMessage.role)
    console.log(newSentance)
    return newSentance
}

function showMessages() {
    for (let i = 0; i < messagesList.length; i++) {
        console.log(messagesList[i])
        // messagesContainerEl.append(formatMessages2HTML(messagesList[i]))  
        addMessages(messagesList[i])
    }
}
showMessages()

function addMessages(messages) {
    messagesContainerEl.append(formatMessages2HTML(messages))
    messagesContainerEl.scrollTo(0, messagesContainerEl.scrollHeight)
}



async function get(messages) {
    try {
        const response = await fetch('https://abcdefghijk.lzzlzz.com',
            {
                method: 'POST',
                body: JSON.stringify({
                    model: "qwen-flash", //unuse
                    messages: messages

                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ${process.env.OPENAI_API_KEY}'//unuse
                }
            })
        if (!response.ok) {
            throw new Error('There was a problem with the API')
        }
        const data = await response.json()
        console.log(data)
        console.log(data.message)
        return data.message
    } catch (err) {
        console.log(err)
    }
}





