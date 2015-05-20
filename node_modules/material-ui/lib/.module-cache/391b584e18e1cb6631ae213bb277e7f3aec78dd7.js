var React = require('react/addons');
var StylePropable = require('./mixins/style-propable');

var SvgIcon = React.createClass({displayName: "SvgIcon",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  getTheme: function() {
    return this.context.muiTheme.palette;
  },

  getStyles: function() {
    return {
      display: 'inline-block',
      height: '24px',
      width: '24px',
      userSelect: 'none',
      fill: this.getTheme().textColor
    };
  },

  render: function() {

    var $__0=
      
      
      
      this.props,viewBox=$__0.viewBox,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{viewBox:1,style:1});

    return (
      React.createElement("svg", React.__spread({}, 
        other, 
        {viewBox: "0 0 24 24", 
        style: this.mergeAndPrefix(
          this.getStyles(), 
          this.props.style)}), 
            this.props.children
      )
    );
  }
});

module.exports = SvgIcon;
