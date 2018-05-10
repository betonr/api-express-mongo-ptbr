/**
 * @api {get} /brsos/api/user/:id pegando json com as informações do usuário
 * @apiGroup Usuário
 *
 * @apiHeader Authentication {String} Token para autorização
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiParam {Integer} id ID único do usuário
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *      {
 *          "user": {
 *              "_id": 3asdsaqqe12edwqds,
 *              "name": "beto",
 *              "lastname": "noronha",
 *              "email": "beto@gmail.com", 
 *              "password": null,
 *              "level": 2,
 *              "registration": "2017-05-31T03:00:00.000Z",
 *              "lastupdate": "2018-03-07T03:00:00.000Z",
 *              "status": true
 *          }
 *      }
 * 
 * @apiErrorExample {json} Falha
 *    HTTP/1.1 404 Usuário não encontrado
 *       {
 *           "errors": [
 *               {
 *                   "field": [
 *                       "id"
 *                   ],
 *                   "message": [
 *                       "Usuário não encontrado"
 *                   ]
 *               }
 *           ]
 *       }
 * 
 * @apiErrorExample {json} Falha na autorização
 *    HTTP/1.1 401 Não autorizado
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }
 */  

/**
 * @api {get} /brsos/api/users/ get json with users information
 * @apiGroup Usuário
 *
 * @apiHeader Authentication {String} Token para autorização
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiSuccessExample {json} Sucess
 *    HTTP/1.1 200 OK
 *    {
 *      "users": [
 *          {
 *              "_id": 3asdsaqqe12edwqds,
 *              "name": "beto",
 *              "lastname": "noronha",
 *              "password": null,
 *              "email": "beto@gmail.com", 
 *              "level": 2,
 *              "registration": "2017-05-31T03:00:00.000Z",
 *              "lastupdate": "2018-03-07T03:00:00.000Z",
 *              "status": true
 *          },
 *          {
 *              ...
 *          }
 *      ]
 *    }
 * 
 * @apiErrorExample {json} Falha na autorização
 *    HTTP/1.1 401 Não autorizado
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }
 */  

/**
 * @api {post} /brsos/api/user/register adicionando usuário no banco de dados
 * @apiGroup Usuário
 * 
 * @apiparam {String} name nome do usuário
 * @apiparam {String} email e-mail do usuário
 * @apiparam {String} lastname sobrenome do usuário
 * @apiparam {Integer} level level do usuário (1,2,3)
 * @apiparam {String} password senha do usuário (/[a-zA-Z0-9]{8,30}/)
 * @apiparam {Integer} status=true status do usuário (true, false) não obrigatório
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "id": 16
 *      }   
 * 
 * @apiErrorExample {json} informações incompletas
 *    HTTP/1.1 400 bad request - incompleto
 *    {
 *      "status": 400,
 *      "statusText": "Bad Request",
 *      "errors": [
 *          {
 *              "field": [
 *                  "name"
 *              ],
 *              "location": "body",
 *              "messages": [
 *                 "\"name\" is required"
 *              ],
 *              "types": [
 *                 "any.required"
 *              ]
 *          },
 *          {
 *              ...
 *          }
 *   }
 */

 /**
 * @api {put} /brsos/api/user/update Alterando um usuário no banco de dados
 * @apiGroup Usuário
 *
 * @apiHeader Authentication {String} Token para autorização
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * 
 * @apiparam {Integer} id id do usuário
 * @apiparam {String} name nome do usuário
 * @apiparam {String} email e-mail do usuário
 * @apiparam {String} lastname sobrenome do usuário
 * @apiparam {Integer} level level do usuário (1,2,3)
 * @apiparam {String} password senha do usuário (/[a-zA-Z0-9]{8,30}/)
 * @apiparam {Integer} status=true status do usuário (true, false) não obrigatório
 * 
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK 
 * 
 * @apiErrorExample {json} Falha na autorização
 *    HTTP/1.1 401 Não autorizado
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }}
 * @apiErrorExample {json} Não autorizado
 *    HTTP/1.1 403 só pode alterar se for 'admin' ou mudando as próprias informações
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "Você precisa ser administrador"
 *        }] 
 *   }
 * @apiErrorExample {json} informações incompletas  
 *    HTTP/1.1 400 bad request - incompleto
 *    {
 *      "status": 400,
 *      "statusText": "Bad Request",
 *      "errors": [
 *          {
 *              "field": [
 *                  "name"
 *              ],
 *              "location": "body",
 *              "messages": [
 *                 "\"name\" is required"
 *              ],
 *              "types": [
 *                 "any.required"
 *              ]
 *          },
 *          {
 *              ...
 *          }
 *   }
 */

/**
 * @api {delete} /brsos/api/user/delete/:id deletando um usuário no banco de dados
 * @apiGroup Usuário
 *
 * @apiHeader Authentication {String} Token para autorização
 * @apiHeaderExample {json} Header
 *    { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5..." }
 * @apiParam {Integer} id id do usuário
 * @apiSuccessExample {json} Sucesso
 *    HTTP/1.1 200 OK
 *      {
 *          "success": true
 *      }
 * 
 * @apiErrorExample {json} Falha
 *    HTTP/1.1 404 Usuário não encontrado
 *       {
 *           "errors": [
 *               {
 *                   "field": [
 *                       "id"
 *                   ],
 *                   "message": [
 *                       "Usuário não encontrado"
 *                   ]
 *               }
 *           ]
 *       }
 * 
 * @apiErrorExample {json} Falha na autorização
 *    HTTP/1.1 401 Não autorizado
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "Você não tem permissão para acessar esse recurso"
 *        }]
 *    }}
 * @apiErrorExample {json} Não autorizado
 *    HTTP/1.1 403 só pode alterar se for 'admin' ou mudando as próprias informações
 *    {
 *        "error": [{
 *              field: ['_id'],
 *              message: "Você precisa ser administrador"
 *        }] 
 *   }
 */