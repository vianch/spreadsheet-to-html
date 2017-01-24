import {Component, OnInit} from "@angular/core";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.scss"],
})
export class AppComponent implements OnInit {
    public pastedData: Array<string>;
    public pastedDataMonths: Array<string>;
    public totalSum: number;

    public ngOnInit(): void {
        this.pastedData = ["NOTHING PASTED"];
        this.pastedDataMonths = [];
        this.totalSum = 0;
    }

    public pasteData(event: {pasteData: Array<string>} ): void {
        this.pastedData = event.pasteData;
    }

    public pasteMonthData(event: {pasteData: Array<string>} ): void {
        this.pastedDataMonths = (event.pasteData.length > 12) ? event.pasteData.slice(0,12) : event.pasteData;
    
        for(let i in this.pastedDataMonths) {
            this.totalSum += parseInt(this.pastedDataMonths[i], 10);
        }
    }
}
