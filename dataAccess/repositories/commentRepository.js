const BaseRepository = require('./baseRepository');
const {commentModel} = require('../models');
const sequelizeInstance = require('../getSequelize');

class CommentRepository extends BaseRepository {
    constructor(sequelize) {
        super(sequelize, commentModel.name);
    }

    async addComment(comment) {
        try {
            const addedComment = await this.model.create(comment);

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
                include: {
                    model: this.sequelize.models.user,
                    attributes: ['email', 'id', 'firstName', 'lastName']
                },
                ...databasePaginationParams
            });

            return this._paginateData(comments, count, paginationParams);
        } catch (error) {
            this._baseErrorHandler(error);

            throw error;
        }
    }
}

module.exports = new CommentRepository(sequelizeInstance);
