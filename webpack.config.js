var htmlWebpackPlugin=require('html-webpack-plugin');
var webpack=require('webpack');
var path=require('path');
module.exports={
  entry:{
    main:'./src/app.js',
    vendor:['react', 'react-dom']
  },
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'js/[name].bundle.js',
    publicPath: '/'
  },
  module:{
    loaders:[
      {
        test:/\.js$/,
        loader:'babel-loader',
        exclude:path.resolve(__dirname,'node_modules'),
        include:path.resolve(__dirname,'src'),
        query:{
          presets:['latest','stage-0', 'react']
        }
      },{
        test:/\.tpl$/,
        loader:'ejs-loader'
      },
      {
        test:/\.css$/,
        loader:'style-loader!css-loader?importLoaders=1!postcss-loader'
      },{
        test:/\.less$/,
        loader:'style-loader!css-loader!postcss-loader!less-loader'
      },{
        test:/\.scss$/,
        loader:'style-loader!css-loader!postcss-loader!sass-loader'
      },{
        test:/\.html$/,
        loader:'html-loader'
      },{
        test:/\.(png|jpg|gif|svg)$/i,
        loader:'file-loader',
        query:{
          name:'assets/[name]-[hash].[ext]'
        }
      },{
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader:'file-loader',
        query:{
          name:'assets/[name]-[hash].[ext]'
        }
      },{
        test: /\.(csv|tsv)$/,
        loader:'csv-loader',
        query:{
          name:'assets/[name]-[hash].[ext]'
        }
      },{
        test: /\.xml$/,
        loader:'xml-loader',
        query:{
          name:'assets/[name]-[hash].[ext]'
        }
      }
    ]
  },
  devServer:{
     hot:true,
     contentBase:path.resolve(__dirname,'dist'),
     publicPath:'/',//载入热更新模块,并且需要在插件中使用HMR
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({
      name:'vendor', filename:'vendor.bundle.js'
    }),//公用的一些库js
    new htmlWebpackPlugin({
      filename:'index.html',
      template:'index.html',
      inject:'body',
      title:'webpack demo'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),//当模块热替换（HMR）时在浏览器控制台输出对用户更友好的模块名字信息
  ],
  devtool:"inline-source-map"
}
