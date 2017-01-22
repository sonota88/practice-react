var React = require("react");
var ReactDOM = require("react-dom");
var $ = require("jquery");

function puts(... args){
  console.log.apply(console, args);
}

function api(method, url, params, fn){
  var _params = {
    _method: method,
    json: JSON.stringify(params)
  };
  $.post(url, _params).then(fn);
}

var Hi = React.createClass({
  render: function() {
    return (
      <p>Hi!</p>
    );
  }
});

function index(){
  api("get", "/api/items", {}, (data)=>{
    puts(data);
  });
  ReactDOM.render(<Hi />, document.getElementById('app'));
}

$(()=>{
  console.log(location.href);
  if( /\/index.html$/.test(location.href) ){
    index();
  }else{
    throw new Error("Invalid URL");
  }
});
