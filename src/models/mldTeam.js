const sql = require('../helpers/db');
// const language = require('../config/language')


const getTeamList = (data) => {
    return new Promise((resolve, reject) => {

        let {team_id}=data

        let whereCondition = "WHERE 1=1 ";
        let values = [];

        if (team_id) {
            whereCondition += " AND team_id = ? "
            values.push(team_id)
        }

        // let getQuery = "SELECT tt.*, " +
        //     "FROM tbl_team as tt " +
        //     "LEFT JOIN tbl_player as tp ON tp.team_id = tt.team_id " +
        //     whereCondition +
        //     " GROUP BY tt.team_id "

        let query=`SELECT * FROM tbl_team ${whereCondition}`

        sql.query(query, values, (err, result) => {
            if (err) {
                console.log("error", err)
                reject(err)
            } else {
                if (result == "") {
                    resolve({ status: false, message: "No data found", data: [], total_record: 0 })
                } else {
                    resolve({ status: true, message: "Get data successfully", data: result })
                }

            }
        });
    });
}

const addEditTeam = (data) => {
    return new Promise((resolve, reject) => {

        let showMessage = "";

        let addEditQuery = "";
        let values = [];

        if (data.action_type == "edit") {
            addEditQuery += "UPDATE tbl_team SET name=?,updated_at= NOW() WHERE team_id=?";
            values.push(data.name, data.team_id);
            showMessage += "Data updated successfully"

        } else {

            addEditQuery = "INSERT INTO tbl_team(name, created_at, updated_at) VALUES (?,NOW(),NOW())"
            values = [data.name]
            showMessage += "Data inserted successfully"

        }

        sql.query(addEditQuery, values, (err, res) => {
            if (err) {
                console.log("error", err)
                reject(err)
            } else {
                console.log(showMessage);
                resolve({ status: true, message: showMessage });
            }
        })

    })
}

const deleteTeam = (data) => {
    return new Promise((resolve, reject) => {
        
        let query = `DELETE FROM tbl_team WHERE team_id=${data.team_id}`
        sql.query(query, (err, result) => {
            if (err) {
                console.log("error", err)
                reject(err)
            } else {
                resolve({ status: true, message: "Data deleted successfully" })
            }
        });
    })
}

module.exports = {
  
    addEditTeam,
    deleteTeam,
    getTeamList
}