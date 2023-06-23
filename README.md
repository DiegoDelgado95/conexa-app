# Conexa App

Tecnologias usadas:

- NestJS: Framework de NodeJS con Typescript Integrado. (Se requiere NodeJS)
- MongoDB: Como db no-sql, conectada a un cluster de MongoAtlas. (No se require instalacion)

El proyecto se llevo acabo en un Monorepo, utilizando 2 microservicios comunicandose mediante mensajes TCP.
Aprovechando las ventajas de NestJS que nos permite crear estar arquitectura y la comunicacion entre los microservicios de una manera sensilla.

Microservicio:

- Api: Escucha en el port 3000 las peticiones HTTP. Se encarga de la authentication y ser el Gateway de los microservicios.
- Negocios: Se encarga del ABM de los usuarios, se accede atravez del microservicio Api mediante mensajes por TCP.

# Instalacion

```
npm install
```

# Ejecutar microservicios Api

```
# development
npm run start:api

# watch mode
npm run start:dev:api

# production
npm run start:prod:api
```

# Ejecutar microservicio Negocios

```
# development
npm run start:negocios

# watch mode
npm run start:dev:negocios

# production mode
npm run start:prod:negocios
```

# Notas

## Docker

Se implemento el uso contenedores Docker para cada microservicio y su manipulazion atravez de Docker compose que nos facilita la comunicacion y la configuracion. (Es requerido tener Docker Compose para su uso)

`Importante` requerimiento:

- Para realizar la comunicacion atravez de mensaje TCP en un ambiente dockerizado, se debe realizar un cambio en el microservicio api src/app.module.ts

```
ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: {
          host: 'conexa-negocios',
          port: 4000,
        },
      },
    ]),
```

Una vez relaciado el cambio, los comandos para crear los contenedores y levantarlos:

```
docker-compose build
docker-compose up
```

## Errores

La comunicacion entre los microservicios atravez de mensaje `TCP`, no funciona correctamento debido a un problema desconocido, por el momento solo funciona para obtener los usuarios.

Una posible solucion serian implentar otro tipo de Host de manejo de mensaje como `kafka`.

## Mejoras

- En la aplicacion no se utilizaron `TEST`, por lo cual es una mejora prioritaria para aplicar.

- NestJS nos ofrece un monton de herramientas para realizar una aplicacion robusta y escalable, por lo cual queda mucho por investigar sobre el framework y sus potencial, mas buenas practicas.

- Con la utilizacion de Docker y Docker Compose, se puede agregar una db mongo dockerizada para utilizar de manera local sin instalacion.

- Tambien se puede agregar un Nginx dockerizado para realizar un proxy reverse, configuracion de un SSL para utilizar HTTPS, esto nos facilitaria el despliegue en algun host como puede ser los servicios de EC2 de AWS.
