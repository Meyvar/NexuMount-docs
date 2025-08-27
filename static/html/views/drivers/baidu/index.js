let baiduToken = {
    layer: null,
    init(){
        layui.use(['layer', 'form'], function(){
            layer = layui.layer;
        });

        $('[action="getCode"]').click(baiduToken.openWindow)
        $('[action="getAccessToken"]').click(baiduToken.getAccessToken)
    },
    openWindow(){
        window.open(
            "https://openapi.baidu.com/oauth/2.0/authorize?client_id=NqOMXF6XGhGRIGemsQ9nG0Na&scope=basic%2Cnetdisk&response_type=code&redirect_uri=oob",
            "获取token",  // 窗口名称
            "width=800,height=600,top=100,left=100"
        );
    },
    getAccessToken(){

    }
}
$(function() {
    baiduToken.init();
    baiduToken.openWindow()
})