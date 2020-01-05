# platzi-dir
Curso de platzi sobre fundamentos de GraphQL. Se construye una API para el manejo de Cursos y personas

# Scripts
Con `npm run start` se levanta el proyecto en un ambiente de production
Con `npm run dev` se levanta el proyecto en un ambiente de development

Al estar en modo development se puede acceder a /api apra acceder a GraphiQL donde se peude consultar

# Ejemplo de consulta
{
  courses {
    _id
    title
    description
    people {
      name
      email
    }
  }
}

{
  course(_id: "copiar y pegar un id aquí") {
    title
    description
  }
}
