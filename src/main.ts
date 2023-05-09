import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { dirname, join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';

import * as session from 'express-session';
// import flash = require('connect-flash');
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewsPath = join(__dirname, '../views');
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.engine('.hbs', exphbs({ extname: '.hbs', defaultLayout: 'main' }));
  app.set('views', viewsPath);
  app.set('view engine', '.hbs');
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  // app.set('view engine', 'ejs');
  app.use(
    session({
      name: 'user',
      secret: 'nest car',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(function (req, res, next) {
    res.locals.session = req.session;
    const flashErrors: string[] = req.session.flashErrors;
    if (flashErrors) {
      res.locals.flashErrors = flashErrors;
      req.session.flashErrors = null;
    }
    next();
  });
  // app.use(flash());

  await app.listen(5000);
}
bootstrap();
