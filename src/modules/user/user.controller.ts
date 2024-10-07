import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Request,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import type { PageDto } from '../../common/dto/page.dto';
import { Auth, AuthUser, UUIDParam } from '../../decorators';
import { PermissionsGuard } from './../../guards/permissions.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { FilterDataDto } from './dtos/filter-data.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import type { UserDto } from './dtos/user.dto';
import { UserPageOptionsDto } from './dtos/user-page-options.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
@Controller('users')
@ApiTags('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const entity = await this.userService.createUser(createUserDto);

    return entity.toDto();
  }

  @Patch('accept-condition')
  @ApiOperation({ summary: 'Create a user' })
  @Auth([])
  @HttpCode(HttpStatus.CREATED)
  acceptCondition(@AuthUser() user: UserEntity) {
    this.userService.acceptCondition(user);
  }

  @Get('filter-data/admin')
  @SetMetadata('permissions', [])
  @UseGuards(PermissionsGuard)
  @ApiOperation({ summary: 'Filter users based on criteria' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getFilterAdminUser(
    @Query() filterDataDto: FilterDataDto,
  ): Promise<UserEntity[]> {
    return this.userService.getFilterUsers(filterDataDto);
  }

  @Get('forbidden')
  @ApiOperation({ summary: 'Filter users based on criteria' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getForbidden(@Request() request) {
    void this.userService.createAuditLogForbidden(request.user.id as Uuid);
  }

  @Get('filter-data/accounting')
  @SetMetadata('permissions', [])
  @UseGuards(PermissionsGuard)
  @ApiOperation({ summary: 'Filter users based on criteria' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getFilterAccountingUser(
    @Query() filterDataDto: FilterDataDto,
  ): Promise<UserEntity[]> {
    return this.userService.getFilterUsers(filterDataDto);
  }

  @Get()
  @ApiOperation({ summary: 'List all users with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getAllUser(
    @Query() userPageOptionsDto: UserPageOptionsDto,
  ): Promise<PageDto<UserDto>> {
    return this.userService.getAllUser(userPageOptionsDto);
  }

  @Get('/me')
  @ApiOperation({ summary: 'List all user-notifications with pagination' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getMyInfo(@AuthUser() user: UserEntity): Promise<UserEntity> {
    return this.userService.getMyInfo(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details of a specific user by ID' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleUser(@UUIDParam('id') id: Uuid): Promise<UserDto> {
    const entity = await this.userService.getSingleUser(id);

    return entity.toDto();
  }

  @Get('user-sub/:sub')
  @ApiOperation({ summary: 'Get details of a specific user by sub' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  async getSingleUserSub(@Param('sub') sub: string): Promise<UserDto> {
    const entity = await this.userService.getSingleUserSub(sub);

    return entity.toDto();
  }

  //TODO: Change roles are defined in the backend
  @Get('user-rol/:id')
  @ApiOperation({ summary: 'Get details of a specific user by sub' })
  @Auth([])
  @HttpCode(HttpStatus.OK)
  getRoleByUserId(@Param('id') id: string): Promise<unknown> {
    return this.userService.getRoleByUserId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user details' })
  @Auth([])
  updateUser(
    @UUIDParam('id') id: Uuid,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
