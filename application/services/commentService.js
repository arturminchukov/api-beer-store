const {commentRepository} = require('../../dataAccess/repositories');

class CommentService {
    addComment(user, comment) {
        return commentRepository.addComment(user.id, comment);
    }

    getComments(brewId, paginationParams) {
        return commentRepository.getCommentsByBrewId(brewId, paginationParams);
    }
}

module.exports = new CommentService();
