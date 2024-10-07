---
to: "src/modules/<%= h.fileName(name) %>/<%= h.moduleFileName(name) %>.ts"
unless_exists: true
---
<%

 ModuleName = h.ModuleName(name);

 ControllerName = h.ControllerName(name);
 controllerFileName = h.controllerFileName(name);

 ServiceName = h.ServiceName(name);
 serviceFileName = h.serviceFileName(name);

 EntityName = h.EntityName(name);
 entityFileName = h.entityFileName(name);

 CreateHandlerName = h.CreateHandlerName(name);
 createCommandFileName = h.createCommandFileName(name);

 GetHandlerName = h.GetHandlerName(name);
 getQueryFileName = h.getQueryFileName(name);

%>
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { <%= ControllerName %> } from './<%= controllerFileName %>';
import { <%= EntityName %> } from './<%= entityFileName %>';
import { <%= ServiceName %> } from './<%= serviceFileName %>';
import { <%= CreateHandlerName %> } from './commands/<%= createCommandFileName %>';
import { <%= GetHandlerName %> } from './queries/<%= getQueryFileName %>';

export const handlers = [
  <%= CreateHandlerName %>,
  <%= GetHandlerName %>,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([<%= EntityName %>]),
  ],
  providers: [<%= ServiceName %>, ...handlers],
  controllers: [<%= ControllerName %>],
})
export class <%= ModuleName %> {}
