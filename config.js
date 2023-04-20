

module.exports = {
  createCommand: `"cn=$userName,OU=$roleUser,dc=techasians,dc=com" -UPN $companyEmail -fn $firstName -ln $lastMidName -pwd $password`,
  getListCommand: `config.getListCommand`,
  getDetailCommand: `getDetailCommand`,
  updateCommand: `updateCommand`,
  deleteCommand: `Remove-LocalUser -name "$userName"`,
  status: {
    success: 1,
    failed: 0
  },
  httpStatus: {
    success: 200,
    created: 201,
    notfound: 404,
    badRequest: 400,
    conflict: 409
  },
  port: process.env.PORT
}