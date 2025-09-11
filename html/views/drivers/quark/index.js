let quark = {
    layer: null,
    init() {
        layui.use(['layer', 'form'], function () {
            layer = layui.layer;
        });

        $('[action="getCode"]').click(quark.getCode);
    },
    getCode() {
        let url = location.origin + "/NexuMount-docs/html/views/drivers/quark/getLogin.html"
        $.ajax({
            url: "https://nexu-mount-api.laoliuhe.qzz.io/?driverType=quark&action=getLogin&redirectUrl=" + encodeURIComponent(url),
            contentType: "application/json; charset=utf-8",
            async: false,
            success(resp) {
                if (resp.code == 200) {
                    let data = resp.data;
                    if (data.code == 0) {
                        let url = data.data.authUrlWithNonce
                        const newWindow = window.open(
                            url,
                            "获取token",
                            "width=600,height=650"
                        );

                        const timer = setInterval(() => {
                            try {
                                // 读取子窗口的 URL
                                const currentUrl = newWindow.location.href;

                                // 假设我们监听 URL 包含 token
                                if (currentUrl.includes("nonce=")) {
                                    const nonce = new URL(currentUrl).searchParams.get("nonce");

                                    quark.exchangeToken(nonce)

                                    clearInterval(timer);  // 停止轮询
                                    newWindow.close();     // 可关闭子窗口
                                }
                            } catch (e) {
                                console.log("还没到同源或窗口已关闭");
                            }
                        }, 500);
                    } else {
                        layer.error(resp.msg);
                    }
                } else {
                    layer.error(resp.msg);
                }
            },
            error(resp) {

            }
        })
    },
    exchangeToken(nonce) {
        $.ajax({
            url: "https://nexu-mount-api.laoliuhe.qzz.io/?driverType=quark&action=exchangeToken&nonce=" + nonce,
            type: "get",
            contentType: "application/json; charset=utf-8",
            success(resp) {
                if (resp.code == 200) {
                    $('[name="accessToken"]').val(resp.data.data.accessToken);
                    $('[name="refreshToken"]').val(resp.data.data.refreshToken);
                    $('[name="appId"]').val(resp.data.data.appId);
                    $('[name="signKey"]').val(resp.data.data.signKey);
                }
            }
        })
    }
}
$(function () {
    quark.init();
})