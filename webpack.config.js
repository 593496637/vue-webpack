const path =require("path");
const HTMLPlugin =require('html-webpack-plugin');
const webpack =require('webpack');

const isDev=process.env.NODE_ENV==='development';

const config ={
    target:'web',
    entry:path.join(__dirname,'src/index.js'),
    output:{
        filename:'bundle.js',
        path:path.join(__dirname,'dist')
    },
    module:{
        rules:[
            { 
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test:/\.styl/,
                use:[
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {
                test:/\.(.gif|jpg|jpeg|svg|png)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev ?'"deveploment"':'"production"'
            }
        }),
        new HTMLPlugin()
    ]
}

if(isDev){
    config.devServer={
        port:8000,
        host:'0.0.0.0',
        //当发生错误时，错误信息显示在屏幕上
        overlay:{
            errors:true,
        },
        // 入口地址映射
        // historyApiFallback:{

        // },
        // 自动打开浏览器
        open:false
    }
}

module.exports=config;