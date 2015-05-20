var React = require('react');
var StylePropable = require('../mixins/style-propable');

var ToolbarTitle = React.createClass({displayName: "ToolbarTitle",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    text: React.PropTypes.string,
  },

  getTheme: function() {
    return this.context.muiTheme.component.toolbar;
  },

  render: function() {
    var $__0=
      
      
      
      this.props,style=$__0.style,text=$__0.text,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{style:1,text:1});

    var styles = this.mergeAndPrefix({
      paddingRight: this.context.muiTheme.spacing.desktopGutterLess,
      lineHeight: this.getTheme().height + 'px',
      fontSize: this.getTheme().titleFontSize + 'px',
      display: 'inline-block',
      position: 'relative',
    }, style);

    return (
      React.createElement("span", React.__spread({style: styles},  other), text)
    );
  }

});

module.exports = ToolbarTitle;
