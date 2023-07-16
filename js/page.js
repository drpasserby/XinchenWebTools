var app =new Vue({
    el:'#webList',
    data:{
        random:{},
        isShowRandom:false,
        urlInfo:{
            id:-1,
        },
        webcount:500,
        webSettings:{}
    },
    methods:{
        //随机展示
        randomShow:function(){
            if(this.isShowRandom==false){
                this.isShowRandom = true
            }
            let id = Math.round(Math.random()*this.webcount)
            axios.get("https://my.wulvxinchen.cn/tools/php/search.php?id="+id).then((response) => {
                this.random = response.data.data[0]
            })
        },
        //分享
        share:function(){
            const input = document.createElement('input')
            if(this.webSettings.autoJump == true){
                input.value = window.location.href + "&auto=1"
            }
            else{
                input.value = window.location.href
            }
            document.body.appendChild(input)
            input.select()
            document.execCommand('Copy')
            document.body.removeChild(input)
            alert("已复制网址到剪贴板,快去分享吧!")
        },
        //获取URL参数
        getParams:function(key) {
            var t = new URLSearchParams(window.location.search);
            return t.get(key)
        },
        //自动跳转
        jump:function(){
            t = [this.urlInfo.url,this.urlInfo.name]
            setTimeout(function(){
                if(confirm("即将跳转到网站《"+t[1]+"》，是否跳转？"))window.location.href = t[0];
            },this.webSettings.autoJumpTime || 5000)
        },
    },
    created:function(){
        //获取网站配置
        var ws = localStorage.getItem("webSettings");
        if(ws){
            this.webSettings = JSON.parse(ws);
        }
        axios.get("https://my.wulvxinchen.cn/tools/php/search.php?id="+parseInt(this.getParams('id'))).then((response) => {
            //从远程获取网站列表。数据来自@吾律心尘服务器
            this.urlInfo = response.data.data[0];
            this.webcount = parseInt(response.data.count["count(*)"]);//获取网站总数
            //判断是否自动跳转
            if(parseInt(this.getParams('auto')) == 1)this.jump()
        })
    },
});