import { Observable, bindValue } from "./observable.function";

export class DButton {
    constructor(id: string) {
        this.totalClicks = 0;
        this._el = document.getElementById(id) as HTMLButtonElement;
        this.inputWatcher = Observable(this.totalClicks)
        bindValue(this._el, 'value', 'change', this.inputWatcher, this._onInput);
    }
    // PUBLIC PROPERTIES
    public totalClicks: number;
    // PRIVATE FIELDS
    private _el: HTMLButtonElement;
    private inputWatcher: typeof Observable;

    private _onInput(input: any) {
        this.totalClicks = this.totalClicks + 1;
        console.log("Input value changed to: " + this.totalClicks.toString());
        document.getElementById("b1value").innerHTML = '<span>' + this.totalClicks.toString() + '</span>';
    }
}