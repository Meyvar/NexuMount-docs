---
id: 夸克网盘
slug: ./quark
displayed_sidebar: guideSidebar
sidebar_position: 9
---


## 获取accessToken

---

import Modal  from '@site/src/components/Modal';

### 夸克网盘授权token

1、点击按钮授权

<Modal text="点击获取" title="夸克网盘授权" iframeUrl="/NexuMount-docs/html/views/drivers/quark/getToken.html" width="480px" height="600px" />

<p style={{color:'red'}}>服务托管在Cloudflare，国内用户可能加载较慢！</p>

2、登录夸克网盘完成授权

![ae9e4af1-b299-4bb2-914c-bcd4310540b1.png](img/ae9e4af1-b299-4bb2-914c-bcd4310540b1.png)
![2e1e5c34-ccac-4966-957c-61c726dba148.png](img/2e1e5c34-ccac-4966-957c-61c726dba148.png)

3、授权成功后自动出现 `access_token` 和 `refresh_token`

![2d3d2386-5148-48a4-97e1-fc4f520c8b0c.png](img/2d3d2386-5148-48a4-97e1-fc4f520c8b0c.png)

4、复制对于内容到后台配置

![16fbbfdc-b1d7-4912-a383-b34e96b461a8.png](img/16fbbfdc-b1d7-4912-a383-b34e96b461a8.png)