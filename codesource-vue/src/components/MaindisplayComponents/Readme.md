# 对于网页任务单元的设计

一开始我是想用类的想法去设计，直接引用了js的类但是我发现，类不好搞，我需要一种类似于组件的概念

所以引入了vue的组件，通过`props:{}` 和 `$emit()`的概念可以做到从内部引用到外部数值的概念，所以开始使用组件

```
ProgressDrag.js //就是任务单元类的设计初版
/codesource-alpha/program_list.html //当中有着这个任务单元类的原型
```

所以另辟蹊径开始新的技术探索

### 目前的思路

利用vue当中 ** v-for** 属性 每次增加一个组件就用 components来进行一次push()操作，就可以产生一个组件

```html
<ChildComponent 
  v-for="(component, index) in components" 
  :key="index" 
  :index="index" 
/>
```

其中使用动态的传输数据的操作来遍历所有的子组件

在载入的时候使用 components.push({data:data})

然后在创建的时候

```html
html
<ChildComponent 
  v-for="(component, index) in components" 
  :key="index" 
  :data='data'
  :index="index" 
/>
```

就可以在遍历初始化的时候给每一个子组件传输数据 

**这一点很重要** 因为之后接入数据库后，对于每个人打开网页时都需要初始化，这时候相较于**js的类**就可以逐个赋值初始化
