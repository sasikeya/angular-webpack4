import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModuleNgFactory } from '../dist/www/aot/src//app/app.module.ngfactory';
enableProdMode();

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory)
    .then((success) => console.log(`Application started`))
    .catch((err) => console.error(err));
