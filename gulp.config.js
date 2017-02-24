module.exports = ()=>{
  let config = {
    /*************
    * Output paths
    **************/
    build:'./build',

    temp:'./.temp/',

    /***********
    * File paths
    ***********/
    alljs:[
      './src/**/*.js',
    ],
    allcss:[
      './src/**/*.css',
      './*.css',
    ],
    allhtml:[
      './src/**/*.html',
      './*.html'
    ],
    allthirdparty:[
      './bower_components/**/*.*'
    ],
    allimages:[
      './images/*.*'
    ]

  };
  return config;
};
