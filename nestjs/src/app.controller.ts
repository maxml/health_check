import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  HealthcheckerSimpleCheck,
  HealthcheckerDetailedCheck,
  HealthTypes,
} from 'nodejs-health-checker';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/health')
  async getHealthStatus() {
    return HealthcheckerDetailedCheck({
      name: 'example',
      version: 'v1.0.0',
      integrations: [
        {
          type: HealthTypes.Web,
          name: 'A simple api integration check',
          host: 'https://github.com/status',
        },
        {
          type: HealthTypes.Redis,
          name: 'redis integration',
          host: 'compute.amazonaws.com',
          port: 3333,
          auth: {
            password: 'password',
          },
        },
      ],
    });
  }
}
