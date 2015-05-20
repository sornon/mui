var React = require('react');
var StylePropable = require('../mixins/style-propable');

var WindowListenable = require('../mixins/window-listenable');
var DateTime = require('../utils/date-time');
var KeyCode = require('../utils/key-code');
var TimePickerDialog = require('./time-picker-dialog');
var TextField = require('../text-field');

var emptyTime = new Date();
emptyTime.setHours(0);
emptyTime.setMinutes(0);

var TimePicker = React.createClass({displayName: "TimePicker",

  mixins: [StylePropable, WindowListenable],

  propTypes: {
    defaultTime: React.PropTypes.object, 
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    onFocus: React.PropTypes.func,
    onTouchTap: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onShow: React.PropTypes.func,
    onDismiss: React.PropTypes.func,
  },

  windowListeners: {
    'keyup': '_handleWindowKeyUp'
  },

  getDefaultProps: function() {
    return {
      defaultTime: emptyTime,
      format: 'ampm'
    };
  },

  getInitialState: function() {
    return {
      time: this.props.defaultTime,
      dialogTime: new Date()
    };
  },
  formatTime: function(date){

    var hours = date.getHours();
    var mins = date.getMinutes();
    var aditional = "";

    if(this.props.format == "ampm"){
      var isAM = hours < 12;
      hours = hours % 12;
      aditional +=  isAM ? " am" : " pm";
      hours = hours || 12;
    }

    hours = hours.toString();
    mins = mins.toString();

    if(hours.length < 2) hours = "0" + hours;
    if(mins.length < 2) mins = "0" + mins;
    
    return  hours + ":" + mins + aditional;
  },
  render: function() {
    var $__0=
      
      
      
      
      
      
      this.props,format=$__0.format,onFocus=$__0.onFocus,onTouchTap=$__0.onTouchTap,onShow=$__0.onShow,onDismiss=$__0.onDismiss,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{format:1,onFocus:1,onTouchTap:1,onShow:1,onDismiss:1});

    var defaultInputValue;

    if (this.props.defaultDate) {
      defaultInputValue = this.formatTime(this.props.defaultTime);
    }

    return (
      React.createElement("div", null, 
        React.createElement(TextField, React.__spread({}, 
          other, 
          {ref: "input", 
          defaultValue: defaultInputValue, 
          onFocus: this._handleInputFocus, 
          onTouchTap: this._handleInputTouchTap})), 
        React.createElement(TimePickerDialog, {
          ref: "dialogWindow", 
          initialTime: this.state.dialogTime, 
          onAccept: this._handleDialogAccept, 
          onShow: onShow, 
          onDismiss: onDismiss, 
          format: format})
      )

    );
  },

  getTime: function() {
    return this.state.time;
  },

  setTime: function(t) {
    this.setState({
      time: t 
    });
    this.refs.input.setValue(this.formatTime(t));
  },

  _handleDialogAccept: function(t) {

    this.setTime(t);
    if (this.props.onChange) this.props.onChange(null, t);
  },

  _handleInputFocus: function(e) {
    e.target.blur();
    if (this.props.onFocus) this.props.onFocus(e);
  },

  _handleInputTouchTap: function(e) {
    this.setState({
      dialogTime: this.getTime()
    });
   
    this.refs.dialogWindow.show();
    if (this.props.onTouchTap) this.props.onTouchTap(e);
  } 

});

module.exports = TimePicker;
