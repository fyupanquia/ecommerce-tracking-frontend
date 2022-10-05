export default [
{
  _id: "63363d025bc0bca94ddc0aac",
  id: 12,
  name: "ENVÍO DE PEDIDI",
  email: "fyupanquia@outlook.com",
  code: "2004252703335P",
  created_at: "2022-09-22T00:23:14.031Z",
  updated_at: "2022-09-22T00:23:14.031Z",
  modules: [
    {
      id: 32,
      created_at: "2022-09-24T23:14:51.181Z",
      status: "SUCCESS",
      module_id: {
        id: 7,
        name: "PLANIFICACIÓN",
        created_at: "2022-09-23T04:50:05.000Z",
        updated_at: "2022-09-24T04:21:15.000Z",
      },
      tasks: [
        {
          id: 38,
          created_at: "2022-09-24T23:14:51.503Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 8,
            name: "Confirmar transacción bancaria",
            created_at: "2022-09-24T04:22:22.000Z",
            updated_at: "2022-09-24T04:26:54.000Z",
          },
        },
        {
          id: 40,
          created_at: "2022-09-24T23:14:51.688Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 10,
            name: "Asignar operador logístico",
            created_at: "2022-09-24T04:30:20.000Z",
            updated_at: "2022-09-24T04:30:20.000Z",
          },
        },
        {
          id: 41,
          created_at: "2022-09-24T23:14:51.719Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 13,
            name: "Verificar disponibilidad",
            created_at: "2022-09-24T04:33:24.000Z",
            updated_at: "2022-09-24T04:33:24.000Z",
          },
        },
        {
          id: 42,
          created_at: "2022-09-24T23:14:51.723Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 43,
          created_at: "2022-09-24T23:14:51.729Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 3,
            name: "Asignar de fechas",
            created_at: "2022-09-20T04:46:32.000Z",
            updated_at: "2022-09-24T04:27:05.000Z",
          },
        },
        {
          id: 44,
          created_at: "2022-09-24T23:14:51.730Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 2,
            name: "Generar orden de entrega",
            created_at: "2022-09-20T09:37:04.000Z",
            updated_at: "2022-09-24T04:26:38.000Z",
          },
        },
        {
          id: 39,
          created_at: "2022-09-24T23:14:51.677Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
        },
      ],
    },
    {
      id: 33,
      created_at: "2022-09-24T23:14:51.187Z",
      status: "WAITING",
      module_id: {
        id: 5,
        name: "EMPAQUE",
        created_at: "2022-09-20T04:33:14.000Z",
        updated_at: "2022-09-20T04:33:14.000Z",
      },
      tasks: [
        {
          id: 55,
          created_at: "2022-09-24T23:14:52.270Z",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
          status: "SUCCESS",
          type: "text",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        },
        {
          id: 54,
          created_at: "2022-09-24T23:14:52.266Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
          status: "SUCCESS",
          type: "img",
          value:
            "https://www.ecommercenews.pe/wp-content/uploads/2022/03/Ransa-anuncia-la-expansion-de-sus-operaciones-en-Peru.jpeg",
        },
        {
          id: 53,
          created_at: "2022-09-24T23:14:52.265Z",
          task_id: {
            id: 15,
            name: "Embalar",
            created_at: "2022-09-24T04:43:34.000Z",
            updated_at: "2022-09-24T04:43:34.000Z",
          },
          status: "WAITING",
          type: "map",
          value: [
            {
              position: {
                lat: -12.180742,
                lng: -76.943426,
              },
            },
          ],
        },
        {
          id: 51,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 6,
            name: "Sellar producto",
            created_at: "2022-09-23T04:56:41.000Z",
            updated_at: "2022-09-23T04:57:05.000Z",
          },
          status: "OFFLINE",
          type: "text",
          value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      id: 34,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 6,
        name: "EMBARQUE",
        created_at: "2022-09-20T04:33:23.000Z",
        updated_at: "2022-09-20T04:33:23.000Z",
      },
      tasks: [
        {
          id: 49,
          created_at: "2022-09-24T23:14:52.123Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 48,
          created_at: "2022-09-24T23:14:51.874Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
    {
      id: 35,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 3,
        name: "TRANSPORTE",
        created_at: "2022-09-16T03:04:44.000Z",
        updated_at: "2022-09-20T04:28:37.000Z",
      },
      tasks: [
        {
          id: 50,
          created_at: "2022-09-24T23:14:52.263Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 52,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
        {
          id: 56,
          created_at: "2022-09-24T23:14:52.272Z",
          task_id: {
            id: 12,
            name: "Cargar coordenadas",
            created_at: "2022-09-24T04:32:43.000Z",
            updated_at: "2022-09-24T04:32:43.000Z",
          },
        },
      ],
    },
    {
      id: 36,
      created_at: "2022-09-24T23:14:51.224Z",
      status: "OFFLINE",
      module_id: {
        id: 2,
        name: "DESPACHO",
        created_at: "2022-09-16T03:04:35.000Z",
        updated_at: "2022-09-16T03:04:35.000Z",
      },
      tasks: [
        {
          id: 46,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 45,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 14,
            name: "Firmar documento",
            created_at: "2022-09-24T04:41:07.000Z",
            updated_at: "2022-09-24T04:41:42.000Z",
          },
        },
        {
          id: 47,
          created_at: "2022-09-24T23:14:51.744Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
  ],
  __v: 0,
},
{
  _id: "63363d025bc0bca94ddc0aac",
  id: 12,
  name: "ENVÍO DE PEDIDI",
  email: "fyupanquia@outlook.com",
  code: "2004252703335P",
  created_at: "2022-09-22T00:23:14.031Z",
  updated_at: "2022-09-22T00:23:14.031Z",
  modules: [
    {
      id: 32,
      created_at: "2022-09-24T23:14:51.181Z",
      status: "SUCCESS",
      module_id: {
        id: 7,
        name: "PLANIFICACIÓN",
        created_at: "2022-09-23T04:50:05.000Z",
        updated_at: "2022-09-24T04:21:15.000Z",
      },
      tasks: [
        {
          id: 38,
          created_at: "2022-09-24T23:14:51.503Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 8,
            name: "Confirmar transacción bancaria",
            created_at: "2022-09-24T04:22:22.000Z",
            updated_at: "2022-09-24T04:26:54.000Z",
          },
        },
        {
          id: 40,
          created_at: "2022-09-24T23:14:51.688Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 10,
            name: "Asignar operador logístico",
            created_at: "2022-09-24T04:30:20.000Z",
            updated_at: "2022-09-24T04:30:20.000Z",
          },
        },
        {
          id: 41,
          created_at: "2022-09-24T23:14:51.719Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 13,
            name: "Verificar disponibilidad",
            created_at: "2022-09-24T04:33:24.000Z",
            updated_at: "2022-09-24T04:33:24.000Z",
          },
        },
        {
          id: 42,
          created_at: "2022-09-24T23:14:51.723Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 43,
          created_at: "2022-09-24T23:14:51.729Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 3,
            name: "Asignar de fechas",
            created_at: "2022-09-20T04:46:32.000Z",
            updated_at: "2022-09-24T04:27:05.000Z",
          },
        },
        {
          id: 44,
          created_at: "2022-09-24T23:14:51.730Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 2,
            name: "Generar orden de entrega",
            created_at: "2022-09-20T09:37:04.000Z",
            updated_at: "2022-09-24T04:26:38.000Z",
          },
        },
        {
          id: 39,
          created_at: "2022-09-24T23:14:51.677Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
        },
      ],
    },
    {
      id: 33,
      created_at: "2022-09-24T23:14:51.187Z",
      status: "WAITING",
      module_id: {
        id: 5,
        name: "EMPAQUE",
        created_at: "2022-09-20T04:33:14.000Z",
        updated_at: "2022-09-20T04:33:14.000Z",
      },
      tasks: [
        {
          id: 55,
          created_at: "2022-09-24T23:14:52.270Z",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
          status: "SUCCESS",
          type: "text",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        },
        {
          id: 54,
          created_at: "2022-09-24T23:14:52.266Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
          status: "SUCCESS",
          type: "img",
          value:
            "https://www.ecommercenews.pe/wp-content/uploads/2022/03/Ransa-anuncia-la-expansion-de-sus-operaciones-en-Peru.jpeg",
        },
        {
          id: 53,
          created_at: "2022-09-24T23:14:52.265Z",
          task_id: {
            id: 15,
            name: "Embalar",
            created_at: "2022-09-24T04:43:34.000Z",
            updated_at: "2022-09-24T04:43:34.000Z",
          },
          status: "WAITING",
          type: "map",
          value: [
            {
              position: {
                lat: 12.181588,
                lng: -76.942955,
              },
            },
          ],
        },
        {
          id: 51,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 6,
            name: "Sellar producto",
            created_at: "2022-09-23T04:56:41.000Z",
            updated_at: "2022-09-23T04:57:05.000Z",
          },
          status: "OFFLINE",
          type: "text",
          value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      id: 34,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 6,
        name: "EMBARQUE",
        created_at: "2022-09-20T04:33:23.000Z",
        updated_at: "2022-09-20T04:33:23.000Z",
      },
      tasks: [
        {
          id: 49,
          created_at: "2022-09-24T23:14:52.123Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 48,
          created_at: "2022-09-24T23:14:51.874Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
    {
      id: 35,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 3,
        name: "TRANSPORTE",
        created_at: "2022-09-16T03:04:44.000Z",
        updated_at: "2022-09-20T04:28:37.000Z",
      },
      tasks: [
        {
          id: 50,
          created_at: "2022-09-24T23:14:52.263Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 52,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
        {
          id: 56,
          created_at: "2022-09-24T23:14:52.272Z",
          task_id: {
            id: 12,
            name: "Cargar coordenadas",
            created_at: "2022-09-24T04:32:43.000Z",
            updated_at: "2022-09-24T04:32:43.000Z",
          },
        },
      ],
    },
    {
      id: 36,
      created_at: "2022-09-24T23:14:51.224Z",
      status: "OFFLINE",
      module_id: {
        id: 2,
        name: "DESPACHO",
        created_at: "2022-09-16T03:04:35.000Z",
        updated_at: "2022-09-16T03:04:35.000Z",
      },
      tasks: [
        {
          id: 46,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 45,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 14,
            name: "Firmar documento",
            created_at: "2022-09-24T04:41:07.000Z",
            updated_at: "2022-09-24T04:41:42.000Z",
          },
        },
        {
          id: 47,
          created_at: "2022-09-24T23:14:51.744Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
  ],
  __v: 0,
},
{
  _id: "63363d025bc0bca94ddc0aac",
  id: 12,
  name: "ENVÍO DE PEDIDI",
  email: "fyupanquia@outlook.com",
  code: "2004252703335P",
  created_at: "2022-09-22T00:23:14.031Z",
  updated_at: "2022-09-22T00:23:14.031Z",
  modules: [
    {
      id: 32,
      created_at: "2022-09-24T23:14:51.181Z",
      status: "SUCCESS",
      module_id: {
        id: 7,
        name: "PLANIFICACIÓN",
        created_at: "2022-09-23T04:50:05.000Z",
        updated_at: "2022-09-24T04:21:15.000Z",
      },
      tasks: [
        {
          id: 38,
          created_at: "2022-09-24T23:14:51.503Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 8,
            name: "Confirmar transacción bancaria",
            created_at: "2022-09-24T04:22:22.000Z",
            updated_at: "2022-09-24T04:26:54.000Z",
          },
        },
        {
          id: 40,
          created_at: "2022-09-24T23:14:51.688Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 10,
            name: "Asignar operador logístico",
            created_at: "2022-09-24T04:30:20.000Z",
            updated_at: "2022-09-24T04:30:20.000Z",
          },
        },
        {
          id: 41,
          created_at: "2022-09-24T23:14:51.719Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 13,
            name: "Verificar disponibilidad",
            created_at: "2022-09-24T04:33:24.000Z",
            updated_at: "2022-09-24T04:33:24.000Z",
          },
        },
        {
          id: 42,
          created_at: "2022-09-24T23:14:51.723Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 43,
          created_at: "2022-09-24T23:14:51.729Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 3,
            name: "Asignar de fechas",
            created_at: "2022-09-20T04:46:32.000Z",
            updated_at: "2022-09-24T04:27:05.000Z",
          },
        },
        {
          id: 44,
          created_at: "2022-09-24T23:14:51.730Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 2,
            name: "Generar orden de entrega",
            created_at: "2022-09-20T09:37:04.000Z",
            updated_at: "2022-09-24T04:26:38.000Z",
          },
        },
        {
          id: 39,
          created_at: "2022-09-24T23:14:51.677Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
        },
      ],
    },
    {
      id: 33,
      created_at: "2022-09-24T23:14:51.187Z",
      status: "WAITING",
      module_id: {
        id: 5,
        name: "EMPAQUE",
        created_at: "2022-09-20T04:33:14.000Z",
        updated_at: "2022-09-20T04:33:14.000Z",
      },
      tasks: [
        {
          id: 55,
          created_at: "2022-09-24T23:14:52.270Z",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
          status: "SUCCESS",
          type: "text",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        },
        {
          id: 54,
          created_at: "2022-09-24T23:14:52.266Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
          status: "SUCCESS",
          type: "img",
          value:
            "https://www.ecommercenews.pe/wp-content/uploads/2022/03/Ransa-anuncia-la-expansion-de-sus-operaciones-en-Peru.jpeg",
        },
        {
          id: 53,
          created_at: "2022-09-24T23:14:52.265Z",
          task_id: {
            id: 15,
            name: "Embalar",
            created_at: "2022-09-24T04:43:34.000Z",
            updated_at: "2022-09-24T04:43:34.000Z",
          },
          status: "WAITING",
          type: "map",
          value: [
            {
              position: {
                lat: -12.182611,
                lng: -76.942379,
              },
            },
          ],
        },
        {
          id: 51,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 6,
            name: "Sellar producto",
            created_at: "2022-09-23T04:56:41.000Z",
            updated_at: "2022-09-23T04:57:05.000Z",
          },
          status: "OFFLINE",
          type: "text",
          value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      id: 34,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 6,
        name: "EMBARQUE",
        created_at: "2022-09-20T04:33:23.000Z",
        updated_at: "2022-09-20T04:33:23.000Z",
      },
      tasks: [
        {
          id: 49,
          created_at: "2022-09-24T23:14:52.123Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 48,
          created_at: "2022-09-24T23:14:51.874Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
    {
      id: 35,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 3,
        name: "TRANSPORTE",
        created_at: "2022-09-16T03:04:44.000Z",
        updated_at: "2022-09-20T04:28:37.000Z",
      },
      tasks: [
        {
          id: 50,
          created_at: "2022-09-24T23:14:52.263Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 52,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
        {
          id: 56,
          created_at: "2022-09-24T23:14:52.272Z",
          task_id: {
            id: 12,
            name: "Cargar coordenadas",
            created_at: "2022-09-24T04:32:43.000Z",
            updated_at: "2022-09-24T04:32:43.000Z",
          },
        },
      ],
    },
    {
      id: 36,
      created_at: "2022-09-24T23:14:51.224Z",
      status: "OFFLINE",
      module_id: {
        id: 2,
        name: "DESPACHO",
        created_at: "2022-09-16T03:04:35.000Z",
        updated_at: "2022-09-16T03:04:35.000Z",
      },
      tasks: [
        {
          id: 46,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 45,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 14,
            name: "Firmar documento",
            created_at: "2022-09-24T04:41:07.000Z",
            updated_at: "2022-09-24T04:41:42.000Z",
          },
        },
        {
          id: 47,
          created_at: "2022-09-24T23:14:51.744Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
  ],
  __v: 0,
},
{
  _id: "63363d025bc0bca94ddc0aac",
  id: 12,
  name: "ENVÍO DE PEDIDI",
  email: "fyupanquia@outlook.com",
  code: "2004252703335P",
  created_at: "2022-09-22T00:23:14.031Z",
  updated_at: "2022-09-22T00:23:14.031Z",
  modules: [
    {
      id: 32,
      created_at: "2022-09-24T23:14:51.181Z",
      status: "SUCCESS",
      module_id: {
        id: 7,
        name: "PLANIFICACIÓN",
        created_at: "2022-09-23T04:50:05.000Z",
        updated_at: "2022-09-24T04:21:15.000Z",
      },
      tasks: [
        {
          id: 38,
          created_at: "2022-09-24T23:14:51.503Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 8,
            name: "Confirmar transacción bancaria",
            created_at: "2022-09-24T04:22:22.000Z",
            updated_at: "2022-09-24T04:26:54.000Z",
          },
        },
        {
          id: 40,
          created_at: "2022-09-24T23:14:51.688Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 10,
            name: "Asignar operador logístico",
            created_at: "2022-09-24T04:30:20.000Z",
            updated_at: "2022-09-24T04:30:20.000Z",
          },
        },
        {
          id: 41,
          created_at: "2022-09-24T23:14:51.719Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 13,
            name: "Verificar disponibilidad",
            created_at: "2022-09-24T04:33:24.000Z",
            updated_at: "2022-09-24T04:33:24.000Z",
          },
        },
        {
          id: 42,
          created_at: "2022-09-24T23:14:51.723Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 43,
          created_at: "2022-09-24T23:14:51.729Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 3,
            name: "Asignar de fechas",
            created_at: "2022-09-20T04:46:32.000Z",
            updated_at: "2022-09-24T04:27:05.000Z",
          },
        },
        {
          id: 44,
          created_at: "2022-09-24T23:14:51.730Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 2,
            name: "Generar orden de entrega",
            created_at: "2022-09-20T09:37:04.000Z",
            updated_at: "2022-09-24T04:26:38.000Z",
          },
        },
        {
          id: 39,
          created_at: "2022-09-24T23:14:51.677Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
        },
      ],
    },
    {
      id: 33,
      created_at: "2022-09-24T23:14:51.187Z",
      status: "WAITING",
      module_id: {
        id: 5,
        name: "EMPAQUE",
        created_at: "2022-09-20T04:33:14.000Z",
        updated_at: "2022-09-20T04:33:14.000Z",
      },
      tasks: [
        {
          id: 55,
          created_at: "2022-09-24T23:14:52.270Z",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
          status: "SUCCESS",
          type: "text",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        },
        {
          id: 54,
          created_at: "2022-09-24T23:14:52.266Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
          status: "SUCCESS",
          type: "img",
          value:
            "https://www.ecommercenews.pe/wp-content/uploads/2022/03/Ransa-anuncia-la-expansion-de-sus-operaciones-en-Peru.jpeg",
        },
        {
          id: 53,
          created_at: "2022-09-24T23:14:52.265Z",
          task_id: {
            id: 15,
            name: "Embalar",
            created_at: "2022-09-24T04:43:34.000Z",
            updated_at: "2022-09-24T04:43:34.000Z",
          },
          status: "WAITING",
          type: "map",
          value: [
            {
              position: {
                lat: -12.183990,
                lng: -76.941468,
              },
            },
          ],
        },
        {
          id: 51,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 6,
            name: "Sellar producto",
            created_at: "2022-09-23T04:56:41.000Z",
            updated_at: "2022-09-23T04:57:05.000Z",
          },
          status: "OFFLINE",
          type: "text",
          value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      id: 34,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 6,
        name: "EMBARQUE",
        created_at: "2022-09-20T04:33:23.000Z",
        updated_at: "2022-09-20T04:33:23.000Z",
      },
      tasks: [
        {
          id: 49,
          created_at: "2022-09-24T23:14:52.123Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 48,
          created_at: "2022-09-24T23:14:51.874Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
    {
      id: 35,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 3,
        name: "TRANSPORTE",
        created_at: "2022-09-16T03:04:44.000Z",
        updated_at: "2022-09-20T04:28:37.000Z",
      },
      tasks: [
        {
          id: 50,
          created_at: "2022-09-24T23:14:52.263Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 52,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
        {
          id: 56,
          created_at: "2022-09-24T23:14:52.272Z",
          task_id: {
            id: 12,
            name: "Cargar coordenadas",
            created_at: "2022-09-24T04:32:43.000Z",
            updated_at: "2022-09-24T04:32:43.000Z",
          },
        },
      ],
    },
    {
      id: 36,
      created_at: "2022-09-24T23:14:51.224Z",
      status: "OFFLINE",
      module_id: {
        id: 2,
        name: "DESPACHO",
        created_at: "2022-09-16T03:04:35.000Z",
        updated_at: "2022-09-16T03:04:35.000Z",
      },
      tasks: [
        {
          id: 46,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 45,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 14,
            name: "Firmar documento",
            created_at: "2022-09-24T04:41:07.000Z",
            updated_at: "2022-09-24T04:41:42.000Z",
          },
        },
        {
          id: 47,
          created_at: "2022-09-24T23:14:51.744Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
  ],
  __v: 0,
},
{
  _id: "63363d025bc0bca94ddc0aac",
  id: 12,
  name: "ENVÍO DE PEDIDI",
  email: "fyupanquia@outlook.com",
  code: "2004252703335P",
  created_at: "2022-09-22T00:23:14.031Z",
  updated_at: "2022-09-22T00:23:14.031Z",
  modules: [
    {
      id: 32,
      created_at: "2022-09-24T23:14:51.181Z",
      status: "SUCCESS",
      module_id: {
        id: 7,
        name: "PLANIFICACIÓN",
        created_at: "2022-09-23T04:50:05.000Z",
        updated_at: "2022-09-24T04:21:15.000Z",
      },
      tasks: [
        {
          id: 38,
          created_at: "2022-09-24T23:14:51.503Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 8,
            name: "Confirmar transacción bancaria",
            created_at: "2022-09-24T04:22:22.000Z",
            updated_at: "2022-09-24T04:26:54.000Z",
          },
        },
        {
          id: 40,
          created_at: "2022-09-24T23:14:51.688Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 10,
            name: "Asignar operador logístico",
            created_at: "2022-09-24T04:30:20.000Z",
            updated_at: "2022-09-24T04:30:20.000Z",
          },
        },
        {
          id: 41,
          created_at: "2022-09-24T23:14:51.719Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 13,
            name: "Verificar disponibilidad",
            created_at: "2022-09-24T04:33:24.000Z",
            updated_at: "2022-09-24T04:33:24.000Z",
          },
        },
        {
          id: 42,
          created_at: "2022-09-24T23:14:51.723Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 43,
          created_at: "2022-09-24T23:14:51.729Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 3,
            name: "Asignar de fechas",
            created_at: "2022-09-20T04:46:32.000Z",
            updated_at: "2022-09-24T04:27:05.000Z",
          },
        },
        {
          id: 44,
          created_at: "2022-09-24T23:14:51.730Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 2,
            name: "Generar orden de entrega",
            created_at: "2022-09-20T09:37:04.000Z",
            updated_at: "2022-09-24T04:26:38.000Z",
          },
        },
        {
          id: 39,
          created_at: "2022-09-24T23:14:51.677Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
        },
      ],
    },
    {
      id: 33,
      created_at: "2022-09-24T23:14:51.187Z",
      status: "WAITING",
      module_id: {
        id: 5,
        name: "EMPAQUE",
        created_at: "2022-09-20T04:33:14.000Z",
        updated_at: "2022-09-20T04:33:14.000Z",
      },
      tasks: [
        {
          id: 55,
          created_at: "2022-09-24T23:14:52.270Z",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
          status: "SUCCESS",
          type: "text",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        },
        {
          id: 54,
          created_at: "2022-09-24T23:14:52.266Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
          status: "SUCCESS",
          type: "img",
          value:
            "https://www.ecommercenews.pe/wp-content/uploads/2022/03/Ransa-anuncia-la-expansion-de-sus-operaciones-en-Peru.jpeg",
        },
        {
          id: 53,
          created_at: "2022-09-24T23:14:52.265Z",
          task_id: {
            id: 15,
            name: "Embalar",
            created_at: "2022-09-24T04:43:34.000Z",
            updated_at: "2022-09-24T04:43:34.000Z",
          },
          status: "WAITING",
          type: "map",
          value: [
            {
              position: {
                lat: -12.185295,
                lng: -76.940634,
              },
            },
          ],
        },
        {
          id: 51,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 6,
            name: "Sellar producto",
            created_at: "2022-09-23T04:56:41.000Z",
            updated_at: "2022-09-23T04:57:05.000Z",
          },
          status: "OFFLINE",
          type: "text",
          value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      id: 34,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 6,
        name: "EMBARQUE",
        created_at: "2022-09-20T04:33:23.000Z",
        updated_at: "2022-09-20T04:33:23.000Z",
      },
      tasks: [
        {
          id: 49,
          created_at: "2022-09-24T23:14:52.123Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 48,
          created_at: "2022-09-24T23:14:51.874Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
    {
      id: 35,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 3,
        name: "TRANSPORTE",
        created_at: "2022-09-16T03:04:44.000Z",
        updated_at: "2022-09-20T04:28:37.000Z",
      },
      tasks: [
        {
          id: 50,
          created_at: "2022-09-24T23:14:52.263Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 52,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
        {
          id: 56,
          created_at: "2022-09-24T23:14:52.272Z",
          task_id: {
            id: 12,
            name: "Cargar coordenadas",
            created_at: "2022-09-24T04:32:43.000Z",
            updated_at: "2022-09-24T04:32:43.000Z",
          },
        },
      ],
    },
    {
      id: 36,
      created_at: "2022-09-24T23:14:51.224Z",
      status: "OFFLINE",
      module_id: {
        id: 2,
        name: "DESPACHO",
        created_at: "2022-09-16T03:04:35.000Z",
        updated_at: "2022-09-16T03:04:35.000Z",
      },
      tasks: [
        {
          id: 46,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 45,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 14,
            name: "Firmar documento",
            created_at: "2022-09-24T04:41:07.000Z",
            updated_at: "2022-09-24T04:41:42.000Z",
          },
        },
        {
          id: 47,
          created_at: "2022-09-24T23:14:51.744Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
  ],
  __v: 0,
},
{
  _id: "63363d025bc0bca94ddc0aac",
  id: 12,
  name: "ENVÍO DE PEDIDI",
  email: "fyupanquia@outlook.com",
  code: "2004252703335P",
  created_at: "2022-09-22T00:23:14.031Z",
  updated_at: "2022-09-22T00:23:14.031Z",
  modules: [
    {
      id: 32,
      created_at: "2022-09-24T23:14:51.181Z",
      status: "SUCCESS",
      module_id: {
        id: 7,
        name: "PLANIFICACIÓN",
        created_at: "2022-09-23T04:50:05.000Z",
        updated_at: "2022-09-24T04:21:15.000Z",
      },
      tasks: [
        {
          id: 38,
          created_at: "2022-09-24T23:14:51.503Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 8,
            name: "Confirmar transacción bancaria",
            created_at: "2022-09-24T04:22:22.000Z",
            updated_at: "2022-09-24T04:26:54.000Z",
          },
        },
        {
          id: 40,
          created_at: "2022-09-24T23:14:51.688Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 10,
            name: "Asignar operador logístico",
            created_at: "2022-09-24T04:30:20.000Z",
            updated_at: "2022-09-24T04:30:20.000Z",
          },
        },
        {
          id: 41,
          created_at: "2022-09-24T23:14:51.719Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 13,
            name: "Verificar disponibilidad",
            created_at: "2022-09-24T04:33:24.000Z",
            updated_at: "2022-09-24T04:33:24.000Z",
          },
        },
        {
          id: 42,
          created_at: "2022-09-24T23:14:51.723Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 43,
          created_at: "2022-09-24T23:14:51.729Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 3,
            name: "Asignar de fechas",
            created_at: "2022-09-20T04:46:32.000Z",
            updated_at: "2022-09-24T04:27:05.000Z",
          },
        },
        {
          id: 44,
          created_at: "2022-09-24T23:14:51.730Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 2,
            name: "Generar orden de entrega",
            created_at: "2022-09-20T09:37:04.000Z",
            updated_at: "2022-09-24T04:26:38.000Z",
          },
        },
        {
          id: 39,
          created_at: "2022-09-24T23:14:51.677Z",
          status: "SUCCESS|ERROR|LOADING|WAITING",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
        },
      ],
    },
    {
      id: 33,
      created_at: "2022-09-24T23:14:51.187Z",
      status: "WAITING",
      module_id: {
        id: 5,
        name: "EMPAQUE",
        created_at: "2022-09-20T04:33:14.000Z",
        updated_at: "2022-09-20T04:33:14.000Z",
      },
      tasks: [
        {
          id: 55,
          created_at: "2022-09-24T23:14:52.270Z",
          task_id: {
            id: 7,
            name: "Asignar horas",
            created_at: "2022-09-24T04:21:44.000Z",
            updated_at: "2022-09-24T04:27:19.000Z",
          },
          status: "SUCCESS",
          type: "text",
          value:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
        },
        {
          id: 54,
          created_at: "2022-09-24T23:14:52.266Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
          status: "SUCCESS",
          type: "img",
          value:
            "https://www.ecommercenews.pe/wp-content/uploads/2022/03/Ransa-anuncia-la-expansion-de-sus-operaciones-en-Peru.jpeg",
        },
        {
          id: 53,
          created_at: "2022-09-24T23:14:52.265Z",
          task_id: {
            id: 15,
            name: "Embalar",
            created_at: "2022-09-24T04:43:34.000Z",
            updated_at: "2022-09-24T04:43:34.000Z",
          },
          status: "WAITING",
          type: "map",
          value: [
            {
              position: {
                lat: -12.188187,
                lng: -76.938844,
              },
            },
          ],
        },
        {
          id: 51,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 6,
            name: "Sellar producto",
            created_at: "2022-09-23T04:56:41.000Z",
            updated_at: "2022-09-23T04:57:05.000Z",
          },
          status: "OFFLINE",
          type: "text",
          value: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      id: 34,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 6,
        name: "EMBARQUE",
        created_at: "2022-09-20T04:33:23.000Z",
        updated_at: "2022-09-20T04:33:23.000Z",
      },
      tasks: [
        {
          id: 49,
          created_at: "2022-09-24T23:14:52.123Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 48,
          created_at: "2022-09-24T23:14:51.874Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
    {
      id: 35,
      created_at: "2022-09-24T23:14:51.221Z",
      status: "OFFLINE",
      module_id: {
        id: 3,
        name: "TRANSPORTE",
        created_at: "2022-09-16T03:04:44.000Z",
        updated_at: "2022-09-20T04:28:37.000Z",
      },
      tasks: [
        {
          id: 50,
          created_at: "2022-09-24T23:14:52.263Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 52,
          created_at: "2022-09-24T23:14:52.264Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
        {
          id: 56,
          created_at: "2022-09-24T23:14:52.272Z",
          task_id: {
            id: 12,
            name: "Cargar coordenadas",
            created_at: "2022-09-24T04:32:43.000Z",
            updated_at: "2022-09-24T04:32:43.000Z",
          },
        },
      ],
    },
    {
      id: 36,
      created_at: "2022-09-24T23:14:51.224Z",
      status: "OFFLINE",
      module_id: {
        id: 2,
        name: "DESPACHO",
        created_at: "2022-09-16T03:04:35.000Z",
        updated_at: "2022-09-16T03:04:35.000Z",
      },
      tasks: [
        {
          id: 46,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 11,
            name: "Cargar foto referencial",
            created_at: "2022-09-24T04:31:09.000Z",
            updated_at: "2022-09-24T04:31:09.000Z",
          },
        },
        {
          id: 45,
          created_at: "2022-09-24T23:14:51.737Z",
          task_id: {
            id: 14,
            name: "Firmar documento",
            created_at: "2022-09-24T04:41:07.000Z",
            updated_at: "2022-09-24T04:41:42.000Z",
          },
        },
        {
          id: 47,
          created_at: "2022-09-24T23:14:51.744Z",
          task_id: {
            id: 9,
            name: "Asignar detalle",
            created_at: "2022-09-24T04:29:22.000Z",
            updated_at: "2022-09-24T04:29:22.000Z",
          },
        },
      ],
    },
  ],
  __v: 0,
}
]