var express = require("express");
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser');

var server = app.listen(8081, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
const sPath = '../styles/styles.scss'
const jPath = './fonts.json'

// color API
// http://localhost:8081/api
app.post("/color", function(req, res){
  //色を変更するためのfs上書きの関数
  var changeColor = function(data) {
    fs.writeFile(sPath, data, function(err) {
      if (err) {throw err;}
    })
  }

  fs.readFile(sPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    } else {
      switch (req.body.id) {
        case 1://44B3C2
          var newData = data.replace(/\$firstColor: (.*);/, '$firstColor: ' + req.body.color + ';');
          changeColor(newData);
          break;
        case 2:
          var newData = data.replace(/\$secondColor: (.*);/, '$secondColor: ' + req.body.color + ';');
          changeColor(newData);
          break;
        case 3:
          var newData = data.replace(/\$thirdColor: (.*);/, '$thirdColor: ' + req.body.color + ';');
          changeColor(newData);
          break;
        case 4:
          var newData = data.replace(/\$fourthColor: (.*);/, '$fourthColor: ' + req.body.color + ';');
          changeColor(newData);
          break;
        case 5:
          var newData = data.replace(/\$fifthColor: (.*);/, '$fifthColor: ' + req.body.color + ';');
          changeColor(newData);
          break;
      }
      res.send("The color change succeeded!!")
    }
  });
});



//fonts upload
const changeFile = function(data, path) {//font-family変更用
  fs.writeFile(path, data, function(err) {
    if (err) {throw err;}
  })
}

