const resolve=require('path').resolve;

module.exports={
    entry:resolve('client/main.js'),
    output:{
        path:resolve('client/dist'),
        filename:'bundle.js'
    },
    mode: 'production',
    devServer: {
        contentBase: resolve("./client"),//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新
        port:8080,
        
    },
    module: {
        // loaders:[
        //     {
        //         test: /\.js$/, loader: 'babel'
        //     },
        //     {
        //         test: /\.vue$/, loader: 'vue-loader'
        //     }
        // ],
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "env"
                        ]
                    }
                },
                exclude: /node_modules/
            }
        ]
    }, 
    resolve:{
            alias: { 'vue': 'vue/dist/vue.js' }
        }
}