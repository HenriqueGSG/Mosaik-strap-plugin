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
    const ctx = {
      send: jest.fn(),
      throw: jest.fn(),
    };
    await testController({ strapi }).getPreProdRules(ctx);

    expect(ctx.send).toHaveBeenCalledWith(mockFindManyCall);
  });
  it("should handle errors in getPreProdRules", async function () {
    strapi.entityService.findMany.mockRejectedValue(new Error("Erro de teste"));

    const ctx = {
      throw: jest.fn(),
    };

    await testController({ strapi }).getPreProdRules(ctx);

    expect(ctx.throw).toHaveBeenCalledWith(500, "Erro interno do servidor");
  });

  it("should update and delete a temp entry when associated with production", async () => {
    const tempMock = {
      id: 1,
      name: "Temp Name",
      production: { id: 2 },
    };

    strapi.entityService.findOne.mockResolvedValue(tempMock);

    const ctx = {
      request: {
        body: {
          id: tempMock.id,
        },
      },
      send: jest.fn(),
    };

    await testController({ strapi }).updateProdRules(ctx);

    expect(strapi.entityService.findOne).toHaveBeenCalledWith(
      "api::temp.temp",
      tempMock.id,
      { populate: { production: true } }
    );
    expect(strapi.entityService.update).toHaveBeenCalledWith(
      "api::production.production",
      tempMock.production.id,
      { data: { Name: tempMock.name /*, ... */ } }
    );
    expect(strapi.entityService.delete).toHaveBeenCalledWith(
      "api::temp.temp",
      tempMock.id
    );

    expect(ctx.send).toHaveBeenCalledWith({
      message: "Temp entry updated and deleted immediately",
    });
  });

  it("should handle internal server errors", async () => {
    strapi.entityService.findOne.mockRejectedValue(new Error("Erro de teste"));

    const ctx = {
      request: { body: { id: 1 } },
      throw: jest.fn(),
    };
    await testController({ strapi }).updateProdRules(ctx);

    // Verificar se a função throw foi chamada com erro 500
    expect(ctx.throw).toHaveBeenCalledWith(500, "Erro interno do servidor");
  });
});

describe("updateProdRules", () => {});
