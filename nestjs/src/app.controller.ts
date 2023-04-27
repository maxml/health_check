import { Controller, Get } from '@nestjs/common';
import { HealthcheckerDetailedCheck, HealthTypes } from 'nodejs-health-checker';

@Controller()
export class AppController {
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
          host: 'ec2-54-167-87-126.compute-1.amazonaws.com',
          port: 10200,
          auth: {
            password:
              'pe1a15fd9f551f1ee186cfcf26d12c39d7951bafe7930d7b3f95bc1eeab9c3dbb',
          },
        },
      ],
    });
  }
}
