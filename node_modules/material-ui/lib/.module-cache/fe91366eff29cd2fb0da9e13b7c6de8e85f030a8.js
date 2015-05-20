var React = require('react');
var StylePropable = require('../mixins/style-propable');
var Transition = require('../styles/transitions');
var DateTime = require('../utils/date-time');
var EnhancedButton = require('../enhanced-button');

var DayButton = React.createClass({displayName: "DayButton",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    date: React.PropTypes.object,
    onTouchTap: React.PropTypes.func,
    selected: React.PropTypes.bool
  },

  getTheme: function() {
    return this.context.muiTheme.component.datePicker;
  },

  render: function() {
    var $__0=
      
      
      
      
      
      this.props,className=$__0.className,date=$__0.date,onTouchTap=$__0.onTouchTap,selected=$__0.selected,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,date:1,onTouchTap:1,selected:1});

    var styles = {
      root: {
        boxSizing: 'border-box',
        WebkitTapHighlightColor: 'rgba(0,0,0,0)', 
        position: 'relative',
        float: 'left',
        width: 36,
        padding: '4px 2px',
      },

      label: {
        position: 'relative',
        color: this.context.muiTheme.palette.textColor
      },

      select: {
        position: 'absolute',
        height: 32,
        width: 32,
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transition.easeOut(),
        backgroundColor: this.getTheme().selectColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if (DateTime.isEqualDate(this.props.date, new Date()) && !this.props.selected) {
        styles.label.color = this.getTheme().color;
    }

    return this.props.date ? (
      React.createElement(EnhancedButton, React.__spread({},  other, 
        {style: styles.root, 
        disableFocusRipple: true, 
        disableTouchRipple: true, 
        onTouchTap: this._handleTouchTap, 
        onKeyboardFocus: this._handleKeyboardFocus}), 
        React.createElement("div", {style: styles.select}), 
        React.createElement("span", {style: styles.label}, this.props.date.getDate())
      )
    ) : (
      React.createElement("span", {style: styles.root})
    );
  },

  _handleTouchTap: function(e) {
    if (this.props.onTouchTap) this.props.onTouchTap(e, this.props.date);
  },

  _handleKeyboardFocus: function(e, keyboardFocused) {
    if (this.props.onKeyboardFocus) this.props.onKeyboardFocus(e, keyboardFocused, this.props.date);
  } 

});

module.exports = DayButton;