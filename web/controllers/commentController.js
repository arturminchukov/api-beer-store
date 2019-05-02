const {commentService} = require('../../application/services');

class CommentController {
    async addComment(socket, req, response) {
        const {comment} = req;
        const {user} = socket.locals;

        const addedComment = await commentService.addComment(user, comment);

        response.payload = addedComment;
        socket.emit('addedComment', response);
    }

    async getComments(socket, req, response) {
        const {brewId, ...paginationParams} = req.params;
        const paginatedComments = await commentService.getComments(brewId, paginationParams);

        response.payload = paginatedComments;

        socket.emit('gotComments', response);
    }
}

module.exports = new CommentController();
