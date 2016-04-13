
module.exports = function (req, res, next) {
    console.log('Article route policy');

    req.react.props.articles = [
        1,
        2,
        3,
        4,
        5,
        7
    ];

    next();
};