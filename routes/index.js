module.exports = app => {

    const path = app._config.environment.pathBase

    app.get(path+"/", (req, res) => {
        res.status(200).json({ status: `${app._config.environment.name} - RODANDO COM SUCESSO`});
    });

}