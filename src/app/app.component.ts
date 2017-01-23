import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
    public pastedData: string;

    public ngOnInit(): void {
        this.pastedData = "Nothing";
    }

    public pasteData(event: {pasteData: string} ): void {
        this.pastedData = event.pasteData;
    }
}
