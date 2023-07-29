# Beauty Salon

## 💻 Project

<p>
Beauty Salon é uma plataforma prática e conveniente que permite aos usuários agendar e atualizar seus horários de atendimento com facilidade. Além disso, os clientes têm a opção de atualizar suas informações de perfil, garantindo que o salão tenha os dados mais recentes para proporcionar um serviço personalizado. Com esta aplicação, marcar um horário no salão de beleza nunca foi tão simples e acessível.
</p>

## ✨ Technologies used

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Fastify](https://fastify.dev/)
- [Zod](https://zod.dev/)

### Request

<p>User</p>
<span>Create User</span>

```bash
POST /users
```

```bash
{
	"name": "Bruce Wayne",
	"email": "bruce@email.com",
	"password": "123456"
}
```

<span>Return</span>

```bash
{
	"user": {
		"id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"email": "bruce@email.com"
	}
}
```

<span>Update Avatar</span>

```bash
PUT /uploads
```

```bash
{
	"avatar_url": "file",
}
```

<span>Return</span>

```bash
{
	"id": "6b8207be-3be7-48d9-8eea-3789631fded9",
	"name": "Bruce Wayne",
	"email": "bruce@email.com",
	"avatar_url": "http://localhost:3333/uploads/fdf5beb0-acec-4b21-ad92-c1ae25b3c110.jpeg"
}
```

<span>Update User</span>

```bash
PUT /users
```

```bash
{
	"password": "123456",
	"confirm_password": "123456"
}
```

<span>Return</span>

```bash
{
	"user": {
		"id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"email": "bruce@email.com"
	}
}
```

<span>Login</span>

```bash
POST /users/login
```

```bash
{
	"email": "bruce@email.com",
	"password": "123456"
}
```

<span>Return</span>

```bash
{
	"user": {
		"id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"email": "bruce@email.com",
		"avatar_url": "http://192.168.0.103:3333/uploads/9ceabceb-7697-4000-8f78-52cefd858524.jpeg"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGVtYWlsLmNvbSIsInN1YiI6IjZiODIwN2JlLTNiZTctNDhkOS04ZWVhLTM3ODk2MzFmZGVkOSIsImlhdCI6MTY5MDM1MDczOSwiZXhwIjoxNjkwMzUxNjM5fQ.apueEMzCAZS9Y3ZP1cnGzYYI-c7aGYdAk9OF5jhUn6U",
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGVtYWlsLmNvbSIsInN1YiI6IjZiODIwN2JlLTNiZTctNDhkOS04ZWVhLTM3ODk2MzFmZGVkOSIsImlhdCI6MTY5MDM1MDczOSwiZXhwIjoxNjkwOTU1NTM5fQ.YNvSk8RJ-sDWrEeDfy13abrkx8XMzu4HrW2t83guNcg"
}
```

<span>Refresh token</span>

```bash
POST /users/refresh_token
```

```bash
{
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGVtYWlsLmNvbSIsInN1YiI6IjZiODIwN2JlLTNiZTctNDhkOS04ZWVhLTM3ODk2MzFmZGVkOSIsImlhdCI6MTY4OTIzMDE4NSwiZXhwIjoxNjg5ODM0OTg1fQ.YF7SCXeTRuBP7Zi7RkH4Jqy4y1CS0NqHDdLuTZ4fG0k"
}
```

<span>Return</span>

```bash
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGVtYWlsLmNvbSIsInN1YiI6IjZiODIwN2JlLTNiZTctNDhkOS04ZWVhLTM3ODk2MzFmZGVkOSIsImlhdCI6MTY4OTIzMDU0MywiZXhwIjoxNjg5MjMxNDQzfQ.hIhzOWQSrHJUlFetLIEuhUnyh0neCHhSP5QWI3uJAOI",
	"refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImJydWNlQGVtYWlsLmNvbSIsInN1YiI6IjZiODIwN2JlLTNiZTctNDhkOS04ZWVhLTM3ODk2MzFmZGVkOSIsImlhdCI6MTY4OTIzMDU0MywiZXhwIjoxNjg5ODM1MzQzfQ.pvgXp1b1Zr6cfLW-Yva8Nxn-5ctIRILBdkgwyX5QUpw"
}
```

<p>Schedules</p>
<span>Create Schedule</span>

```bash
POST /schedules
```

```bash
{
	"name": "Bruce Wayne",
	"phone": "11 99999-9999",
	"date": "2023-07-13T13:00:00.000Z"
}
```

<span>Return example</span>

```bash
{
	"schedule": {
		"id": "ae906035-acb5-4200-a294-49929433928f",
		"user_id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"phone": "11 99999-9999",
		"date": "2023-07-13T13:00:00.000Z"
	}
}
```

<span>List Schedules</span>

```bash
GET /schedules
```

<small>optional parameter</small>

```bash
{
	"date": "2023-06-24T13:00:00.000Z"
}
```

<span>Return example</span>

```bash
[
	{
		"id": "e50ea7d7-a914-43dd-9fba-b01dc3d8eff7",
		"user_id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"phone": "11 99999-9999",
		"date": "2023-07-26T13:00:00.000Z"
	},
	{
		"id": "b12634c4-7292-46c6-b322-41da18c36815",
		"user_id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"phone": "11991684258",
		"date": "2023-07-26T15:00:00.000Z"
	},
	{
		"id": "ae906035-acb5-4200-a294-49929433928f",
		"user_id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"phone": "11 99999-9999",
		"date": "2023-07-26T20:00:00.000Z"
	}
]
```

<span>Update Schedule</span>

```bash
PUT /schedules/:id
```

```bash
{
	"date": "2023-06-24T13:00:00.000Z"
}
```

<span>Return example</span>

```bash
{
	"schedule": {
		"id": "1b146c8c-54a1-4c31-bdb8-ffb6752c5109",
		"user_id": "6b8207be-3be7-48d9-8eea-3789631fded9",
		"name": "Bruce Wayne",
		"phone": "11 99999-9999",
		"date": "2023-06-24T13:00:00.000Z"
	}
}
```

<span>Update Schedule</span>

```bash
DELETE /schedules/:id
```

<span>Return example</span>

```bash
204 No Content
```

# 🚀 How to run

## clone repository

```bash
git clone https://github.com/Gui-dev/beauty-salon-api
```

## Install dependencies

```bash
npm ci
```

## Run the app

npm run dev
