define({
  api: [
    {
      type: "delete",
      url: "/pets/:id",
      title: "Deletes a pet",
      group: "Pet",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content: "HTTP/1.1 204 No Content",
            type: "String",
          },
        ],
      },
      error: {
        fields: {
          404: [
            {
              group: "404",
              optional: false,
              field: "NoPet",
              description: "<p>When the pet with id = {id} cannot be found</p>",
            },
          ],
        },
        examples: [
          {
            title: "NoPet Error-Response:",
            content: "HTTP/1.1 404 Not Found\n'The pet could not be found.'",
            type: "String",
          },
        ],
      },
      version: "0.0.0",
      filename: "routes/api.js",
      groupTitle: "Pet",
      name: "DeletePetsId",
    },
    {
      type: "get",
      url: "/reset",
      title: "Resets the database.",
      group: "Pet",
      success: {
        examples: [
          {
            title: "Success-Response:",
            content: "HTTP/1.1 200 OK\n'Database reset successful!'",
            type: "String",
          },
        ],
      },
      version: "0.0.0",
      filename: "routes/api.js",
      groupTitle: "Pet",
      name: "GetReset",
    },
    {
      type: "get",
      url: "/pets",
      title: "Retrieves all pets",
      group: "Pet",
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object[]",
              optional: false,
              field: "pets",
              description: "<p>List of pets.</p>",
            },
            {
              group: "Success 200",
              type: "Number",
              optional: false,
              field: "pet.id",
              description: "<p>ID of pet.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pet.name",
              description: "<p>Name of pet.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pet.type",
              description: "<p>Type of pet.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              "HTTP/1.1 200 OK\n[\n  {'id': 1, 'name': 'pet1', 'type': 'cat'},\n  {'id': 2, 'name': 'pet2', 'type': ''}\n]",
            type: "json",
          },
        ],
      },
      version: "0.0.0",
      filename: "routes/api.js",
      groupTitle: "Pet",
      name: "GetPets",
    },
    {
      type: "get",
      url: "/pets/:id",
      title: "Retrieves pet with id = {id}",
      group: "Pet",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "Number",
              optional: false,
              field: "id",
              description: "<p>The id of the requested pet.</p>",
            },
          ],
        },
      },
      success: {
        fields: {
          "Success 200": [
            {
              group: "Success 200",
              type: "Object",
              optional: false,
              field: "pet",
              description: "<p>Pet object.</p>",
            },
            {
              group: "Success 200",
              type: "Number",
              optional: false,
              field: "pet.id",
              description: "<p>ID of pet.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pet.name",
              description: "<p>Name of pet.</p>",
            },
            {
              group: "Success 200",
              type: "String",
              optional: false,
              field: "pet.type",
              description: "<p>Type of pet.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              "HTTP/1.1 200 OK\n{'id': 1, 'name': 'pet 1', 'type': '11'}",
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          404: [
            {
              group: "404",
              optional: false,
              field: "NoPet",
              description: "<p>When the pet with id = {id} cannot be found</p>",
            },
          ],
        },
        examples: [
          {
            title: "NoPet Error-Response:",
            content: "HTTP/1.1 404 Not Found\n'The pet could not be found.'",
            type: "String",
          },
        ],
      },
      version: "0.0.0",
      filename: "routes/api.js",
      groupTitle: "Pet",
      name: "GetPetsId",
    },
    {
      type: "post",
      url: "/pets",
      title: "Saves a new pet.",
      description:
        "<p>Request payload should be in json. Note that you will need the &quot;Content-Type: application/json&quot; header.</p>",
      group: "Pet",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: false,
              field: "name",
              description: "<p>Name of pet. At least 1 character long.</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "type",
              description: "<p>Type of pet. At least 2 characters long.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example (all params provided):",
            content:
              "{'name': 'pet 1', 'type': 'cat'}",
            type: "json",
          },
          {
            title: "Request-Example (not all params provided):",
            content: "{'name': 'pet 1'}",
            type: "json",
          },
        ],
      },
      success: {
        fields: {
          "Success 201": [
            {
              group: "Success 201",
              type: "json",
              optional: false,
              field: "pet",
              description:
                "<p>Returns the newly created pet with an id attribute. Empty strings are assigned to properties that were not provided parameter values.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response (all params provided):",
            content:
              "HTTP/1.1 201 CREATED\n{'id': 1, 'name': 'pet 1', 'type': 'cat'}",
            type: "json",
          },
          {
            title: "Success-Response (not all params provided):",
            content:
              "HTTP/1.1 201 CREATED\n{'id': 1, 'name': 'pet 1', 'type': ''}",
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          400: [
            {
              group: "400",
              optional: false,
              field: "InvalidInput",
              description:
                "<p>When the pet cannot be saved (due to incorrect attrbiutes).</p>",
            },
          ],
        },
        examples: [
          {
            title: "InvalidInput Error-Response:",
            content: "HTTP/1.1 400 Bad Request\n'Pet cannot be saved.'",
            type: "String",
          },
        ],
      },
      version: "0.0.0",
      filename: "routes/api.js",
      groupTitle: "Pet",
      name: "PostPets",
    },
    {
      type: "put",
      url: "/pets/:id",
      title: "Updates a pet.",
      description:
        "<p>Uses key/value pairs to set the attributes of the pet. If the key/value pair is not present, its previous value is preserved. Note that the key/value pairs are in json and that you need the &quot;Content-Type: application/json&quot; header.</p>",
      group: "Pet",
      parameter: {
        fields: {
          Parameter: [
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "name",
              description: "<p>Name of pet. At least 1 character long.</p>",
            },
            {
              group: "Parameter",
              type: "String",
              optional: true,
              field: "type",
              description: "<p>Type of pet. At least 2 characters long.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Request-Example:",
            content: "{'name': 'eric', 'type': 'cat'}",
            type: "json",
          },
        ],
      },
      success: {
        fields: {
          200: [
            {
              group: "200",
              type: "json",
              optional: false,
              field: "pet",
              description: "<p>Returns the updated pet.</p>",
            },
          ],
        },
        examples: [
          {
            title: "Success-Response:",
            content:
              "HTTP/1.1 200 OK\n{'id': 1, 'name': 'pet1', 'type': 'cat'}",
            type: "json",
          },
        ],
      },
      error: {
        fields: {
          400: [
            {
              group: "400",
              optional: false,
              field: "InvalidInput",
              description:
                "<p>When the pet cannot be saved (due to incorrect attributes).</p>",
            },
          ],
          404: [
            {
              group: "404",
              optional: false,
              field: "NoPet",
              description: "<p>When the pet with id = {id} cannot be found</p>",
            },
          ],
        },
        examples: [
          {
            title: "InvalidInput Error-Response:",
            content: "HTTP/1.1 400 Bad Request\n'Pet cannot be saved.'",
            type: "String",
          },
          {
            title: "NoPet Error-Response:",
            content: "HTTP/1.1 404 Not Found\n'The pet could not be found.'",
            type: "String",
          },
        ],
      },
      version: "0.0.0",
      filename: "routes/api.js",
      groupTitle: "Pet",
      name: "PutPetsId",
    },
  ],
});
