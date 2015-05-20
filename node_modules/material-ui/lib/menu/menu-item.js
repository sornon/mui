var React = require('react');
var StylePropable = require('../mixins/style-propable');
var FontIcon = require('../font-icon');
var Toggle = require('../toggle');

var Types = {
  LINK: 'LINK',
  SUBHEADER: 'SUBHEADER',
  NESTED: 'NESTED'
};

var MenuItem = React.createClass({displayName: "MenuItem",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    index: React.PropTypes.number.isRequired,
    className: React.PropTypes.string,
    iconClassName: React.PropTypes.string,
    iconRightClassName: React.PropTypes.string,
    iconStyle: React.PropTypes.object,
    iconRightStyle: React.PropTypes.object,
    attribute: React.PropTypes.string,
    number: React.PropTypes.string,
    data: React.PropTypes.string,
    toggle: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    onTouchTap: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onToggle: React.PropTypes.func,
    selected: React.PropTypes.bool
  },
  
  statics: {
    Types: Types
  },

  getDefaultProps: function() {
    return {
      toggle: false,
      disabled: false
    };
  },

  getInitialState: function() {
    return {
      hovered: false
    }
  },

  getTheme: function() {
    return this.context.muiTheme.component.menuItem;
  },

  getSpacing: function() {
    return this.context.muiTheme.spacing;
  },

  getStyles: function() {
    var styles = {
      root: {
        userSelect: 'none',
        cursor: 'pointer',
        lineHeight: this.getTheme().height + 'px',
        paddingLeft: this.getTheme().padding,
        paddingRight: this.getTheme().padding,
        color: this.context.muiTheme.palette.textColor
      },
      number: {
        float: 'right',
        width: 24,
        textAlign: 'center'
      },
      attribute: {
        float: 'right'
      },
      iconRight: {
        lineHeight: this.getTheme().height + 'px',
        float: 'right'
      },
      icon: {
        float: 'left',
        lineHeight: this.getTheme().height + 'px',
        marginRight: this.getSpacing().desktopGutter
      },
      data: {
        display: 'block',
        paddingLeft: this.getSpacing().desktopGutter * 2,
        lineHeight: this.getTheme().dataHeight + 'px',
        height: this.getTheme().dataHeight + 'px',
        verticalAlign: 'top',
        top: -12,
        position: 'relative',
        fontWeight: 300,
        color: this.context.muiTheme.palette.textColor
      },
      toggle: {
        marginTop: ((this.getTheme().height - this.context.muiTheme.component.radioButton.size) / 2),
        float: 'right',
        width: 42
      },
      rootWhenHovered: {
        backgroundColor: this.getTheme().hoverColor
      },
      rootWhenSelected: {
        color: this.getTheme().selectedTextColor
      },
      rootWhenDisabled: {
        cursor: 'default',
        color: this.context.muiTheme.palette.disabledColor
      }
    };
    return styles;
  },

  render: function() {
    var icon;
    var data;
    var iconRight;
    var attribute;
    var number;
    var toggle;

    var styles = this.getStyles();

    if (this.props.iconClassName) icon = React.createElement(FontIcon, {style: this.mergeAndPrefix(styles.icon, this.props.iconStyle), className: this.props.iconClassName});
    if (this.props.iconRightClassName) iconRight = React.createElement(FontIcon, {style: this.mergeAndPrefix(styles.iconRight, this.props.iconRightStyle), className: this.props.iconRightClassName});
    if (this.props.data) data = React.createElement("span", {style: this.mergeAndPrefix(styles.data)}, this.props.data);
    if (this.props.number !== undefined) number = React.createElement("span", {style: this.mergeAndPrefix(styles.number)}, this.props.number);
    if (this.props.attribute !== undefined) attribute = React.createElement("span", {style: this.mergeAndPrefix(styles.style)}, this.props.attribute);
    
    if (this.props.toggle) {
      var $__0=
        
        
        
        
        
        
        
        
        
        this.props,toggle=$__0.toggle,onClick=$__0.onClick,onToggle=$__0.onToggle,onMouseOver=$__0.onMouseOver,onMouseOut=$__0.onMouseOut,children=$__0.children,label=$__0.label,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{toggle:1,onClick:1,onToggle:1,onMouseOver:1,onMouseOut:1,children:1,label:1,style:1});
      toggle = React.createElement(Toggle, React.__spread({},  other, {onToggle: this._handleToggle, style: styles.toggle}));
    }

    return (
      React.createElement("div", {
        key: this.props.index, 
        className: this.props.className, 
        onTouchTap: this._handleTouchTap, 
        onClick: this._handleOnClick, 
        onMouseOver: this._handleMouseOver, 
        onMouseOut: this._handleMouseOut, 
        style: this.mergeAndPrefix(
          styles.root, 
          this.props.selected && styles.rootWhenSelected,
          (this.state.hovered && !this.props.disabled) && styles.rootWhenHovered,
          this.props.style,
          this.props.disabled && styles.rootWhenDisabled)}, 

        icon, 
        this.props.children, 
        data, 
        attribute, 
        number, 
        toggle, 
        iconRight
        
      )
    );
  },

  _handleTouchTap: function(e) {
    if (!this.props.disabled && this.props.onTouchTap) this.props.onTouchTap(e, this.props.index);
  },

  _handleOnClick: function(e) {
    if (!this.props.disabled && this.props.onClick) this.props.onClick(e, this.props.index);
  },

  _handleToggle: function(e, toggled) {
    if (!this.props.disabled && this.props.onToggle) this.props.onToggle(e, this.props.index, toggled);
  },

  _handleMouseOver: function(e) {
    this.setState({hovered: true});
    if (!this.props.disabled && this.props.onMouseOver) this.props.onMouseOver(e);
  },

  _handleMouseOut: function(e) {
    this.setState({hovered: false});
    if (!this.props.disabled && this.props.onMouseOut) this.props.onMouseOut(e);
  }

});

module.exports = MenuItem;
