import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // 들어오는 데이터에서 유효하지 않은 속성을 자동으로  제거하도록 함
    forbidNonWhitelisted: true, // dto에 정의되지 않은 프로퍼티를 차단함
    transform: true // 들어오는 데이터를 자동으로 변환함 ex) number => string
    // disableErrormessages: true => 유효성 검사에서 발생한 오류 메시지를 비활성화(클라이언트에게 오류에 대한 자세한 정보를 노출시키지 않음)
  }));

  await app.listen(3000);
}
bootstrap();
