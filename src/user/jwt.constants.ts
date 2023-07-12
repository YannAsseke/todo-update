import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtConstants = {
    useFactory: (configService: ConfigService) => ({
        secret: configService.get('TOKEN')
    })
  };