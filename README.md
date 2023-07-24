# CRUD con Next.js y API integrada

Este es un proyecto de ejemplo que implementa un CRUD (Create, Read, Update, Delete) utilizando Next.js en el front-end y la API integrada de Next.js en el backend. El objetivo es demostrar cómo crear una aplicación web simple con funcionalidad de CRUD utilizando estas tecnologías.

## Requisitos previos

Antes de comenzar, asegúrate de tener lo siguiente instalado en tu máquina:

1. Node.js: Asegúrate de tener Node.js instalado. Puedes descargar la última versión estable desde el sitio web oficial: [https://nodejs.org](https://nodejs.org).

2. Next.js: Debes tener Next.js instalado globalmente en tu máquina. Si no lo tienes, puedes instalarlo ejecutando el siguiente comando:

```bash
npm install -g next
```

## Instrucciones de configuración

Sigue estos pasos para configurar y ejecutar el proyecto:

1. Clona este repositorio en tu máquina local:

```bash
git clone https://github.com/Felipelo94/crud-fractal.git
cd crud-fractal
```

2. Instala las dependencias del proyecto ejecutando el siguiente comando en la raíz del proyecto:

```bash
npm install
```

3. Inicia el servidor de desarrollo para el front-end y la API backend:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo en [http://localhost:3000](http://localhost:3000).

4. Abre tu navegador web y navega a [http://localhost:3000](http://localhost:3000) para ver la aplicación en funcionamiento.

## Estructura del proyecto

El proyecto tiene la siguiente estructura de directorios:

```
crud-fractal/

    * components
        * Layout
            * Layout.jsx
        * navbar
            * Navbar.jsx
        * userCard
            * UserCard.jsx
        * userForm
            * UserForm.jsx
    * config
        * db.js
    * db
        * db.sql
    * lib
        * logger
         * logger.js
    * pages
        * api
           * login
                * index.js
            * logout
                *index.js
            * register
                * index.js
            * users
                * [id].js
                * index.js
        * login
            * index.jsx
        * new
            * index.js
        * registro
            * index.js
        * user
            * edit
                * [id].js
            * [id].js
        * _app.jsx
        * index.jsx
        * middleware.js
```

- `pages`: Este directorio contiene las páginas de la aplicación. En este proyecto, tenemos cinco páginas: `index.jsx` (página de inicio que muestra una lista de elementos), `login` (página para scceder a la aplicacion), `new` (página para crear un elemento ), `registro` (página para registrarse en la aplicación ) y `user` (página para ver detalles de un usuario específico, con su subcarpeta edit, para la edición de algún usuario existente).

- `components`: Aquí se encuentran los componentes reutilizables de la aplicación. En este caso, tenemos cuatro componentes: `Layout` que proporciona la estructura básica de la página, `Navbar` que proporciona la barra de navegación para el control de la aplicación, `userCard` que proporciona el elemento para cada uno de los usuarios de la aplicación y `userForm`, que porporciona la creación o edición de usuarios.

- `api`: Este directorio contiene los archivos que definen los endpoints de la API.

- `config`: Este directorio contiene el archivo de configuración para establecer las conexiónes con las base de datos.

- `db`: Este directorio contiene el archivo con la estructura de las bases de datos utilizadas a lo largo del proyecto.

## Funcionalidad de la aplicación

- La aplicación inicia con una página de inicio de sesión, con la opción de crear una cuenta nueva en el caso de no poseerla.

- Al iniciar sesión se redirige al Home.

- En la página de inicio (`index.js`), se muestra una lista de elementos existentes con la opción de entrar a la pagina de detalles de cada usuario, y tambien se encuentra la barra de navegación.

- Al hacer click en el logo de la aplicación, nos redirege al home.

- Al hacer clic en el botón "Usuario nuevo", se dirige a la página de creación (`new`) donde se puede agregar un nuevo usuario.

- Al hacer clic en el botón "Editar" en la página de detalles de usuario, se redirige a la página de edición (`edit`) donde se pueden realizar cambios en el usuario seleccionado.

- Al hacer clic en el botón "Eliminar" en la página de indetalles de usuario, se eliminará el elemento correspondiente de la lista.

- Al hacer clic en el botón de "Cerrar sesión" de la barra de navegación, nos redirige a la página de iniciar sesión de la aplicación, borrando el toquen y no permite el uso del resto de la aplicación.

## Notas adicionales

- Este proyecto de ejemplo utiliza una base de datos MySQL y realiza las operaciones CRUD mediante llamadas a la base de datos.

- Este proyecto es un desafio técnico para el proceso de selección con la empresa Fractal.
