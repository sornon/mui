var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var ColorManipulator = require('./utils/color-manipulator');
var Typography = require('./styles/typography');
var EnhancedButton = require('./enhanced-button');

var FlatButton = React.createClass({displayName: "FlatButton",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    hoverColor: React.PropTypes.string,
    label: function(props, propName, componentName){
      if (!props.children && !props.label) {
        return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
      }
    },
    labelStyle: React.PropTypes.object,
    primary: React.PropTypes.bool,
    rippleColor: React.PropTypes.string,
    secondary: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      labelStyle: {},
    }
  },

  getInitialState: function() {
    return {
      hovered: false,
      isKeyboardFocused: false
    };
  },

  getThemeButton: function() {
    return this.context.muiTheme.component.button;
  },

  getTheme: function() {
    return this.context.muiTheme.component.flatButton;
  },

  _getColor: function(){
    var theme = this.getTheme();
    var color = this.props.disabled ? theme.disabledTextColor :
                this.props.primary ? theme.primaryTextColor :
                this.props.secondary ? theme.secondaryTextColor :
                theme.textColor;

    return {
      default: color,
      hover: this.props.hoverColor || ColorManipulator.fade(ColorManipulator.lighten(color, 0.4), 0.15),
      ripple: this.props.rippleColor || ColorManipulator.fade(color, 0.8)
    };
  },

  getStyles: function() {
    var color = this._getColor();
    var styles = {
      root: {
        color: color.default,
        transition: Transitions.easeOut(),
        fontSize: Typography.fontStyleButtonFontSize,
        letterSpacing: 0,
        textTransform: 'uppercase',
        fontWeight: Typography.fontWeightMedium,
        borderRadius: 2,
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: this.getTheme().color,
        lineHeight: this.getThemeButton().height + 'px',
        minWidth: this.getThemeButton().minWidth,
        padding: 0,
        margin: 0,
        //This is need so that ripples do not bleed past border radius.
        //See: http://stackoverflow.com/questions/17298739/css-overflow-hidden-not-working-in-chrome-when-parent-has-border-radius-and-chil
        transform: 'translate3d(0, 0, 0)',
      },
      label: {
        position: 'relative',
        padding: '0px ' + this.context.muiTheme.spacing.desktopGutterLess + 'px',
      },
      rootWhenHovered: {
        backgroundColor: color.hover
      },
      rippleColor: color.ripple
    };

    return styles;
  },

  render: function() {
    var $__0=
        
        
        
        
        
        
        
        
        
        
        
        
        this.props,children=$__0.children,hoverColor=$__0.hoverColor,label=$__0.label,labelStyle=$__0.labelStyle,onBlur=$__0.onBlur,onMouseOut=$__0.onMouseOut,onMouseOver=$__0.onMouseOver,primary=$__0.primary,rippleColor=$__0.rippleColor,secondary=$__0.secondary,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{children:1,hoverColor:1,label:1,labelStyle:1,onBlur:1,onMouseOut:1,onMouseOver:1,primary:1,rippleColor:1,secondary:1,style:1});

    var styles = this.getStyles();

    var labelElement;
    if (label) {
      labelElement = (
        React.createElement("span", {style: this.mergeAndPrefix(styles.label, this.props.labelStyle)}, 
          label
        )
      );
    };

    return (
      React.createElement(EnhancedButton, React.__spread({}, 
        other, 
        {ref: "enhancedButton", 
        style: this.mergeStyles(
          styles.root,
          ((this.state.hovered || this.state.isKeyboardFocused) && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style
        ), 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut, 
        focusRippleColor: styles.rippleColor, 
        touchRippleColor: styles.rippleColor, 
        onKeyboardFocus: this._handleKeyboardFocus}), 
        labelElement, 
        this.props.children
      )
    );
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (this.props.onMouseOver) {
      this.props.onMouseOver(e);
    }
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (this.props.onMouseOut) {
      this.props.onMouseOut(e);
    }
  },

  _handleKeyboardFocus: function(e, isKeyboardFocused) {
    this.setState({isKeyboardFocused:isKeyboardFocused});
  },

  _handleOnBlur: function (e) {
    this.setState({hovered: false});
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
});

module.exports = FlatButton;