const multer = require('multer');
const storage =  multer.diskStorage({
  destination: '../styles/fonts',
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const uploader = multer({ storage })

//font upload
app.post('/fontup', uploader.single('file'), (req, res) => {
  const fileName = req.file.originalname //受け取ったフォントのファイル名
  var fontLeft = fileName.split('.')[0]
  var fontRight = fileName.split('.')[1]

  if (fontRight == 'ttf' || fontRight == 'otf' || fontRight == 'eot' || fontRight == 'woff2') {
    fs.readFile(sPath, 'utf8', function(err, data) {
      //@font-faceを追加する
      var fontFace = '\n\n@font-face {\n  font-family: \'' + fontLeft + '\';\n  src: url(\'~@/styles/fonts/' + fileName + '\');\n  font-display: swap;\n}'
      changeFile(data + fontFace, sPath)
    });
    fs.readFile(jPath, 'utf8', function(err, data) {
      var newJson = data.replace(/"]/, '\",\"' + fontLeft + '\"]')
      changeFile(newJson, jPath)
    })
    //アップ完了したら200ステータスを送る
    res.status(200).json({msg: 'アップロード完了'})
    console.log('アップロード完了');
  } else {
    res.status(400).json({msg: 'フォントファイルを送信してください。'})
    console.log('フォントファイルを送信してください。');
  }
});

//font change
app.post('/fontchg', (req, res) => {
  console.log(req.body.font);
  fs.readFile(sPath, 'utf8', function(err, data) {
    //font-familyを書き換える
    var newData = data.replace(/\'(.*)\', \'Avenir\'/, '\'' + req.body.font + '\', \'Avenir\'')
    changeFile(newData, sPath)
  });
})


//pwa icons size change
const potrace = require('potrace')
const sharp = require('sharp');
const icon =  multer.diskStorage({
  destination: '../../static/img/icons',
  filename: (req, file, cb) => {
    // cb(null, file.originalname)
    cb(null, 'icon\.png')
  }
})
const iconupload = multer({ storage: icon })
app.post('/icon', iconupload.single('file'), (req, res) => {
  res.status(200).json({msg: 'アップロード完了'})
  console.log('アップロード完了');
  var path = '../../static/img/icons/icon.png'
  var sharpFunc = (num, name) => {
    sharp(path).resize(num, num).max().toBuffer(function(err, buffer) {
      fs.writeFileSync('../../static/img/icons/' + name + '\.png', buffer);
    })
  }
  sharpFunc(512, 'android-chrome-512x512')
  sharpFunc(192, 'android-chrome-192x192')
  sharpFunc(152, 'apple-touch-icon-152x152')
  sharpFunc(144, 'msapplication-icon-144x144')
  sharpFunc(32, 'favicon-32x32')
  sharpFunc(16, 'favicon-16x16')
  potrace.trace(path, function(err, svg) {
    if (err) throw err;
    fs.writeFileSync('../../static/img/icons/safari-pinned-tab.svg', svg);
  });
})


/****** Router Manage *******/
const async = require("async")
const jsonfile = require('jsonfile')
const changeJson = function(data, path) {
  jsonfile.writeFile(path, data, function(err) {
    if (err) {throw err;}
  })
}

//locale
app.post('/locale', (req, res) => {
  var path1 = '../router/locale.json'
  jsonfile.readFile(path1, function(err, arr) {
    console.log(arr)
    arr[arr.length] = req.body.lang
    console.log(arr);
    changeJson(arr, path1)
  })

  async.map(req.body.pages, function (page) {
    var path2 = '../router/pages/' + page.toLowerCase() + '.json'
    console.log(path2);
    jsonfile.readFile(path2, function(err, obj) {
      obj[req.body.lang.lang] = obj.ja
      console.log(obj);
      changeJson(obj, path2)
    })
  })

  var path3 = '../router/index.js'
  fs.readFile(path3, 'utf8', function(err, data) {
    var newData = data.replace(/path: \'\//g, 'path: \'\/' + req.body.lang.lang + '\/')
    newData = newData.replace(/\.ja}/g, '\.' + req.body.lang.lang + '}')
    var newFile = '../router/index-' + req.body.lang.lang + '.js'
    changeFile(newData, newFile)
  });

  //言語別のmanifest.jsonを作成
  var path4 = '../../static/manifest.json'
  jsonfile.readFile(path4, function(err, obj) {
    console.log(obj)
    obj.start_url = '/' + req.body.lang.lang
    changeJson(obj, path4.replace(/\.json/, '-' + req.body.lang.lang + '\.json'))
  })
})


//page
app.post('/pages', (req, res) => {
  var path1 = './pages.json'
  jsonfile.readFile(path1, function(err, arr) {
    console.log(arr)
    arr[arr.length] = req.body.comp
    changeJson(arr, path1)
  })

  var path2 = './Sample.vue'
  fs.readFile(path2, 'utf8', function(err, data) {
    var newData = data.replace(/pagename/g, req.body.comp.toLowerCase())
    newData = newData.replace(/PageComp/g, req.body.comp)
    var newFile = '../pages/' + req.body.comp + '.vue'
    changeFile(newData, newFile)
  });

  var path3 = '../router/pages/' + req.body.comp.toLowerCase() + '.json'
  var rowData = {keys:["title"]}
  for (var l of req.body.locale) {
    rowData[l] = {title:"Welcome to the " + req.body.comp + " Page!!"}
  }
  var newFile = '../router/pages/' + req.body.comp.toLowerCase() + '.json'
  changeJson(rowData, newFile)

  async.map(req.body.locale, function (locale) {
    if (locale != 'ja') {
      var path = '../router/index-' + locale + '.js'
      fs.readFile(path, "utf8", function(err, file) {
        var newData = file.replace(/\}\n  ]/,
          '},\n    \{\n      path: \'\/' + locale + '/' + req.body.comp.toLowerCase() + '\',\n      name: \'' + req.body.comp + '\',\n      component: require(\'@/pages/' + req.body.comp + '\')\.default,\n      props: \{tx: require(\'@/router/pages/' + req.body.comp.toLowerCase() + '\.json\').' + locale + '}\n    }\n  ]')
        changeFile(newData, path)
      })
    } else {
      var path = '../router/index.js'
      fs.readFile(path, "utf8", function(err, file) {
        var newData = file.replace(/\}\n  ]/,
          '},\n    \{\n      path: \'\/' + req.body.path + '\',\n      name: \'' + req.body.comp + '\',\n      component: require(\'@/pages/' + req.body.comp + '\')\.default,\n      props: \{tx: require(\'@/router/pages/' + req.body.comp.toLowerCase() + '\.json\').' + locale + '}\n    }\n  ]')
        changeFile(newData, path)
      })
    }
  })
})

//text change
app.post('/text', (req, res) => {
  var path = '../router/pages/' + req.body.page.toLowerCase() + '.json'
  changeJson(req.body.text, path)
})

//text delete
app.post('/trash', (req, res) => {
  var path = '../router/pages/' + req.body.page.toLowerCase() + '.json'
  jsonfile.readFile(path, function(err, obj) {
    if (req.body.num != 0) {
      obj.keys.splice(req.body.num, 1);
    } else {
      obj.keys.shift();
    }
    for (var i of req.body.locale) {
      delete obj[i][req.body.key]
    }
    console.log(obj);
    changeJson(obj, path)
  })
})

//variable
app.post('/variable', (req, res) => {
  var path = '../router/pages/' + req.body.page.toLowerCase() + '.json'
  jsonfile.readFile(path, function(err, obj) {
    obj.keys[obj.keys.length] = req.body.variable
    for (var i of req.body.locale) {
      obj[i][req.body.variable] = ""
    }
    console.log(obj);
    changeJson(obj, path)
  })
})
