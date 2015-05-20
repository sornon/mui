var React = require('react');
var EnhancedSwitch = require('./enhanced-switch');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var CheckboxOutline = require('./svg-icons/toggle-check-box-outline-blank');
var CheckboxChecked = require('./svg-icons/toggle-check-box-checked');

var Checkbox = React.createClass({displayName: "Checkbox",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func
  },

  getInitialState: function() {
    return {
      switched: 
        this.props.checked ||
        this.props.defaultChecked || 
        (this.props.valueLink && this.props.valueLink.value) || 
        false,
    }
  },

  getTheme: function() {
    return this.context.muiTheme.component.checkbox;
  },

  getStyles: function() {
    var checkboxSize = 24;
    var styles = {
      icon: {
          height: checkboxSize,
          width: checkboxSize,
      },
      check: {
          position: 'absolute',
          opacity: 0, 
          transform: 'scale(0)',
          transitionOrigin: '50% 50%',
          transition: Transitions.easeOut('450ms', 'opacity', '0ms') + ', ' + 
                      Transitions.easeOut('0ms', 'transform', '450ms'),
          fill: this.getTheme().checkedColor   
      },
      box: {
          position: 'absolute',
          opacity: 1,
          fill: this.getTheme().boxColor,          
          transition: Transitions.easeOut('2s', null, '200ms') 
      },
      checkWhenSwitched: {
        opacity: 1,
        transform: 'scale(1)',
        transition: Transitions.easeOut('0ms', 'opacity', '0ms') + ', ' + 
                    Transitions.easeOut('800ms', 'transform', '0ms')
      },
      boxWhenSwitched: {
        transition: Transitions.easeOut('100ms', null, '0ms'),
        fill: this.getTheme().checkedColor
      },
      checkWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      boxWhenDisabled: {
        fill: this.getTheme().disabledColor
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,onCheck=$__0.onCheck,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onCheck:1});

    var styles = this.getStyles();
    var boxStyles = 
      this.mergeAndPrefix(
        styles.box,
        this.state.switched && styles.boxWhenSwitched,
        this.props.iconStyle,
        this.props.disabled && styles.boxWhenDisabled);
    var checkStyles = 
      this.mergeAndPrefix(
        styles.check,
        this.state.switched && styles.checkWhenSwitched,
        this.props.iconStyle,
        this.props.disabled && styles.checkWhenDisabled);

    var checkboxElement = (
      React.createElement("div", null, 
        React.createElement(CheckboxOutline, {style: boxStyles}), 
        React.createElement(CheckboxChecked, {style: checkStyles})
      )
    );

    var rippleColor = this.state.switched ? checkStyles.fill : boxStyles.fill;

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "checkbox",
      switched: this.state.switched,
      switchElement: checkboxElement,
      rippleColor: rippleColor,
      iconStyle: styles.icon,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      defaultSwitched: this.props.defaultChecked,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      React.createElement(EnhancedSwitch, React.__spread({},  
        other, 
        enhancedSwitchProps))
    );
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },

  _handleCheck: function(e, isInputChecked) {
    if (this.props.onCheck) this.props.onCheck(e, isInputChecked);
  },

  _handleStateChange: function(newSwitched) {
    this.setState({switched: newSwitched});
  }

});

module.exports = Checkbox;
