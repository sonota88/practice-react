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

var ItemList = React.createClass({
  render: function() {
    var items = this.props.items;
    var item = items[0];
    return (
      <table>
        <tbody>
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td><a href={ "edit?id=" + item.id }>edit</a></td>
          </tr>
        </tbody>
      </table>
    );
  }
});

function index(){
  api("get", "/api/items", {}, (data)=>{
    puts(data);
    ReactDOM.render(
      <ItemList items={data.items} />,
      document.getElementById('app')
    );
  });
}

$(()=>{
  if( /\/index.html$/.test(location.href) ){
    index();
  }else{
    throw new Error("Invalid URL");
  }
});
