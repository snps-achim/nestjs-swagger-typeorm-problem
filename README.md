
## Problem

When using latest "@nestjs/swagger": "7.2.0" and  "@nestjs/typeorm": "10.0.1", then the  NestJS application start is failing during bootstrap with "Error: A circular dependency has been detected (property key: "someKey"). Please, make sure that each side of a bidirectional relationships are using lazy resolvers". 
 
### Root cause
 `"reflect-metadata": "^0.1.13"` is required for `@nestjs\swagger` to work. 
 
 `"typeorm":"0.3.20"` was introduced by `"@nestjs\typeorm":"10.0.1"` installed `"reflect-metadata": "^0.2.0"` under `node_modules/typeorm/node_modules/reflect-metadata`. 
 
 When stepping through the code, for unknown reasons this wrong version `node_modules/typeorm/node_modules/reflect-metadata` is picked up by `@nestjs\swagger` instead of `node_modules/reflect-metadata` failing to get meta data for Swagger and causing the error 

## Installation

### NPM
```bash
$ npm install
```

### SQL
Also, you need an SQL server and adjust password under [./src/app.module.ts)](./src/app.module.ts)

## Running the app

```bash
$ npm run start
```


## Error Output
```
npm run start

> swagger-typeorm-problem@0.0.1 start
> nest start

[Nest] 28048  - 06/02/2024, 17:08:25     LOG [NestFactory] Starting Nest application...
[Nest] 28048  - 06/02/2024, 17:08:25     LOG [InstanceLoader] TypeOrmModule dependencies initialized +125ms
[Nest] 28048  - 06/02/2024, 17:08:25     LOG [InstanceLoader] AppModule dependencies initialized +0ms
[Nest] 28048  - 06/02/2024, 17:08:25     LOG [InstanceLoader] TypeOrmCoreModule dependencies initialized +25ms

nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\schema-object-factory.js:187
            throw new Error(`A circular dependency has been detected (property key: "${key}"). Please, make sure that each side of a bidirectional relationships are using lazy resolvers ("type: () => ClassType").`);
                  ^
Error: A circular dependency has been detected (property key: "afield"). Please, make sure that each side of a bidirectional relationships are using lazy resolvers ("type: () => ClassType").
    at SchemaObjectFactory.createNotBuiltInTypeReference (nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\schema-object-factory.js:187:19)
    at SchemaObjectFactory.createSchemaMetadata (nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\schema-object-factory.js:297:25)
    at SchemaObjectFactory.mergePropertyWithMetadata (nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\schema-object-factory.js:131:21)
    at nestjs-swagger-typeorm-problemnode_modules\@nestjs\swagger\dist\services\schema-object-factory.js:82:35
    at Array.map (<anonymous>)
    at SchemaObjectFactory.extractPropertiesFromType (nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\schema-object-factory.js:81:52)
    at SchemaObjectFactory.exploreModelSchema (nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\schema-object-factory.js:103:41)
    at ResponseObjectFactory.create (nestjs-swagger-typeorm-problem\node_modules\@nestjs\swagger\dist\services\response-object-factory.js:46:47)
    at nestjs-swagger-typeorm-problemnode_modules\@nestjs\swagger\dist\explorers\api-response.explorer.js:67:101
    at nestjs-swagger-typeorm-problemnode_modules\lodash\lodash.js:13469:38

```

