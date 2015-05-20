var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');

var EnhancedTextarea = React.createClass({displayName: "EnhancedTextarea",

  mixins: [StylePropable],

  propTypes: {
    onChange: React.PropTypes.func,
    onHeightChange: React.PropTypes.func,
    textareaStyle: React.PropTypes.object,
    rows: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      rows: 1
    };
  },

  getInitialState: function() {
    return {
      height: this.props.rows * 24
    };
  },

  componentDidMount: function() {
    this._syncHeightWithShadow();
  },

  getStyles: function() {
    var styles = {
      root: {
        width: '100%',
        resize: 'none',
        overflow: 'hidden',
        font: 'inherit',
        padding: 0,
      }
    };
    return styles;
  },

  render: function() {

    var $__0=
      
      
      
      
      
      
      
      this.props,onChange=$__0.onChange,onHeightChange=$__0.onHeightChange,rows=$__0.rows,style=$__0.style,textareaStyle=$__0.textareaStyle,valueLink=$__0.valueLink,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{onChange:1,onHeightChange:1,rows:1,style:1,textareaStyle:1,valueLink:1});

    var styles = this.getStyles().root;

    var textAreaStyles = {
      width: '100%',
      resize: 'none',
      overflow: 'hidden',
      font: 'inherit',
      padding: 0,
    };

    var inputStyles = this.mergeAndPrefix(styles,{
      height: this.state.height + 'px',
    });

    inputStyles = this.mergeAndPrefix(inputStyles, textareaStyle);


    // Overflow also needed to here to remove the extra row 
    // added to textareas in Firefox.
    var shadowStyles = this.mergeAndPrefix(textAreaStyles, {
      position: 'absolute',
      opacity: 0
    });

    if (this.props.hasOwnProperty('valueLink')) other.value = this.props.valueLink.value;
    if (this.props.disabled) style.cursor = 'default';

    return (
      React.createElement("div", {style: this.props.style}, 
        React.createElement("textarea", {
          ref: "shadow", 
          style: AutoPrefix.all(shadowStyles), 
          tabIndex: "-1", 
          rows: this.props.rows, 
          defaultValue: this.props.defaultValue, 
          readOnly: true, 
          value: this.props.value, 
          valueLink: this.props.valueLink}), 
        React.createElement("textarea", React.__spread({}, 
          other, 
          {ref: "input", 
          style: inputStyles, 
          rows: this.props.rows, 
          style: AutoPrefix.all(inputStyles), 
          onChange: this._handleChange}))
      )
    );
  },

  getInputNode: function() {
    return React.findDOMNode(this.refs.input);
  },

  _syncHeightWithShadow: function(newValue, e) {
    var shadow = React.findDOMNode(this.refs.shadow);
    var currentHeight = this.state.height;
    var newHeight;

    if (newValue !== undefined) shadow.value = newValue;
    newHeight = shadow.scrollHeight;
    
    if (currentHeight !== newHeight) {
      this.setState({height: newHeight});
      if (this.props.onHeightChange) this.props.onHeightChange(e, newHeight);
    }
  },

  _handleChange: function(e) {
    this._syncHeightWithShadow(e.target.value);

    if (this.props.hasOwnProperty('valueLink')) {
      this.props.valueLink.requestChange(e.target.value);
    }

    if (this.props.onChange) this.props.onChange(e);
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value != this.props.value) {
      this._syncHeightWithShadow(nextProps.value);
    }
  }
});

module.exports = EnhancedTextarea;
