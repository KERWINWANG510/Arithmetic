cc.Class({
    extends: cc.Component,

    properties: {
        //开始按钮
        startBtn:{
            default:null,
            type:cc.Button
        },
        //启动页进度条
        startProgressBar:{
            default: null,
            type: cc.ProgressBar
        }
    },
    
    onLoad () {
        //判断是否点击了开始按钮
        this.isStart = false;
        
    },
    //开始游戏
    startGame:function(){
        this.isStart = true;
        //隐藏开始按钮
        this.startBtn.node.active = false;
        
    },
    //加载进度条
    loadProgressBar:function(dt){
        //获取进度条
        let progressBar = this.startProgressBar.node.getComponent(cc.ProgressBar);
        //显示进度条
        progressBar.node.active = true;
        progressBar.progress += dt;
        return progressBar.progress;
    },


    start () {

    },

    update (dt) {
        if(this.isStart){
            let progress = this.loadProgressBar(dt);
            if(1 <= progress){
                this.isStart = false;
            }
            
        }
    },
});
