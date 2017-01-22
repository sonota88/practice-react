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

var ItemRow = React.createClass({
  render: function(){
    var item = this.props.item;
    return (
      <tr>
        <td><a href={ "items/" + item.id }>{item.id}</a></td>
        <td>{item.name}</td>
        <td><a href={ "items/" + item.id + "/edit" }>edit</a></td>
      </tr>
    );
  }
});

var ItemList = React.createClass({
  render: function() {
    var items = this.props.items.map((item)=>{
      return (
        <ItemRow item={item} key={item.id} />
      );
    });
    return (
      <table>
        <tbody>
          {items}
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

var ItemForm = React.createClass({
  render: function(){
    var item = this.props.item;
    return (
      <form method="POST" action={this.props.action}>
        <input type="hidden" name="_method" value={this.props.method} />
        id: <input type="text" name="id" readOnly={true} defaultValue={item.id} />
        <br />
        name: <input type="text" name="name" defaultValue={item.name} />
        <br />
        note: <textarea name="note"defaultValue={item.note} />
        <br />
        <button>作成</button>
      </form>
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

function new_(){
  var item = {};
  ReactDOM.render(
    <ItemForm item={item} method={"post"} action={ "/items" } />,
    document.getElementById('app')
  );
}

function edit(){
  location.href.match(/\/(\d+?)\/edit$/);
  var id = parseInt(RegExp.$1, 10);
  api("get", "/api/items/" + id, {}, (data)=>{
    ReactDOM.render(
      <ItemForm item={data.item} method={"patch"} action={ "/items/" + id } />,
      document.getElementById('app')
    );
  });
}

$(()=>{
  if( /\/items$/.test(location.href) ){
    index();
  }else if( /\/items\/\d+$/.test(location.href) ){
    show();
  }else if( /\/items\/new$/.test(location.href) ){
    new_();
  }else if( /\/items\/\d+\/edit$/.test(location.href) ){
    edit();
  }else{
    throw new Error("Invalid URL");
  }
});
