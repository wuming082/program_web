<template>
    <div ref="element" id="element" @mousedown="startDrag"></div>
</template>

<script>
export default {
    data() {
        return {
            shiftX: 0,
            shiftY: 0,
            isDragging: false,
            element: null
        };
    },
    mounted() {
        this.element = this.$refs.element;
        document.addEventListener('mouseup', this.stopDrag);
        document.addEventListener('mousemove', this.onDrag);

        this.element.ondragstart = () => false;
    },
    
    methods: {
        startDrag(event) {
            event.stopPropagation();
            if (this.element) {
                console.log('startDrag');
                this.isDragging = true;
                this.shiftX = event.clientX - this.element.getBoundingClientRect().left + this.containerBound;
                this.shiftY = event.clientY - this.element.getBoundingClientRect().top;
                console.log('shiftX, shiftY:', this.shiftX, this.shiftY);
            } else {
                console.error('Element not found');
            }
        },
        onDrag(event) {
            if (this.isDragging && this.element) {
                const movePointLeft = event.clientX - this.shiftX;
                const movePointTop = event.clientY - this.shiftY;

                this.element.style.left = `${movePointLeft - 10}px`;
                this.element.style.top = `${movePointTop - 77}px`;

                console.log('movePointLeft:', movePointLeft, 'movePointTop:', movePointTop);
            }
        },
        stopDrag() {
            if (this.element) {
                this.isDragging = false;
                console.log('stopDrag');
            } else {
                console.error('Element not found');
            }
        },
        loadLoaction(movetoX,movetoY){
            console.log('用于后续数据库加载',movetoX,movetoY);
        }   
    },
    props: {
        containerBound: Number,
    },
    watch: {
        containerBound(newVal) {
            console.log("containerBoundVal -> ", newVal);
        }
    }
}
</script>

<style scoped>
#element {
    margin: 10px;
    width: 100px;
    height: 40px;
    background-color: #E6FF94;
    outline: 2px solid #40A578;
    border-radius: 10px;
    position: absolute;
}
</style>
