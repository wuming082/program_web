const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
});

// module.exports = {
//   publicPath: './',
// }

let publicPath = "";
const port = process.env.VUE_APP_PORT || 8080;
if(port == "8080"){
  let publicPath = './';
}else{
  let publicPath = `http://baoding.dreamsky0822.asia:${port}/`;
}


module.exports = {
  devServer: {
    port: port, // 使用变量配置端口
    allowedHosts: 'all',
  },
  publicPath: publicPath, // 使用组合后的公共路径
};
