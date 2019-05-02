const {commentRepository} = require('../../dataAccess/repositories');

class CommentService {
    addComment(user, comment) {
        return commentRepository.addComment({
            ...comment,
            userId: user.id
        });
    }

    getComments(brewId, paginationParams) {
        return commentRepository.getCommentsByBrewId(brewId, paginationParams);
    }
}

module.exports = new CommentService();
