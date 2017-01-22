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
            <td><a href={ "items/" + item.id }>{item.id}</a></td>
            <td>{item.name}</td>
            <td><a href={ "items/" + item.id + "/edit" }>edit</a></td>
          </tr>
        </tbody>
      </table>
    );
  }
});

var Item = React.createClass({
  render: function() {
    var item = this.props.item;
    return (
      <table>
        <tbody>
          <tr>
            <th>id</th>
            <td>{item.id}</td>
          </tr>
          <tr>
            <th>name</th>
            <td>{item.name}</td>
          </tr>
          <tr>
            <th>note</th>
            <td>{item.note}</td>
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

function show(){
  location.href.match(/\/(\d+)$/);
  var id = parseInt(RegExp.$1, 10);
  api("get", "/api/items/" + id, {}, (data)=>{
    puts(data);
    ReactDOM.render(
      <Item item={data.item} />,
      document.getElementById('app')
    );
  });
}

$(()=>{
  if( /\/items$/.test(location.href) ){
    index();
  }else if( /\/items\/\d+$/.test(location.href) ){
    show();
  }else{
    throw new Error("Invalid URL");
  }
});
