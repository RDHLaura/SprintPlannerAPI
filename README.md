# API REST SprintPlanner

Base url: [https://sprint-planner-api.onrender.com/api/v1](https://sprint-planner-api.onrender.com)

```json
GET https://sprint-planner-api.onrender.com/api/v1/
```

```json
{
	"proyectos" : "https://sprint-planner-api.onrender.com/api/v1/proyectos", 
	"tareas" : "https://sprint-planner-api.onrender.com/api/v1/tareas"	
}
```

## Paginación:

La API automáticamente devuelve los datos paginados. Cada respuesta contendrá un objeto “pagination” y un objeto “content” que contiene un array con 10 objetos.

```json
{
	"pagination": {
        "totalPages": 3,
        "actualPage": 1,
        "next": "http://localhost:3001/api/v1/tareas?page=2",
        "actual": "http://localhost:3001/api/v1/tareas?page=1",
        "previous": null
    },
	"content": [
		//...
		]
}
```

 

Puedes acceder a una página específica con el parámetro ‘page’. Si no se especifica nada la API devolverá por defecto la primera página.

```json
GET: https://sprint-planner-api.onrender.com/api/v1/proyectos?page=2
```

```json
{
    "pagination": {
        "totalPages": 4,
        "actualPage": 2,
        "next": "http://localhost:3001/api/v1/proyectos?page=3",
        "actual": "http://localhost:3001/api/v1/proyectos?page=2",
        "previous": "http://localhost:3001/api/v1/proyectos?page=1"
    },
    "content": [
        {
            "id": "11",
            "titulo": "Proyecto 11",
            "descripcion": "Este es el proyecto número 11",
            "miembros": [
                2,
                5
            ],
            "creador": 5
        },
        {
            "id": "12",
            "titulo": "Proyecto 12",
            "descripcion": "Este es el proyecto número 12",
            "miembros": [
                1,
                3,
                6
            ],
            "creador": 6
        },
		//...
	]
}
```

## Peticiones GET:

### Proyectos:

La API también admite un filtro para búsquedas de los proyectos en los que participe o sea creador un usuario concreto. Para ello se usa el parámetro ‘user’. 

```json
GET: https://sprint-planner-api.onrender.com/api/v1/proyectos?page=2&&user=1
```

```json
{
    "pagination": {
        "totalPages": 3,
        "actualPage": 2,
        "next": "http://localhost:3001/api/v1/proyectos?page=3&user=1",
        "actual": "http://localhost:3001/api/v1/proyectos?page=2&user=1",
        "previous": "http://localhost:3001/api/v1/proyectos?page=1&user=1"
    },
    "content": [
        {
            "id": "18",
            "titulo": "Proyecto 18",
            "descripcion": "Este es el proyecto número 18",
            "miembros": [
                1,
                4,
                5,
                6,
                7
            ],
            "creador": 5
        },
        {
            "id": "20",
            "titulo": "Proyecto 20",
            "descripcion": "Este es el proyecto número 20",
            "miembros": [
                1,
                2,
                3,
                4,
                5,
                6,
                7
            ],
            "creador": 1
        },
		//...
	]
}
```

Puedes seleccionar un proyecto concreto. 

```json
GET http://localhost:3001/api/v1/proyectos/1
```

```json
{
    "id": "1",
    "titulo": "Proyecto 1",
    "descripcion": "Este es el primer proyecto",
    "miembros": [
        1,
        2,
        3
    ],
    "creador": 1
}
```

## Tareas:

Las tareas se pueden filtrar por el proyecto al que pertenecen mediante el parámetro ‘proyecto’

```json
GET: https://sprint-planner-api.onrender.com/api/v1/tareas?proyecto=1
```

```json
{
    "pagination": {
        "totalPages": 1,
        "actualPage": 1,
        "next": null,
        "actual": "http://localhost:3001/api/v1/tareas?page=1&proyecto=1",
        "previous": null
    },
    "content": [
        {
            "id": 1,
            "titulo": "Tarea 1",
            "asignada_a": 1,
            "descripcion": "Desarrollar la funcionalidad de inicio de sesión",
            "fecha_entrega": "2023-03-01",
            "id_proyecto": 1,
            "estado": "no-empezado"
        },
        {
            "id": 2,
            "titulo": "tarea 2",
            "asignada_a": 2,
            "descripcion": "Diseñar la página de perfil de usuario",
            "fecha_entrega": "2023-03-15",
            "id_proyecto": 1,
            "estado": "en-proceso"
        },
		//...
	]
}
```

Puedes seleccionar una tarea concreta. 

```json
GET http://localhost:3001/api/v1/tareas/1
```

```json
{
    "id": 1,
    "titulo": "Tarea 1",
    "asignada_a": 1,
    "descripcion": "Desarrollar la funcionalidad de inicio de sesión",
    "fecha_entrega": "2023-03-01",
    "id_proyecto": 1,
    "estado": "no-empezado"
}
```

## Peticiones POST:

Puedes crear nuevas tareas o proyectos mediante una petición POST que tenga en el cuerpo de la petición el siguiente contenido:

### Proyectos:

```json
POST http://localhost:3001/api/v1/proyectos/
```

```json
//body:

{
	"titulo": "Nuevo proyecto",
  "descripcion": "Esto es un nuevo proyecto",
  "miembros": [2, 3],
  "creador": 1
}
```

### Tareas:

```json
POST http://localhost:3001/api/v1/tareas/
```

```json
//body:

{
	"titulo": "tarea nueva",
	"asignada_a": 2,
	"descripcion": "Diseñar la página de perfil de usuario",
	"fecha_entrega": "2023-03-15",
	"id_proyecto": 1,
	"estado": "en-proceso"
}
```

## Peticiones PUT:

La API permite modificar la tarea o el proyecto incluyendo en el cuerpo de la petición los datos a modificar.

### Proyectos:

```json
PUT http://localhost:3001/api/v1/proyectos/38
```

```json
//body:
{
 "titulo": "proyecto modificado"
}
```

### Tareas:

```json
PUT http://localhost:3001/api/v1/tareas/27
```

```json
//body:
{
 "titulo": "tarea modificada"
}
```

## Peticiones DELETE

### Proyectos:

La eliminación de un proyecto llevará asociada la eliminación de todas las tareas asociadas a ese proyecto. 

En la respuesta se mostrará el proyecto borrado y las tareas borradas

```json
DELETE http://localhost:3001/api/v1/proyectos/37
```

```json
{
    "deletedProyect": {
        "titulo": "asdad1",
        "descripcion": "asd1111",
        "miembros": [
            1,
            2,
            9
        ],
        "creador": 1,
        "createdAt": "2023-02-18T13:13:50.682Z",
        "id": 37
    },
    "deletedTask": [
        {
            "titulo": "Rediseñar el logo de la empresa",
            "descripcion": "Crear un nuevo logo que sea moderno y representativo de la empresa",
            "asignada_a": 7,
            "fecha_entrega": "2023-03-20",
            "id_proyecto": 37,
            "estado": "no-empezado",
            "createdAt": "Sun Feb 19 2023",
            "id": 28
        }
    ],
    "mensaje": "Proyecto borrado"
}
```

### Tareas:

Para borrar una tarea concreta se hará mediante el método DELETE indicando el id de la tarea en la url.

```json
DELETE http://localhost:3001/api/v1/tareas/27
```

La respuesta de la API será la siguiente: 

```json
{
    "deletedTask": {
        "titulo": "Actualizar la base de datos 2",
        "descripcion": "Agregar nuevos campos a la tabla de usuarios y mejorar la eficiencia de las consultas",
        "asignada_a": 9,
        "fecha_entrega": "2023-03-28",
        "id_proyecto": 5,
        "estado": "no-empezado",
        "createdAt": "Sun Feb 19 2023",
        "id": 27,
        "updatedAt": "2023-02-19T16:56:31.770Z"
    },
    "mensaje": "Tarea borrado"
}
```
