var React = require('react');
var StylePropable = require('../mixins/style-propable');

var SlideInTransitionGroup = require('../transition-groups/slide-in');

var TimeDisplay = React.createClass({displayName: "TimeDisplay",

  mixins: [StylePropable],
 
  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    selectedTime: React.PropTypes.object.isRequired,
    format: React.PropTypes.oneOf(['ampm', '24hr']),
    mode: React.PropTypes.oneOf(['hour', 'minute']),
    affix: React.PropTypes.oneOf(['', 'pm', 'am'])
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },
  getDefaultProps: function () {
      return {
          mode: 'hour' ,
          affix: '' 
      };
  },
  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.selectedTime !== this.props.selectedTime) {
      direction = nextProps.selectedTime > this.props.selectedTime ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },
  sanitizeTime: function(time){
    var hour = this.props.selectedTime.getHours();
    var min = this.props.selectedTime.getMinutes().toString();

    if(this.props.format == "ampm"){

      hour %= 12;
      hour = hour || 12;
    }

    hour = hour.toString();
    if(hour.length < 2 ) hour = "0" + hour;
    if(min.length < 2 ) min = "0" + min;

    return [hour, min];
  },
  getTheme: function() {
    return this.context.muiTheme.component.timePicker;
  },
  render: function() {
    
		var $__0=
			
			
			
		  this.props,selectedTime=$__0.selectedTime,mode=$__0.mode,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{selectedTime:1,mode:1});
     
		var styles = {
			root: {
				textAlign: "center",
				position: "relative",
				width: "280px",
				height: "100%",
			},

			time: {
				margin: "6px 0",
				lineHeight: "58px",
				height: "58px",
				fontSize: "58px",
			},

			box: {
				padding: "16px 0",
		    backgroundColor: this.getTheme().color,
		    color: this.getTheme().textColor,
			},


			hour: {}, 
			
			minute: {}
		}


    var $__1=    this.sanitizeTime(),hour=$__1[0],min=$__1[1];
    
     
    var hourClassName = "";
    var minClassName = "";

    styles[mode].color = this.getTheme().accentColor;

    return (
      React.createElement("div", React.__spread({},  other, {style: this.mergeAndPrefix(styles.root)}), 

        React.createElement("div", {style: this.mergeAndPrefix(styles.box)}, 
 
         
          React.createElement("div", {style: this.mergeAndPrefix(styles.time)}, 
            React.createElement("span", {style: this.mergeAndPrefix(styles.hour), onTouchTap: this.props.onSelectHour}, hour), 
            React.createElement("span", null, ":"), 
            React.createElement("span", {style: this.mergeAndPrefix(styles.minute), onTouchTap: this.props.onSelectMin}, min)
          ), 
         React.createElement("span", {key: "affix"}, this.props.affix.toUpperCase())
          

        )

      )
    );
  }

});

module.exports = TimeDisplay;


 