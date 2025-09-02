---
id: 阿里云盘
slug: ./aliyun
displayed_sidebar: guideSidebar
sidebar_position: 6
---

## 获取accessToken

---

import Modal  from '@site/src/components/Modal';

### 阿里云盘授权token

1、点击按钮获取授权二维码

<Modal text="点击获取" title="扫码授权获取token" iframeUrl="/NexuMount-docs/html/views/drivers/aliyun/getToken.html" width="480px" height="600px" />

<p style={{color:'red'}}>访问托管在Cloudflare，国内用户可能加载较慢！</p>

2、使用阿里网盘扫码获取token

![bdd9badd-525b-41c9-b1ad-1652f1bb06c7.png](img/bdd9badd-525b-41c9-b1ad-1652f1bb06c7.png)
![screenshot_20250902_183709.png](img/screenshot_20250902_183709.png)

3、授权成功后自动出现 `access_token` 和 `refresh_token`

![6c2dda25-e47f-4524-a941-e9dab89dc331.png](img/6c2dda25-e47f-4524-a941-e9dab89dc331.png)

4、复制对于内容到后台配置

![668368fc-230a-4a8c-9ec9-31212d3ec9f5.png](img/668368fc-230a-4a8c-9ec9-31212d3ec9f5.png)