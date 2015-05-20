var React = require('react');
var BeforeAfterWrapper = require('./before-after-wrapper');

var ClearFix = React.createClass({displayName: "ClearFix",
  
  render: function() {

    var $__0=
      
      
      this.props,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1});

    var before = function() { 
      return {
        content: "' '",
        display: 'table'
      }
    }

    var after = before();
    after.clear = 'both';

    return (
      React.createElement(BeforeAfterWrapper, React.__spread({},  
        other, 
        {beforeStyle: before(), 
        afterStyle: after, 
        style: this.props.style}), 
          this.props.children
      )
    );
  }
});

module.exports = ClearFix;
