//创建任务条的类
class DraggableContainer{
    constructor(containerID){
        this.continer = document.getElementById(containerID);

        this.element_val = countProgram++;
        this.delet = false;

        var width = 9 ,height = 8;
        this.element1 = document.createElement("div");
        this.element1.className = "draggable-container"; 
        this.element1.id = `Program${this.element_val}`; // 赋予id属性
        this.element1.style.zIndex = "2";
        this.element1.style.transition = "300ms";
        this.element1.style.position = "absolute";
        this.element1.style.backgroundColor = "rgb(147, 225, 38)";
        this.element1.style.width = width + "%";
        this.element1.style.height = height + "%";
        this.element1.style.margin = "8px";
        this.element1.style.right = "20px";
        this.element1.style.top = "50px"
        this.element1.style.borderRadius = "10px";
        this.element1.dataset.element_val =  this.element_val;

        //元素位置 // 用于箭头指引

        //添加到全局映射表当中
        instanceMap[this.element1.id] = this;

        //用于判断是否拖动过的函数
        this.light_option = false;
        this.beMove = false;

        this.continer.appendChild(this.element1);
        //this.addsection_light(this.element1);
        this.addDraggable(this.element1);

        //将生成的元素压栈，这个program_line_map就是保存着一个任务条对应着哪几条箭头线的 映射表
        let line_stack = [];
        program_line_map.set(this.element1.id,line_stack);

    }

    //增加拖动函数
    addDraggable(element){
        element.addEventListener("mousedown",(event) =>{
            if(event.button == 0){
                // 确保按下时没有动画
                element.style.transition = "0ms"//在任务条拖动时，如果拥有延时属性，所以不要乱动保持在一开始拖动时，保持着0ms的延时

                //获取位移信息
                let shiftX = event.clientX - element.getBoundingClientRect().left;
                let shiftY = event.clientY - element.getBoundingClientRect().top;

                //设立回调函数
                const moveAt = (pageX,pageY) =>{

                    let newLeft = pageX - shiftX;
                    let newTop = pageY - shiftY;
                    
                    const continer_tmp = borad.getBoundingClientRect();

                    const element_tmp = element.getBoundingClientRect();
                    const element_W = element_tmp.width;
                    const element_H = element_tmp.height;
                    
                    //设立边界
                    if(newLeft < 0) newLeft = 0;
                    if(newTop < 0) newTop = 0;
                    if(newLeft + element_W > continer_tmp.width) newLeft = continer_tmp.width - element_W;
                    if(newTop + element_H > continer_tmp.height) newTop = continer_tmp.height - element_H; 
        

                    element.style.left = newLeft - 10 + 'px';
                    element.style.top = newTop - 10 + 'px';
                    
                }
                const onMouseMove = (e) =>{
                    this.beMove = true;
                    moveAt(e.pageX,e.pageY);
                }

                //鼠标移动回调
                document.addEventListener("mousemove",onMouseMove);

                //鼠标松开回调
                document.addEventListener("mouseup",(e) =>{
                    console.log("回调");
                    //开启延迟属性

                    //BUG当启用自带延迟属性时，箭头线更新不及时，甚至不更新待修复
                    //element.style.transition = '300ms';

                    //用于附着的成员变量
                    var doubleEle = element.getBoundingClientRect().left - borad.getBoundingClientRect().left;
                    var board_width = borad.offsetWidth / 10;

                    //开始判断附着在哪一部分
                    if(doubleEle < board_width / 2){
                        element.style.left = 0 + '%';
                    }else{
                        //0 10 20 30 40 50 60 70 80 90
                        var tmp = Math.floor(doubleEle / board_width);
                        var long_loc =  (Math.floor(doubleEle / board_width)) * board_width
                        if(doubleEle - long_loc > board_width / 2){
                            element.style.left = (tmp + 1) * 10  + '%';
                            
                        }else{  
                            element.style.left = tmp * 10  + '%';   
                        }   
                        
                    }   
                    //取消回调  
                    document.removeEventListener('mousemove',onMouseMove);   
                },{once: true});
            }
        });
        element.ondragstart = () => false;
    }
}

export default DraggableContainer;