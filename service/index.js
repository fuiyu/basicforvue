// const models = require('../models')
// const UserService = require('./user')
// const ActivityService = require('./activity')
const WSManager = require('./wsManager')
const Transceiver = require('./transceiver')

exports.wsManager = new WSManager()
// exports.user = new UserService(models.user, models.relation)
// // exports.activity = new ActivityService(models.activity, exports.user, models.relation, models.timeline)
// exports.activity = new ActivityService(exports.user,exports.wsManager )

exports.transceiver = new Transceiver(exports.wsManager)