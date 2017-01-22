var React = require("react");
var ReactDOM = require("react-dom");

var $ = require("jquery");

var Hi = React.createClass({
  render: function() {
    return (
      <p>Hi!</p>
    );
  }
});

$(()=>{
  ReactDOM.render(<Hi />, document.getElementById('app'));
});
