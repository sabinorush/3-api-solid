# App

GymPass style App.

## Rfs (Requisitos funcionais)

- [x] Deve ser possivel se cadastrar;
- [x] Deve ser possivel se autenticar;
- [x] Deve ser possivel obter o perfil de um usuario logado;
- [ ] Deve ser possivel obter o numero de check-ins realizados pelo usuario logado;
- [ ] Deve ser possivel o usuario obter o seu historico de check-ins;
- [ ] Deve ser possivel o usuario buscar academias proximas;
- [ ] Deve ser possivel o usuario buscar academias pelo nome;
- [x] Deve ser possivel o usuario realizar check-in em uma academia;
- [ ] Deve ser possivel validar o check-in de um usuario;
- [x] Deve ser possivel cadastar uma academia;

## Rns (Regras de negócio)

- [x] O usuario nao deve poder se cadastrar com um email duplicado;
- [x] O usuario nao pode fazer mais de um check-in no mesmo dia;
- [x] O usuario nao pode fazer check-in se nao estiver proximo (100m) da academia;
- [ ] O check-in so pode ser validado ate 20 minutos apos criado;
- [ ] O check-in so pode ser validado por administradores;
- [ ] A academia so pode ser cadastrada por administradores;

## Rnfs (Requisitos não funcionais)

- [x] A senha do usuario precisar estar criptografada;
- [x] Os dados da aplicacao precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por pagina;
- [ ] O usuario deve ser identificado por um JWT (JSON Web Token);