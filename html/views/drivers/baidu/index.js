let baiduToken = {
    vm: this,
    layer: null,
    init() {
        layui.use(['layer', 'form'], function () {
            layer = layui.layer;
        });

        $('[action="getCode"]').click(baiduToken.openWindow)
        $('[action="getAccessToken"]').click(baiduToken.getAccessToken)
    },
    openWindow() {
        window.open(
            "https://openapi.baidu.com/oauth/2.0/authorize?client_id=NqOMXF6XGhGRIGemsQ9nG0Na&scope=basic%2Cnetdisk&response_type=code&redirect_uri=oob",
            "获取token",  // 窗口名称
            "width=800,height=600,top=100,left=100"
        );
    },
    encodeBase64(str) {
        return btoa(unescape(encodeURIComponent(str)));
    },
    getAccessToken() {
        let code = $('[name="code"]').val()
        let url = "https://nexu-mount-api.laoliuhe.qzz.io/?driverType=baidu&action=getToken&code=" + code

        var index = layer.load(3);

        $.ajax({
            url: url,
            type: "get",
            contentType: "application/json; charset=utf-8",
            success: function (resp) {
                layer.close(index)

                if (resp.code === 200) {
                    let data = resp.data

                    if (data.error) {
                        layer.alert(data.error_description, {icon: 2});
                    } else {
                        let access_token = baiduToken.encodeBase64(data.access_token + "|" + new Date().getTime() + (data.expires_in * 1000))
                        let refresh_token = baiduToken.encodeBase64(data.refresh_token)
                        $('[name="access_token"]').val(access_token)
                        $('[name="refresh_token"]').val(refresh_token)
                    }

                } else {
                    layer.alert(resp.msg, {icon: 2});
                }
            },
            error: function () {
                layer.open({
                    title: "错误：",
                    content: "网络出现问题，无法完成操作！",
                    icon: 2
                });
            }
        });
    }
}
$(function () {
    baiduToken.init();
    baiduToken.openWindow()
})