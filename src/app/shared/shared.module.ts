import { NgModule } from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClipboardDirective} from "./directives/clipboad.directive";

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [
        CommonModule,
        ClipboardDirective,
    ],
    declarations: [
        ClipboardDirective,
    ],
    providers: [],
})
export class SharedModule { }
