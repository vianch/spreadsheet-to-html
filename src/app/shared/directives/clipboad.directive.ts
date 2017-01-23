import {Directive, ElementRef, Output, EventEmitter} from '@angular/core';

@Directive({
    selector: "[th-clipboard]",
})
export class ClipboardDirective {
    @Output() public onPasteData: EventEmitter<{pasteData: string}>;

    constructor(private elementRef: ElementRef) {
        this.onPasteData = new EventEmitter<{pasteData: string}>();
        this.initBrowserListener();
    }

    private handlePaste(pasteEvent: ClipboardEvent): void {
        // Browsers that support the 'text/html' type in the Clipboard API (Chrome, Firefox 22+)
        if (pasteEvent
            && pasteEvent.clipboardData
            && pasteEvent.clipboardData.types
            && pasteEvent.clipboardData.getData) {
            this.processPaste(pasteEvent.clipboardData.getData("text"));
            pasteEvent.stopPropagation();
            pasteEvent.preventDefault()
        }
    }

    private processPaste(pastedData: string): void {
        this.onPasteData.emit({
            pasteData: pastedData
        });
    }

    private initBrowserListener(): void {
        // Modern browsers. Note: 3rd argument is required for Firefox <= 6
        if(this.elementRef.nativeElement.addEventListener) {
            this.elementRef.nativeElement.addEventListener("paste", (eventListened: ClipboardEvent) => {
                this.handlePaste(eventListened);
            } , false);
        } else {
            // IE <= 8
            this.elementRef.nativeElement.attachEvent("onpaste",  (eventListened: ClipboardEvent) => {
                this.handlePaste(eventListened);
            });
        }
    }
}
