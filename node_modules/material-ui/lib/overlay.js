var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Transitions = require('./styles/transitions');
var Colors = require('./styles/colors');

var Overlay = React.createClass({displayName: "Overlay",

  mixins: [StylePropable],

  propTypes: {
    show: React.PropTypes.bool,
    autoLockScrolling: React.PropTypes.bool,
    transitionEnabled: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      autoLockScrolling: true,
      transitionEnabled: true
    };
  },
  
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.autoLockScrolling) (this.props.show) ? this._preventScrolling() : this._allowScrolling();
  },

  setOpacity:function(opacity) {
    var overlay = React.findDOMNode(this);
    overlay.style.opacity = opacity;
  },

  getStyles: function() {
    var styles = {
      root: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        zIndex: 9,
        top: 0,
        left: '-100%',
        opacity: 0,
        backgroundColor: Colors.lightBlack,
        WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

        // Two ways to promote overlay to its own render layer
        willChange: 'opacity',
        transform: 'translateZ(0)',

        transition:
          this.props.transitionEnabled &&
          Transitions.easeOut('0ms', 'left', '400ms') + ',' +
          Transitions.easeOut('400ms', 'opacity')
      },
      rootWhenShown: {
        left: '0',
        opacity: 1,
        transition:
          this.props.transitionEnabled &&
          Transitions.easeOut('0ms', 'left') + ',' +
          Transitions.easeOut('400ms', 'opacity')
      }
    };
    return styles;
  },

  render: function() {

    var $__0=
      
      
      
      this.props,show=$__0.show,style=$__0.style,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{show:1,style:1});

    var styles = this.mergeAndPrefix(this.getStyles().root, this.props.style, this.props.show && this.getStyles().rootWhenShown)

    return (
      React.createElement("div", React.__spread({},  other, {style: styles}))
    );
  },
  
  preventScrolling: function() {
    if (!this.props.autoLockScrolling) this._preventScrolling();
  },
  
  allowScrolling: function() {
    if (!this.props.autoLockScrolling) this._allowScrolling();
  },
  
  _preventScrolling: function() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'hidden';
  },
  
  _allowScrolling: function() {
    var body = document.getElementsByTagName('body')[0];
    body.style.overflow = '';
  }

});

module.exports = Overlay;
