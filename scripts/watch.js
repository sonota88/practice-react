var chokidar = require('chokidar')
const execSync = require('child_process').execSync;

var watcher_src = chokidar.watch('./src', {
  ignored: /([\/\\]\.|\~$)/,
  persistent:true
})

function exec(cmd){
  var out;
  try{
    out = execSync(cmd);
    console.log(out.toString());
  }catch(e){
    console.log("---->> stdout");
    console.log(e.stdout.toString());
    console.log("<<---- stdout");
  }
}

function onchange_src(){
  exec("npm run build");
}

function onerror(e){
  console.log("onerror");
  console.log(e);
}

watcher_src.on('change', onchange_src)
watcher_src.on('error', onerror)
