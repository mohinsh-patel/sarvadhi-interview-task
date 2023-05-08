const mld_team = require('../models/mldTeam');
const commonHelper = require('../helpers/commonHelper')
const language = require('../config/language')


const addEditTeam = async (req, res) => {
    try {
        let bodyData = req.body
        let result = await mld_team.addEditTeam(bodyData)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        res.send({ status: "false", "message": language.Unable_TO_ADD_EDIT })
    }
}

const deleteTeam = async (req, res) => {
    try {
        let bodyData = req.body
        let result = await mld_team.deleteTeam(bodyData)
        res.send(result)
        
    } catch (err) {
        console.log(err)
        res.send({ status: "false", "message": language.Unable_TO_Delete_Team })
    }
}

const getTeamList = async (req, res) => {
    try {
        let bodyData = req.body
        let result = await mld_team.getTeamList(bodyData)
        let teamList = result.data

        let teamIdArray=[]

        if (teamList.length > 0) {
            for (let i in teamList) {
                teamIdArray.push(teamList[i].team_id)
            }

            let detail={
                tbl_name:'tbl_player',
                where_condition: `WHERE team_id IN (${teamIdArray})`
            }

            let getplayer = await commonHelper.searchData(detail)
            if ((getplayer.data).length > 0) {
                for (let i in teamList) {
                    let playerArray = [];
                    for (let j in getplayer.data) {
                        if (teamList[i].team_id == getplayer.data[j].team_id) {
                            playerArray.push(getplayer.data[j])
                        }
                    }
                    teamList[i].player_array = playerArray
                }
            }

            res.send(result)
        }

        } catch (err) {
            console.log(err)
            res.send({ status: "false", "message": language.Unable_To_Get_Team })
    }
}

module.exports = {
addEditTeam,
deleteTeam,
getTeamList
}