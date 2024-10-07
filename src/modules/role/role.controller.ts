import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { Auth, UUIDParam } from '../../decorators';
import { CreateRoleDto } from './dtos/create-role.dto';
import type { RoleDto } from './dtos/role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RoleService } from './role.service';

@Controller('roles')
@ApiTags('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a role' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    const entity = await this.roleService.createRole(createRoleDto);

    return entity.toDto();
  }

  @Get()
  @ApiOperation({ summary: 'List all roles with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllRole(): Promise<RoleDto[]> {
    return this.roleService.getAllRole();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific role by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleRole(@UUIDParam('id') id: Uuid): Promise<RoleDto> {
    const entity = await this.roleService.getSingleRole(id);

    return entity.toDto();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role details' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  updateRole(
    @UUIDParam('id') id: Uuid,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<void> {
    return this.roleService.updateRole(id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a role' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async deleteRole(@UUIDParam('id') id: Uuid): Promise<void> {
    await this.roleService.deleteRole(id);
  }

  /*   // eslint-disable-next-line @typescript-eslint/require-await
  @Put(':id/permissions')
  @ApiOperation({ summary: 'Assign permissions to a role' })
  @Auth([])
  @HttpCode(HttpStatus.ACCEPTED)
  async assignPermissionToRole(
    @UUIDParam('id') roleId: Uuid,
    @Body() assignPermissionDto: AssignPermissionDto,
  ): Promise<void> {
    return this.roleService.assignPermissionToRole(
      roleId,
      assignPermissionDto.permissionId,
    );
  } */
}
