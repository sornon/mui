var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var EnhancedSwitch = require('./enhanced-switch');
var RadioButtonOff = require('./svg-icons/toggle-radio-button-off');
var RadioButtonOn = require('./svg-icons/toggle-radio-button-on');

var RadioButton = React.createClass({displayName: "RadioButton",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    iconStyle: React.PropTypes.object,
    onCheck: React.PropTypes.func
  },

  getTheme: function() {
    return this.context.muiTheme.component.radioButton;
  },

  getStyles: function() {
    var styles = {
      icon: {
          height: this.getTheme().size,
          width: this.getTheme().size
      },
      target: {
          transition: Transitions.easeOut(),
          position: 'absolute',
          opacity: 1,
          transform: 'scale(1)',
          fill: this.getTheme().borderColor
      },
      fill: {
          position: 'absolute',
          opacity: 1,
          transform: 'scale(0)',
          transformOrigin: '50% 50%',
          transition: Transitions.easeOut(),
          fill: this.getTheme().checkedColor
      },
      targetWhenChecked: {
        opacity: 0,
        transform: 'scale(0)'
      },
      fillWhenChecked: {
        opacity: 1,
        transform: 'scale(1)'
      },
      targetWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
      fillWhenDisabled: {
        fill: this.getTheme().disabledColor
      },
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      this.props,onCheck=$__0.onCheck,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onCheck:1});

    var styles = this.getStyles();
    var onStyles = 
      this.mergeAndPrefix(
        styles.target,
        this.props.checked && styles.targetWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.targetWhenDisabled);
    var offStyles = 
      this.mergeAndPrefix(
        styles.fill,
        this.props.checked && styles.fillWhenChecked,
        this.props.iconStyle,
        this.props.disabled && styles.fillWhenDisabled);

    var radioButtonElement = (
      React.createElement("div", null, 
          React.createElement(RadioButtonOff, {style: onStyles}), 
          React.createElement(RadioButtonOn, {style: offStyles})
      )
    );

    var rippleColor = this.props.checked ? this.getTheme().checkedColor : this.getTheme().borderColor;

    var enhancedSwitchProps = {
      ref: "enhancedSwitch",
      inputType: "radio",
      switched: this.props.checked,
      switchElement: radioButtonElement,
      rippleColor: rippleColor,
      iconStyle: styles.icon,
      onSwitch: this._handleCheck,
      onParentShouldUpdate: this._handleStateChange,
      labelPosition: (this.props.labelPosition) ? this.props.labelPosition : "right"
    };

    return (
      React.createElement(EnhancedSwitch, React.__spread({},  
        other, 
        enhancedSwitchProps))
    );
  },

  // Only called when selected, not when unselected.
  _handleCheck: function(e) {
    if (this.props.onCheck) this.props.onCheck(e, this.props.value);
  },

  _handleStateChange: function(newSwitched) {
  },

  isChecked: function() {
    return this.refs.enhancedSwitch.isSwitched();
  },

  // Use RadioButtonGroup.setSelectedValue(newSelectionValue) to set a 
  // RadioButton's checked value.
  setChecked: function(newCheckedValue) {
    this.refs.enhancedSwitch.setSwitched(newCheckedValue);
  },
  
  getValue: function() {
    return this.refs.enhancedSwitch.getValue();
  }

});

module.exports = RadioButton;
