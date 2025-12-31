# simpleChatbox-ESA-serverless

This repository is a refactor of my first AI chatbox, which I originally completed on Dec 17, 2025, after just 1.5 months of learning web development. I am currently upgrading the original vanilla HTML/CSS/JS code to include a simple serverless backend. The goal is to deploy it on Alibaba Cloud ESA to securely manage API keys.

## Technical Architecture

The project adopts a serverless approach using **Alibaba Cloud ESA** (Edge Serverless Architecture) to enhance security and performance.

### Key Features

1.  **Secure API Key Management**
    -   Instead of exposing the API key in the frontend code, it is stored in **Edge KV Storage**.
    -   The key is retrieved dynamically by the serverless function only when needed.

2.  **Edge Function Proxy**
    -   All API requests are handled by an **Edge Function**.
    -   This function retrieves the secure key, sends the POST request to the AI model provider, and relays the response back to the client.

3.  **Security & Abuse Prevention**
    -   **Source URL Verification**: The Edge Function validates the request's headers.
    -   Requests are only processed if they originate from the trusted domain, preventing unauthorized use of the API.

## 声明
本项目由阿里云ESA提供加速、计算和保护
![image](src/image.png)
