import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { JhipsterAppModuleNgFactory } from '../dist/aot/src/app/app.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(JhipsterAppModuleNgFactory)
    .then((success) => console.log(`Application started`))
    .catch((err) => console.error(err));
