var app =new Vue({
    el:'#webList',
    data:{
        randomweb:0,
        weblist:[[],[],[]],
        update:{name:"未能获取",til:"服务器已断开"},
        searchWord:"",
    },
    methods:{
        randomWebFun:function(){
            this.randomweb=Math.round(Math.random()*this.webCount);
        },
        search:function(){
            if(this.searchWord!=""){
                window.find(this.searchWord)
            }
            else alert("请输入搜索内容");
        },
        show:function(s){
            if(s==""){
                alert("暂未信息");
            }
            else alert(s);
        },
    },
    computed:{
        webCount:function(){
            return this.weblist.length;//总网址数量，自动更新，不需要维护
        },
        weblist2:function(){
            if(this.weblist.length%3!=0)alert("网站列表数据数量错误，需要修正");
            var weblist1=[]
            for(var i=0;i<this.weblist.length;i+=3){
                weblist1.push(this.weblist.slice(i,i+3));
            }
            return weblist1;
        }
    },
    beforeCreate:function(){
        axios.get("https://my.wulvxinchen.cn/tools/weblist.json").then((response) => {
            this.weblist=response.data.weblist.slice().reverse();//从远程获取网站列表。数据来自@吾律心尘服务器
            this.update=response.data.update;//从远程获取更新信息。数据来自@吾律心尘服务器
        })
    },
});