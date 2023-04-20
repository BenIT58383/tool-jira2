let express = require('express');
let router = express.Router();
let staffService = require('./service');

/**
 * description: create user
 */
router.post('/staffs-jira', function (req, res, next) {
  return staffService.createUser(req, res);
})

/**
 * description: create user
 */
router.post('/staffs-jira/get-list', function (req, res, next) {
  return staffService.getListUser(req, res);
})

/**
 * description: create user
 */
router.get('/staffs-jira/:name', function (req, res, next) {
  return staffService.getDetailUser(req, res);
})

/**
 * description: update user
 */
router.put('/staffs-jira/:name', function (req, res, next) {
  return staffService.updateUser(req, res);
})

/**
 * description: delete user
 */
router.delete('/staffs-jira', function (req, res, next) {
  return staffService.deleteUser(req, res);
})

module.exports = router