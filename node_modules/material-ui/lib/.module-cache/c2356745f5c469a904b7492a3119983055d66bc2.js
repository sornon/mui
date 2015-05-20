var React = require('react');
var StylePropable = require('../mixins/style-propable');
var EnhancedButton = require('../enhanced-button');
var Transitions = require('../styles/transitions');

var ClockButton = React.createClass({displayName: "ClockButton",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
      position: React.PropTypes.oneOf(['left', 'right'])
  },
  
  getDefaultProps: function () {
      return {
          position: "left"  
      };
  },
  _handleTouchTap: function(){
    
    this.setState({
      selected: true
    })
    this.props.onTouchTap();
  },
  getTheme: function() {
    return this.context.muiTheme.component.timePicker;
  },
  render: function() {
    
    var $__0=
      
        this.props,className=$__0.className,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1});
    
    var styles = {
      root: {
        position: "absolute",
        bottom: "65px",
        pointerEvents: "auto",
        height: "50px", 
        width: "50px",
        borderRadius: "100%"
      },

      label : {
        position: "absolute",
        top: "17px",
        left: "14px"
      },

      select: {
        position: 'absolute',
        height: 50,
        width: 50,
        top: "0px",
        left: "0px",
        opacity: 0,
        borderRadius: '50%',
        transform: 'scale(0)',
        transition: Transitions.easeOut(),
        backgroundColor: this.getTheme().accentColor,
      },
    };

    if (this.props.selected) {
      styles.label.color = this.getTheme().selectTextColor;
      styles.select.opacity = 1;
      styles.select.transform = 'scale(1)';
    }

    if( this.props.position == "right" ){
      styles.root.right = "5px";
    }else{
      styles.root.left = "5px";
    }
      


    return (
        React.createElement(EnhancedButton, React.__spread({},  other, 
          {style: this.mergeAndPrefix(styles.root), 
          disableFocusRipple: true, 
          disableTouchRipple: true, 
          onTouchTap: this._handleTouchTap}), 
          React.createElement("span", {style: this.mergeAndPrefix(styles.select)}), 
          React.createElement("span", {style: this.mergeAndPrefix(styles.label)}, this.props.children)
        ) 
    );
  }
});

module.exports = ClockButton;