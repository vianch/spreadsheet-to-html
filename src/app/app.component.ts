import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public pastedData: Array<string>;

    public ngOnInit(): void {
        this.pastedData = ["NOTHING PASTED"];
    }

    public pasteData(event: {pasteData: Array<string>} ): void {
        this.pastedData = event.pasteData;
    }
}
