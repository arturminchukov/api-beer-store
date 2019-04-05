const BaseRepository = require('./baseRepository');
const {commentModel} = require('../models');
const sequelizeInstance = require('../getSequelize');

class CommentRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, commentModel.name);
    }

    async addComment(userId, comment) {
        try {
            const addedComment = await this.model.create({
                userId,
                ...comment
            });

            return addedComment.dataValues;
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
    }

    async getCommentsByBrewId(brewId, paginationParams) {
        let databasePaginationParams = null;

        if (paginationParams) {
            databasePaginationParams = this._getDatabasePaginationParams(paginationParams);
        }

        try {
            const {rows: comments, count} = await this.model.findAndCountAll({
                where: {
                    brewId
                },
                raw: true,
                ...databasePaginationParams
            });

            return this._performPaginatedData(comments, count, paginationParams);
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
    }
}

module.exports = new CommentRepository(sequelizeInstance);
