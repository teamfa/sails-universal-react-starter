
module.exports = function (req, res, next) {
    console.log('all routes policy');
    req.react.props.user = {
        joe: 'bloggs'
    };

    next();
};