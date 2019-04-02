const applySocketMiddleware = require('../applySocketMiddleware');
const {commentController} = require('../controllers');
const {socketRouterWrapper: routerWrapper} = require('../routerWrapper');

const {socketAuthenticationMiddleware, socketErrorHandleMiddleware} = require('../middlewares');
const {validationMiddlewareFactory, validationSchemes} = require('../validation');

const {getCommentsValidationSchema, addCommentValidationSchema} = validationSchemes;
const {socketValidationMiddlewareFactory} = validationMiddlewareFactory;

const getCommentsValidationMiddleware = socketValidationMiddlewareFactory(getCommentsValidationSchema);
const addCommentsValidationMiddleware = socketValidationMiddlewareFactory(addCommentValidationSchema);

const wrappedAddComment = routerWrapper(commentController.addComment);
const wrappedGetComments = routerWrapper(commentController.getComments);

const commentRouter = function (socket) {
    const applyMiddleware = applySocketMiddleware(socket, socketErrorHandleMiddleware);

    socket.on('add comment', applyMiddleware(getCommentsValidationMiddleware, socketAuthenticationMiddleware, wrappedAddComment));
    socket.on('get comments', applyMiddleware(addCommentsValidationMiddleware, socketAuthenticationMiddleware, wrappedGetComments));
};

module.exports = commentRouter;
