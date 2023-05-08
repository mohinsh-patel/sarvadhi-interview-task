const playerController = require('../controllers/playerController');
const teamController=require('../controllers/teamController')

module.exports = function (app) {
    app.route('/getPlayerList').get(playerController.getPlayerList);
    app.route('/addEditPlayer').post(playerController.addEditPlayer);
    app.route('/deletePlayer').post(playerController.deletePlayer);

    app.route('/getTeamList').get(teamController.getTeamList);
    app.route('/addEditTeam').post(teamController.addEditTeam);
    app.route('/deleteTeam').post(teamController.deleteTeam);



}
