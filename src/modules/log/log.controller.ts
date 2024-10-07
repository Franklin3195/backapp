import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth, UUIDParam } from '../../decorators';
import type { CreateLogDto } from './dtos/create-log.dto';
import { CreateLogRequestDto } from './dtos/create-log-request.dto';
import type { LogDto } from './dtos/log.dto';
import { UserActivityLogRequest } from './dtos/user-activity-log-request.dto';
import { LogService } from './log.service';

@Controller('logs')
@ApiTags('logs')
export class LogController {
  constructor(private logService: LogService) {}

  @Post()
  @ApiOperation({ summary: 'Create a log' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createLog(
    @Request() request,
    @Body() createLogRequestDto: CreateLogRequestDto,
  ) {
    const createLog: CreateLogDto = {
      event: createLogRequestDto.event,
      entity: createLogRequestDto.entity,
      ipAddress: request.ip,
      user: {
        id: request.user.id,
      },
    };

    const entity = await this.logService.createLog(createLog);

    return entity.toDto();
  }

  @Get('user-activity')
  @ApiOperation({ summary: 'List user activity from request user' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getUserActivity(
    @Query() userActivityLogRequest: UserActivityLogRequest,
  ): Promise<unknown> {
    return this.logService.getUserActivity(userActivityLogRequest);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific log by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleLog(@UUIDParam('id') id: Uuid): Promise<LogDto> {
    const entity = await this.logService.getSingleLog(id);

    return entity.toDto();
  }
}
