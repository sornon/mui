var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var mui = require('material-ui');
var Colors = mui.Styles.Colors;
var Typography = mui.Styles.Typography;
var ThemeManager = new mui.Styles.ThemeManager();

var { AppBar, AppCanvas, Menu, IconButton } = mui;

class Master extends React.Component {

    constructor() {
        super();
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        }
    }

    getStyles() {
        var darkWhite = Colors.darkWhite;
        return {
            footer: {
                backgroundColor: Colors.grey900,
                textAlign: 'center'
            },
            a: {
                color: darkWhite
            },
            p: {
                margin: '0 auto',
                padding: '0',
                color: Colors.lightWhite,
                maxWidth: '335px'
            },
            iconButton: {
                color: darkWhite
            }
        };
    }

    render() {
        var styles = this.getStyles();
        var title =
            this.context.router.isActive('get-started') ? 'Get Started' :
            this.context.router.isActive('customization') ? 'Customization' :
            this.context.router.isActive('components') ? 'Components' : '';

        var githubButton = (
            <IconButton
                iconStyle={styles.iconButton}
                iconClassName="muidocs-icon-custom-github"
                href="https://github.com/callemall/material-ui"
                linkButton={true} />
        );

        return (
            <AppCanvas predefinedLayout={1}>

                <AppBar
                    title={title}
                    zDepth={0}
                    iconElementRight={githubButton}/>

                <RouteHandler />

            </AppCanvas>
        );
    }
}

Master.contextTypes = {
    router: React.PropTypes.func
};

Master.childContextTypes = {
    muiTheme: React.PropTypes.object
};

module.exports = Master;
