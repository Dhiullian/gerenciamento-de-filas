import express from 'express'; 

const app = express();

app.use(express.json());

// Rota: Endereço completo da requisição
// Recurso: Qual entidade estamos acessando do sistema

// GET: Busca uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualiza uma informação existente no back-end
// DELETE: Remove uma informação no back-end

// Request param: parametros que vem na própria rota que identificam um recurso
// Query param: parametros que vem na propria rota geralmente opcionais para filtros, paginação
// Request Body: parametros para criação/atualização de informações

// SELECT * FROM users where name = 'Diego'
// knex ('users').where('name','Diego').select('*')

const users = [
    'Dhiullian',
    'Diego',
    'Cleiton',
    'Robson',
    'Daniel'
];

app.get('/users',(request,response) =>{
    const search = String(request.query.search);

    console.log(search);

    const filteredUsers = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filteredUsers);
    
});

app.get('/users/:id',(request,response)=>{
    const id = Number(request.params.id);

    const user = users[id];
    return response.json(user);
})

app.post('/users',(request,response)=>{
    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        email: data.email
    };

    return response.json(user);
})

app.listen(3333);