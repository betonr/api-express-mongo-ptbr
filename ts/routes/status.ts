export default (app, environment): void => {

    app.get(environment.pathBase+"/", (req, res) => {
        res.status(200).json({ status: `${environment.name} - RODANDO COM SUCESSO`});
    });
    
}
