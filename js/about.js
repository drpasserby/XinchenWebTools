var app =new Vue({
    el:'#webList',
    data:{
        //URL参数信息
        webSettings:{
            autoJump:false,
            autoJumpTime:5000
        }
    },
    methods:{
        save:function(){
            localStorage.setItem("webSettings",JSON.stringify(this.webSettings));
        },
        back:function(){
            ws = {
                autoJump:false,
                autoJumpTime:5000
            };
            this.webSettings = ws;
            localStorage.setItem("webSettings",JSON.stringify(ws));
        }
    },
    created:function(){
        var ws = localStorage.getItem("webSettings");
        if(ws){
            this.webSettings = JSON.parse(ws);
        }
    }
});