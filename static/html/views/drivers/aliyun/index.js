let aliyun = {
    layer: null,
    init() {
        layui.use(['layer', 'form'], function () {
            layer = layui.layer;
        });
        aliyun.getQRCode()
    },
    getQRCode() {
        $.ajax({
            url: "https://nexu-mount-api.laoliuhe.qzz.io/?driverType=aliyun&action=getQRCode",
            type: "get",
            contentType: "application/json; charset=utf-8",
            success(resp) {
                if (resp.code !== 200) {
                    layer.alert(resp.msg, {icon: 2});
                    return
                }

                let data = resp.data

                $("#qrCode").attr("src", data.qr_link)

                aliyun.loginStatus(data.sid)
            },
            error() {
                layer.open({
                    title: "错误：",
                    content: "网络错误，二维码获取失败！",
                    icon: 2
                });
            }
        })
    },
    async loginStatus(sid) {
        function poll() {
            $.ajax({
                url: "https://nexu-mount-api.laoliuhe.qzz.io/?driverType=aliyun&action=checkStatus&sid=" + sid,
                type: "get",
                async: false,
                contentType: "application/json; charset=utf-8",
                success(resp) {
                    debugger
                    if (resp.code === 200 && resp.data.refresh_token != null && resp.data.refresh_token !== '') {
                        $('[name="access_token"]').val(resp.data.access_token)
                        $('[name="refresh_token"]').val(resp.data.refresh_token)
                        return
                    }
                    setTimeout(poll, 500);
                },
                error() {
                    layer.open({
                        title: "错误：",
                        content: "网络出现问题，无法完成操作！",
                        icon: 2
                    });
                }
            })
        }

        poll()
    }
}
$(function () {
    aliyun.init();
})