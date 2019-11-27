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
        }
    },
    
    onLoad () {
        //获取label
        this.label_1 = this.exBtn[0].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
        this.label_2 = this.exBtn[1].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
        this.label_3 = this.exBtn[2].node.getComponent(cc.Button).node.children[0].children[0].getComponent(cc.Label);
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
    //显示答案候选框
    
    start () {

    },

    // update (dt) {},
});
