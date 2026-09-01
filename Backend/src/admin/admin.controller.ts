import { Controller, Get, Patch, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service.js';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  getStats() {
    return this.adminService.getDashboardStats();
  }

  @Get('drivers')
  getDrivers() {
    return this.adminService.getAllDrivers();
  }

  @Patch('drivers/:id/status')
  updateDriverStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.adminService.updateDriverStatus(id, status);
  }

  @Get('users')
  getUsers() {
    return this.adminService.getAllUsers();
  }

  @Get('rides')
  getRides() {
    return this.adminService.getAllRides();
  }
}
