import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent }   from "./app.component";
import {SharedModule} from "./shared/shared.module";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        SharedModule,
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
