const { exec } = require('child_process');
const config = require('../../config')
const helpers = require('../../helpers/common');

/**
 * description: create user 
 * createdBy: DVBen(03/04/2023)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createUser = async (req, res) => {
  try {

    let body = req.body

    //handle command
    const command = config.createCommand.replace('$userName', body.user_name)
    .replace('$roleUser', body.role)
    .replace('$companyEmail', body.company_email)
    .replace('$firstName', body.first_name)
    .replace('$lastMidName', body.last_mid_name)
    .replace('$password', body.password)

    //create data
    exec(command, (error, stdout, stderr) => {
      if (error) {
        helpers.response(res, error, config.httpStatus.badRequest, req.__('user.create.failed'))
        console.error(`exec error: ${error}`);
        return;
      }

      if (stderr) {
        helpers.response(res, stderr, config.httpStatus.badRequest, req.__('user.create.failed'))
        console.error(`stderr: ${stderr}`);
        return
      }

      console.log('stdout:', stdout);
      helpers.response(res, stdout, config.httpStatus.success, req.__('user.create.success'))
    });
  } catch (e) {
    console.log(error);
  }
}

/**
 * description: get list user 
 * createdBy: DVBen(03/04/2023)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getListUser = async (req, res) => {
  try {
    helpers.response(res, config.getListCommand, config.httpStatus.success, req.__('user.find.success'))
    return
    // return 'ờ'
    //get data
    exec(config.getListCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      if (stderr) {
        helpers.response(res, stderr, config.httpStatus.badRequest, req.__('user.find.failed'))
        console.error(`stderr: ${stderr}`);
        return
      }

      helpers.response(res, stdout, config.httpStatus.success, req.__('user.find.success'))
    });
  } catch (error) {
    console.log(error);
  }
}

/**
 * description: get detail user 
 * createdBy: DVBen(03/04/2023)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const getDetailUser = async (req, res) => {
  try {
    let userName = req.params["name"]

    //handle command
    config.getDetailCommand.replace('$userName', userName)

    //get data
    exec(config.getDetailCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      if (stderr) {
        helpers.response(res, stderr, config.httpStatus.badRequest, req.__('user.find.failed'))
        console.error(`stderr: ${stderr}`);
        return
      }

      helpers.response(res, stdout, config.httpStatus.success, req.__('user.find.success'))
    });
  } catch (e) {
    console.log(error);
  }
}

const handleUpdate = async (body) => {
  try {
    //handle update
    let result = {}

    //handle command


    //update
    exec(config.updateCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        result.isUpdate = false
        return;
      }
      console.log(`stdout: ${stdout}`);
      if (stdout) {
        result.isUpdate = true
        result.message = stdout
      } else {
        result.isUpdate = false
        result.message = stderr
      }
    });

    //return result
    return result
  } catch (error) {
    console.log(error);
  }
}

/**
 * description: update user 
 * createdBy: DVBen(03/04/2023)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateUser = async (req, res) => {
  try {
    let userName = req.params["name"]
    let body = req.body

    //handle command
    config.getDetailCommand.replace('$userName', userName)

    exec(config.getDetailCommand, async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      //handle update when data exist
      if (stdout) {
        const dataUpdate = await handleUpdate(body)

        if (dataUpdate.isUpdate) {
          console.log(`update success: ${dataUpdate.message}`);
          helpers.response(res, stdout, config.httpStatus.success, req.__('user.update.success'))
        } else {
          helpers.response(res, stdout, config.httpStatus.badRequest, req.__('user.update.failed'))
          console.log(`update error: ${dataUpdate.message}`);
        }
      }

      console.error(`stderr: ${stderr}`);
    });
  } catch (e) {
    console.log(error);
  }
}

const handleDelete = async (userName) => {
  try {
    //handle update
    let isDelete = false

    //handle command
    config.deleteCommand.replace('$userName', userName)

    //update
    exec(config.deleteCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      isDelete = true
    });

    //return result
    return isDelete
  } catch (error) {
    console.log(error);
  }
}

/**
 * description: delete user 
 * createdBy: DVBen(03/04/2023)
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteUser = async (req, res) => {
  try {
    let listUserName = req.body["list_user_name"]
    let count = 0
    let isDelete = false

    if (listUserName && listUserName.length) {
      for (let name of listUserName) {
        // let isDataExist = false
        //handle command
        const command = config.getDetailCommand.replace('$userName', name)

        exec(command, async (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }

          if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
          }

          //handle update when data exist
          // isDataExist = true
          isDelete = await handleDelete(name)
        });

        if (isDelete) {
          count++
        }
      }

      if(isDelete){
        helpers.response(res, config.status.success, config.httpStatus.success, `Đã xóa thành công ${count}/${listUserName.length}`)
      }else{
        helpers.response(res, config.status.failed, config.httpStatus.badRequest, req.__('user.delete.failed'))
      }
    }
  } catch (error) {
    console.log(error);
    helpers.response(res, config.status.failed, config.httpStatus.badRequest, req.__('system.error'))
  }
}



module.exports = {
  createUser,
  getListUser,
  getDetailUser,
  updateUser,
  deleteUser
}
