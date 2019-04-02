const {commentService} = require('../../application/services');

class CommentController {
    addComment(socket, comment) {
        commentService.addComment(comment);
    }

    getComments(params) {
        commentService.getComments(params);
    }
}

module.exports = new CommentController();
