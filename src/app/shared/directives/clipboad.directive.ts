import {Directive, ElementRef, Output, EventEmitter, Renderer, HostListener} from '@angular/core';

@Directive({
    selector: "[th-clipboard]",
})
export class ClipboardDirective {
    @Output() public onPasteData: EventEmitter<{pasteData: Array<string>}>;

    @HostListener("click") paste() {
    }

    constructor(private elementRef: ElementRef, renderer: Renderer) {
        this.onPasteData = new EventEmitter<{pasteData: Array<string>}>();
        this.initBrowserListener();

       /* renderer.listen(elementRef.nativeElement, 'click', (event) => {
            console.log(event)
        })
        renderer.listenGlobal('document', 'paste', (event) => {
            // Do something with 'event'
            console.log("clickasd222")
        });*/
    }

    private handlePaste(pasteEvent: ClipboardEvent): void {
        // Browsers that support the 'text/html' type in the Clipboard API (Chrome, Firefox 22+)
        if (pasteEvent
            && pasteEvent.clipboardData
            && pasteEvent.clipboardData.types
            && pasteEvent.clipboardData.getData) {
            this.processPaste(pasteEvent.clipboardData.getData("text/plain"));
            ///pasteEvent.stopPropagation();
          //  pasteEvent.preventDefault()
        }
    }

    private initBrowserListener(): void {
        // Modern browsers. Note: 3rd argument is required for Firefox <= 6
        if(this.elementRef.nativeElement.addEventListener) {
            this.elementRef.nativeElement.addEventListener("paste", (event: ClipboardEvent) => {
                this.handlePaste(event);
            } );
        } else {
            // IE <= 8
            this.elementRef.nativeElement.attachEvent("onpaste",  (event: ClipboardEvent) => {
                this.handlePaste(event);
            });
        }
    }

    private processPaste(pastedData: string): void {
        this.onPasteData.emit({
            pasteData: <Array<string>>pastedData.split("\n")
        });
    }


}
