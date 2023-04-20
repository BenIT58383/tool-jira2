/**
 * description: handle response
 * created_by: ben
 * created_at: 03/04/2023
 */
const response = (res, data, status, message) => {
  if (status) {
    res.status(status);
  }
  res.json({
    data: data,
    status: status,
    message: message
  });
}

module.exports = {
  response,
}