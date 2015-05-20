var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');
var Transitions = require('./styles/transitions');

var FontIcon = React.createClass({displayName: "FontIcon",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    hoverColor: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      hovered: false,
    };
  },

  getStyles: function() {
    var theme = this.context.muiTheme.palette;
    var styles = {
      position: 'relative',
      fontSize: Spacing.iconSize + 'px',
      display: 'inline-block',
      userSelect: 'none',
      transition: Transitions.easeOut()
    };

    if (!styles.color && !this.props.className) {
      styles.color = theme.textColor;
    }

    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      
      this.props,onMouseOut=$__0.onMouseOut,onMouseOver=$__0.onMouseOver,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onMouseOut:1,onMouseOver:1,style:1});
    var hoverStyle = this.props.hoverColor ? {color: this.props.hoverColor} : {};

    return (
      React.createElement("span", React.__spread({}, 
        other, 
        {onMouseOut: this._handleMouseOut, 
        onMouseOver: this._handleMouseOver, 
        style: this.mergeAndPrefix(
          this.getStyles(),
          this.props.style,
          this.state.hovered && hoverStyle)}))
    );
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  }
});

module.exports = FontIcon;
