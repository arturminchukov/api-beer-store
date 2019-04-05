const {commentService} = require('../../application/services');

class CommentController {
    async addComment(socket, data, response) {
        const {comment} = data;
        const {user} = data.locals;

        const addedComment = await commentService.addComment(user, comment);

        response.payload = addedComment;
        socket.emit('add comment', response);
    }

    async getComments(socket, data, response) {
        const {brewId, ...paginationParams} = data.params;
        const paginatedComments = await commentService.getComments(brewId, paginationParams);

        response.payload = paginatedComments;

        socket.emit('get comments', response);
    }
}

module.exports = new CommentController();
