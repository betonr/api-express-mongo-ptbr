/**
 * @api {post} /brsos/api/auth/login logando no sistema
 * @apiGroup Autenticação
 * 
 * @apiParam {String} email Email
 * @apiParam {String} password Senha - '[a-zA-Z0-9]{8,30}'
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *    "me": {
 *         "_id": 3asdsaqqe12edwqds,
 *         "name": "beto",
 *         "lastname": "noronha",
 *         "email": "beto@gmail.com",
 *         "level": 2,
 *         "registration": "2017-05-31T03:00:00.000Z",
 *         "lastupdate": "2018-03-07T03:00:00.000Z",
 *         "status": 1
 *     },
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5...",
 *     "messsage": "Autorizado com sucesso"
 * 
 * @apiErrorExample {json} Falha
 *    HTTP/1.1 401 Não Autorizado
 *    "errors": [{
 *            "field": [
 *                  "password"
 *            ],
 *            "messages": [
 *                  "senha incorreta!"
 *            ]
 *    }]
 * 
 *  @apiErrorExample {json} Falha
 *    HTTP/1.1 401 Não Autorizado
 *    "errors": [{
 *            "field": [
 *                  'email','status'
 *            ],
 *            "messages": [
 *                  "Usuário não encontrado ou inativo!"
 *            ]
 *    }]
 */