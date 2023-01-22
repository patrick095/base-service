# Base Service

<legend>Aplicação base para criar um service onde seja necessário utilizar usuários</legend>

### Configurações

-   Renomear o arquivo .env.example para .env
-   Preencher os dados de acordo com o seu banco de dados
-   Rodar o comando npm install

### Comandos

-   npm start
    -   Inicia uma isntância da aplicação
-   npm run dev
    -   Inicia uma instância da aplicação em modo watch
-   npm run build
    -   Faz o build da aplicação na pasta dist
-   npm run prod
    -   Inicia uma instância da aplicação utilizando os arquivos buildados

### Rotas

-   GET - /user/signin

    -   Parâmetros:
        -   username: string
        -   password: string
    -   Resposta (em caso de sucesso):
        -   ```json
            {
                "user": {
                    "_id": "63cd...",
                    "firstName": "João",
                    "lastName": "Silva",
                    "username": "j.silva",
                    "phone": "83999999999"
                },
                "token": {
                    "accessToken": "ey...",
                    "refreshToken": "ey...",
                    "tokenType": "Bearer"
                }
            }
            ```

-   POST - /user/signup

    -   Parâmetros:
        -   firstName: string
        -   lastName: string
        -   username: string
        -   email: string
        -   password: string
        -   phone: string
    -   Resposta (em caso de sucesso):
        -   ```json
            {
                "user": {
                    "_id": "63cd...",
                    "firstName": "João",
                    "lastName": "Silva",
                    "username": "j.silva",
                    "phone": "83999999999"
                },
                "token": {
                    "accessToken": "ey...",
                    "refreshToken": "ey...",
                    "tokenType": "Bearer"
                }
            }
            ```

-   PUT - /user/update

    -   Parâmetros:
        -   firstName: string
        -   lastName: string
        -   \_id: string
    -   Resposta (em caso de sucesso):
        -   ```json
            true
            ```

-   PATCH - /user/update-password

    -   Parâmetros:
        -   id: string
        -   oldPass: string
        -   newPass: string
    -   Resposta (em caso de sucesso):
        -   ```json
            true
            ```

-   GET - /user/refresh-token
    -   Parâmetros:
        -   token: string
    -   Resposta (em caso de sucesso):
        -   ```json
            {
                "accessToken": "ey...",
                "refreshToken": "ey...",
                "tokenType": "Bearer"
            }
            ```
