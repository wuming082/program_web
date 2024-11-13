//创建任务条的类
class DraggableContainer{
    constructor(containerID){

        //容器属性编写
        this.continer = document.getElementById(containerID);

        this.element1 = document.createElement("div");
        this.element1.className = "draggable-container"; 
        this.element1.style.zIndex = "2";
        this.element1.style.position = "absolute";
        this.element1.style.backgroundColor = "#E6FF94";
        this.element1.style.width = 100 + "px";
        this.element1.style.height = 40 + "px";
        this.element1.style.margin = "30px";
        this.element1.style.borderRadius = "10px";
        this.element1.style.outline = '2px solid #40A578';
        //用于判断是否拖动过的函数
        this.light_option = false;
        this.beMove = false;

        this.continer.appendChild(this.element1);
        //this.addsection_light(this.element1);
        this.addDraggable(this.element1);

    }

    //增加拖动函数
    addDraggable(element){
        element.addEventListener("mousedown",(event) =>{
            event.stopPropagation();
            if(event.button == 0){
                
                //获取鼠标在点击时的位置
                let shiftX = event.clientX;
                let shiftY = event.clientY ;

                //获取元素的位置信息
                const elementleft = element.getBoundingClientRect().left;
                const elementtop = element.getBoundingClientRect().top;

                //获取容器的位置信息
                const container = this.continer.getBoundingClientRect().left;

                //设立准确的元素位置信息
                const loacelement = elementleft - container;

                //设立移动函数
                const moveAt = (pageX,pageY) =>{

                    //计算被移动时，鼠标的新位置与老位置的距离然后做出计算
                    let newLeft = pageX - shiftX;
                    let newTop = pageY - shiftY;

                    element.style.left = newLeft + loacelement - 30 + 'px';
                    element.style.top = newTop + elementtop  - 150 +  'px';
                    
                    //调试
                    //console.log('pageX:',pageX,' shiftX:',shiftX);

                    //调试
                    //console.log('movedone');
                    
                }

                //当鼠标点击之后移动的回调
                const onMouseMove = (e) =>{
                    moveAt(e.clientX,e.clientY);
                }

                //鼠标移动回调onMouseMove
                document.addEventListener("mousemove",onMouseMove);

                //鼠标松开回调
                document.addEventListener("mouseup",() =>{
                    //取消回调  
                    document.removeEventListener('mousemove',onMouseMove);
                      
                },{once: true});
            }
        });
        //告知浏览器此元素不能被默认拖动
        element.ondragstart = () => false;
    }
}

export default DraggableContainer;