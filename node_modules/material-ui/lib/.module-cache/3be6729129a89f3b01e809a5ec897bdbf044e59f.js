var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;
var StylePropable = require('../mixins/style-propable');
var SlideInChild = require('./slide-in-child');

var SlideIn = React.createClass({displayName: "SlideIn",

  mixins: [StylePropable],

  propTypes: {
    direction: React.PropTypes.oneOf(['left', 'right', 'up', 'down'])
  },

  getDefaultProps: function() {
    return {
      direction: 'left'
    };
  },

  render: function() {
    var $__0=
      
      
      this.props,direction=$__0.direction,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{direction:1});

    var styles = this.mergeAndPrefix({
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }, this.props.style);

    return (
      React.createElement(ReactTransitionGroup, React.__spread({},  other, 
        {style: styles, 
        component: "div"}), 
        this._getSlideInChildren()
      )
    );
  },

  _getSlideInChildren: function() {
    return React.Children.map(this.props.children, function(child) {
      return (
        React.createElement(SlideInChild, {
          key: child.key, 
          direction: this.props.direction, 
          getLeaveDirection: this._getLeaveDirection}, 
          child
        )
      );
    }, this);
  },

  _getLeaveDirection: function() {
    return this.props.direction;
  }

});

module.exports = SlideIn;