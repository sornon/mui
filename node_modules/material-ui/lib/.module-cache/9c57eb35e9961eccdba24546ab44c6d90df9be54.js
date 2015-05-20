var React = require('react');
var DateTime = require('../utils/date-time');
var IconButton = require('../icon-button');
var NavigationChevronLeft = require('../svg-icons/navigation-chevron-left');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var SlideInTransitionGroup = require('../transition-groups/slide-in');

var CalendarToolbar = React.createClass({displayName: "CalendarToolbar",

  propTypes: {
    displayDate: React.PropTypes.object.isRequired,
    onLeftTouchTap: React.PropTypes.func,
    onRightTouchTap: React.PropTypes.func,
    maxDate: React.PropTypes.object,
    minDate: React.PropTypes.object
  },

  getDefaultProps: function () {
      return {
        maxDate: null,
        minDate: null
      };
  },

  getInitialState: function() {
    return {
      transitionDirection: 'up'
    };
  },

  componentWillReceiveProps: function(nextProps) {
    var direction;

    if (nextProps.displayDate !== this.props.displayDate) {
      direction = nextProps.displayDate > this.props.displayDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction
      });
    }
  },
  _isDisabled: function(direction){
    
    var date = this.props.displayDate;
    var minDate = this.props.minDate;
    var maxDate = this.props.maxDate;

    if(direction == "left" && minDate){      
      if(date.getFullYear() < minDate.getFullYear()) return true;
      if(date.getFullYear() == minDate.getFullYear()){
        return date.getMonth() <= minDate.getMonth();
      }
    }else if(direction == "right" && maxDate){
      if(date.getFullYear() > maxDate.getFullYear()) return true;
      if(date.getFullYear() == maxDate.getFullYear()){
        return date.getMonth() >= maxDate.getMonth();
      }
    }

    return false;
  },
  render: function() {
    var month = DateTime.getFullMonth(this.props.displayDate);
    var year = this.props.displayDate.getFullYear();
    var styles = {
      root: {
        height: '48px',
        position: 'relative'
      },

      buttonLeft: {
        position: 'absolute',
        left: '0px',
        top: '0px'
      },

      buttonRight: {
        position: 'absolute',
        right: '0px',
        top: '0px'
      },

      title: {
        position: 'absolute',
        top: '17px',
        lineHeight: '14px',
        fontSize: '14px',
        height: '14px',
        width: '100%',
        fontWeight: '500',
        textAlign: 'center',
      }
    };
    var disableLeft = this._isDisabled("left");
    var disableRight = this._isDisabled("right");

    return (
      React.createElement("div", {style: styles.root}, 

        React.createElement(SlideInTransitionGroup, {
          style: styles.title, 
          direction: this.state.transitionDirection}, 
          React.createElement("div", {key: month + '_' + year}, month, " ", year)
        ), 

        React.createElement(IconButton, {
          style: styles.buttonLeft, 
          disabled: disableLeft, 
          onTouchTap: this.props.onLeftTouchTap}, 
            React.createElement(NavigationChevronLeft, null)
        ), 

        React.createElement(IconButton, {
          style: styles.buttonRight, 
          disabled: disableRight, 
          onTouchTap: this.props.onRightTouchTap}, 
            React.createElement(NavigationChevronRight, null)
        )

      )
    );
  }

});

module.exports = CalendarToolbar;
