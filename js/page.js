var app =new Vue({
    el:'#webList',
    data:{
        weblist:[[],[],[]],
        random:[60,70,80],
        isShowRandom:false,
        urlInfo:{
            id:-1,
        },
        webSettings:{}
    },
    methods:{
        //随机展示
        randomShow:function(){
            if(this.isShowRandom==false){
                this.isShowRandom = true
            }
            this.random[0]=Math.round(Math.random()*this.weblist.length-1);
            this.random[1]=Math.round(Math.random()*this.weblist.length-1);
            this.random[2]=Math.round(Math.random()*this.weblist.length-1);
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
        //获取URL参数id
        getUrlID:function(){
            // let id = window.location.href.split('=')[1]
            let id = parseInt(this.getParams('id')) || -1
            if(0<=id&id<=this.weblist.length){  
                return id
            }
            else{
                return -1
            }
        },
        //自动跳转
        jump:function(){
            t = [this.weblist[this.urlInfo.id-1].url,this.weblist[this.urlInfo.id-1].name]
            setTimeout(function(){
                if(confirm("即将跳转到网站《"+t[1]+"》，是否跳转？"))window.location.href = t[0];
            },this.webSettings.autoJumpTime || 5000)
        }
    },
    created:function(){
        //获取网站配置
        var ws = localStorage.getItem("webSettings");
        if(ws){
            this.webSettings = JSON.parse(ws);
        }
    },
    beforeCreate:function(){
        axios.get("https://my.wulvxinchen.cn/tools/weblist.json").then((response) => {
            //从远程获取网站列表。数据来自@吾律心尘服务器
            this.weblist=response.data.weblist.slice();
            //赋值id
            this.urlInfo.id = this.getUrlID()
            //判断是否自动跳转
            if(parseInt(this.getParams('auto')) == 1)this.jump()
        })
    },
});