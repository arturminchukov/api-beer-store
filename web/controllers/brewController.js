const {brewService} = require('../../application/services');

class BrewController {
    async getBrews(req, res) {
        const paginationParams = req.query;

        const paginatedBrews = await brewService.getBrews(paginationParams);

        res.status(200)
            .send(paginatedBrews);
    }

    async getBrew(req, res) {
        const brewId = req.params.id;

        const brew = await brewService.getBrew(brewId);

        res.status(200)
            .send(brew);
    }

    async addBrew(req, res) {
        const brewModel = req.body;

        const addedBrew = await brewService.addBrew(brewModel);

        res.status(200)
            .send(addedBrew);
    }
}

module.exports = new BrewController();
