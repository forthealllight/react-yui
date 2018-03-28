var htmlWebpackPlugin=require('html-webpack-plugin');
var webpack=require('webpack');
var path=require('path');
module.exports={
  entry:{
    main:'./src/app.js',
  },
  output:{
    path:path.resolve(__dirname,'lib'),
    filename:'app.min.js',
    library:'react-yui',
    libraryTarget: 'umd',
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
  externals: {
    'react'       : 'umd react',
    'react-dom'   : 'umd react-dom'
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  devtool:"cheap-module-source-map"
}
