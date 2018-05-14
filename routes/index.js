module.exports = (app, environment) => {

    require('./status')(app, environment)
    require('./auth')(app, environment)
    require('./user')(app, environment)

}