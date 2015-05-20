var React = require('react');
var StylePropable = require('./mixins/style-propable');
var Spacing = require('./styles/spacing');
var DialogWindow = require('./dialog-window');

var Dialog = React.createClass({displayName: "Dialog",

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    title: React.PropTypes.node,
    contentInnerStyle: React.PropTypes.object,
  },

  getStyles: function() {
    var gutter = Spacing.desktopGutter + 'px ';
    var styles = {
      title: {
        margin: 0,
        padding: gutter + gutter + '0 ' + gutter,
        color: this.context.muiTheme.palette.textColor,
        fontSize: '24px',
        lineHeight: '32px',
        fontWeight: '400',
      },
      content: {
        padding: Spacing.desktopGutter
      }
    };
    return styles;
  },

  render: function() {
    var $__0=
      
      
      
      this.props,className=$__0.className,contentInnerStyle=$__0.contentInnerStyle,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{className:1,contentInnerStyle:1});

    var styles = this.getStyles();

    var title;
    if (this.props.title) {
      // If the title is a string, wrap in an h3 tag.
      // If not, just use it as a node.
      title = Object.prototype.toString.call(this.props.title) === '[object String]' ?
        React.createElement("h3", {style: styles.title}, this.props.title) :
        this.props.title;
    }

    return (
      React.createElement(DialogWindow, React.__spread({}, 
        other, 
        {ref: "dialogWindow", 
        className: className, 
        style: this.props.style}), 

        title, 

        React.createElement("div", {ref: "dialogContent", style: this.mergeAndPrefix(styles.content, contentInnerStyle)}, 
          this.props.children
        )

      )
    );
  },

  dismiss: function() {
    this.refs.dialogWindow.dismiss();
  },

  show: function() {
    this.refs.dialogWindow.show();
  }

});

module.exports = Dialog;
