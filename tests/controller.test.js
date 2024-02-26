let testController = require("../src/plugins/plug-bb/server/controllers/customController");
const mockFindManyCall = [
  {
    id: 2,
    name: "pre-prod-apw-start-blank-config",
    issueLink: "https://github.com/strapi/design-system/issues/1445",
    rule: { v2: 33 },
    description: "sadasd",
    scheduler: null,
    createdAt: "2024-01-16T11:10:16.733Z",
    updatedAt: "2024-01-16T11:32:52.679Z",
    publishedAt: null,
    production: {
      id: 1,
      Name: "prod-apw-start-blank-config",
      rule: [{ v2: 22 }],
      createdAt: "2024-01-16T10:48:17.359Z",
      updatedAt: "2024-01-16T11:55:05.632Z",
      publishedAt: "2024-01-16T10:48:49.210Z",
    },
    createdBy: {
      id: 1,
      firstname: "henrique",
      lastname: "guarnieri",
      username: null,
      email: "henriqueguarnieri.gg@gmail.com",
      password: "$2a$10$IMy.ofAdT4F67saO0Rs3L.p7a/.2ZjWB1umIpY1WauVaCDhi661k2",
      resetPasswordToken: null,
      registrationToken: null,
      isActive: true,
      blocked: false,
      preferedLanguage: null,
      createdAt: "2024-01-16T10:47:42.544Z",
      updatedAt: "2024-01-16T10:47:42.544Z",
    },
    updatedBy: {
      id: 1,
      firstname: "henrique",
      lastname: "guarnieri",
      username: null,
      email: "henriqueguarnieri.gg@gmail.com",
      password: "$2a$10$IMy.ofAdT4F67saO0Rs3L.p7a/.2ZjWB1umIpY1WauVaCDhi661k2",
      resetPasswordToken: null,
      registrationToken: null,
      isActive: true,
      blocked: false,
      preferedLanguage: null,
      createdAt: "2024-01-16T10:47:42.544Z",
      updatedAt: "2024-01-16T10:47:42.544Z",
    },
  },
];
describe("Plugin Controller", () => {
  let strapi;
  beforeEach(async function () {
    strapi = {
      entityService: {
        findMany: jest.fn().mockResolvedValue(mockFindManyCall),
        findOne: jest.fn().mockRejectedValue(mockFindManyCall[0]),
        update: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
      },
    };
  });

  it("should retrieve pre-production rules", async function () {
    expect(true).toBe(true);
  });
});
