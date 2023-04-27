import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheckModule } from 'nodejs-health-checker';

@Module({
  imports: [HealthCheckModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
