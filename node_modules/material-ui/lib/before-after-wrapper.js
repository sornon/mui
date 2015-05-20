var React = require('react');
var StylePropable = require('./mixins/style-propable');
var AutoPrefix = require('./styles/auto-prefix');

/**  
 *  BeforeAfterWrapper
 *    An alternative for the ::before and ::after css pseudo-elements for 
 *    components whose styles are defined in javascript instead of css.
 *
 *  Usage: For the element that we want to apply before and after elements to,
 *    wrap its children with BeforeAfterWrapper. For example:
 *
 *                                            <Paper>
 *  <Paper>                                     <div> // See notice
 *    <BeforeAfterWrapper>        renders         <div/> // before element
 *      [children of paper]       ------>         [children of paper]
 *    </BeforeAfterWrapper>                       <div/> // after element
 *  </Paper>                                    </div>
 *                                            </Paper>
 *
 *  Notice: Notice that this div bundles together our elements. If the element 
 *    that we want to apply before and after elements is a HTML tag (i.e. a 
 *    div, p, or button tag), we can avoid this extra nesting by passing using 
 *    the BeforeAfterWrapper in place of said tag like so:
 *
 *  <p>
 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
 *      [children of p]          ------>         [children of p]
 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper> 
 *  </p>
 *
 *  BeforeAfterWrapper features spread functionality. This means that we can 
 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
 *
 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement 
 *  and afterElement have a defined style position.
 */  

var BeforeAfterWrapper = React.createClass({displayName: "BeforeAfterWrapper",

  mixins: [StylePropable],

  propTypes: {
    beforeStyle: React.PropTypes.object,
    afterStyle: React.PropTypes.object,
    beforeElementType: React.PropTypes.string,
    afterElementType: React.PropTypes.string,
    elementType: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      beforeElementType: 'div',
      afterElementType: 'div',
      elementType: 'div',
    }
  },

  render: function() {

    var $__0=
      
      
      
      
      
      
      this.props,beforeStyle=$__0.beforeStyle,afterStyle=$__0.afterStyle,beforeElementType=$__0.beforeElementType,afterElementType=$__0.afterElementType,elementType=$__0.elementType,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{beforeStyle:1,afterStyle:1,beforeElementType:1,afterElementType:1,elementType:1});

    var beforeElement, afterElement;
    
    beforeStyle = AutoPrefix.all({boxSizing: 'border-box'});
    afterStyle = AutoPrefix.all({boxSizing: 'border-box'});

    if (this.props.beforeStyle) beforeElement = 
      React.createElement(  this.props.beforeElementType, 
                            {style: this.mergeAndPrefix(beforeStyle, this.props.beforeStyle), 
                            key: "::before"}  );
    if (this.props.afterStyle) afterElement = 
      React.createElement(  this.props.afterElementType, 
                            {style: this.mergeAndPrefix(afterStyle, this.props.afterStyle), 
                            key: "::after"}   );

    var children = [beforeElement, this.props.children, afterElement];
    
    var props = other;
    props.style = this.props.style;

    return React.createElement(this.props.elementType, props, children);
  }

});

module.exports = BeforeAfterWrapper;