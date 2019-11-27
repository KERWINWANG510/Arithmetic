cc.Class({
    extends: cc.Component,

    properties: {
        exBtn:[cc.Button],
        maxNum:{
            default:20,
            type:cc.Integer,
            tooltip:"表达式中单个数据的最大值"
        },
        minNum:{
            default:0,
            type:cc.Integer,
            tooltip:"表达式中单个数据的最小值"
        },
        selectNums:{
            default:null,
            type:cc.Node,
            tooltip:"答案候选区"
        },
        frame:{
            default:null,
            type:cc.Node
        },
        correct:{
            default:null,
            type:cc.Node
        },
        failed:{
            default:null,
            type:cc.Node
        }
    },
    
    onLoad () {
        //获取label
        this.label_1 = this.exBtn[0].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
        this.label_2 = this.exBtn[1].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
        this.label_3 = this.exBtn[2].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
        this.label_5 = this.exBtn[4].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
        this.initEx();
    },
    //生成初始化表达式
    initEx:function(){
        //操作符
        const symbols = new Array("+", "-");
        let i = Math.round(Math.random());
        
        //生成指定范围内的整数
        this.label_1.string = this.getRandom(this.minNum, this.maxNum);
        this.label_2.string = symbols[i];
        this.symbol = i;
        //如果是减法，被减数不能小于减数
        if(1 == i){
            this.label_3.string = this.getRandom(this.minNum, this.label_1.string);
        }else{
            this.label_3.string = this.getRandom(this.minNum, this.maxNum);
        }
        
    },
    /**
     * 获取指定范围的随机数
     * @param {Integer} min 
     * @param {Integer} max 
     */
    getRandom:function (min, max) {
        return Math.round(Math.random() * (Number(max) - Number(min))) + Number(min);
    },
    //点击显示或关闭答案候选框
    onClickShowOrHideSelectNums:function(event, data){
        //显示
        if("1" == data){
            this.selectNums.active = true;
        }else{
            //关闭
            this.selectNums.active = false;
            //关闭时清除答案区的答案
            this.label_5.string = "";
        }
        
    },
    //点击各个数字并显示在答案区
    onClickShowAnswer:function(event, data){
        let str = this.label_5.string;
        
        if(null != str && undefined != str && '' != str && '0' != str){
            //默认只显示5位数，超过则不显示
            if(str.length < 5){
                this.label_5.string = str + data;
            }
        }else{
            this.label_5.string = data;
        }
        
    },
    //点击确定后开始计算答案是否正确
    onClickCompute:function(){
        let str1 = this.label_1.string;
        let str2 = this.label_3.string;
        let str5 = this.label_5.string;
        //运算符    0:+, 1:-
        if(0 == this.symbol){
            if(Number(str1) + Number(str2) == Number(str5)){
                this.frame.active = true;
                //答对了
                this.correct.active = true;
                this.failed.active = false;
            }else{
                this.frame.active = true;
                //答错了
                this.failed.active = true;
                this.correct.active = false;
            }
        }else{
            if(Number(str1) - Number(str2) == Number(str5)){
                this.frame.active = true;
                //答对了
                this.correct.active = true;
                this.failed.active = false;
            }else{
                this.frame.active = true;
                //答错了
                this.failed.active = true;
                this.correct.active = false;
            }
        }
    },
    //关闭弹框
    onClickCloseFrame:function(event, data){
        this.frame.active = false;
        //正确
        if("1" == data){
            cc.director.loadScene("game");
        }else{
            this.label_5.string = '';
        }
        
    },
    start () {

    },

    // update (dt) {},
});
