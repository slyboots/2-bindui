import { Observable, bindValue } from "./observable.function";

export class DButton {
    constructor(id: string) {
        this._el = document.getElementById(id) as HTMLButtonElement;
        this.valueFocusWatcher = Observable(this._el.value)
        // this._el.innerText = observable(this._el.innerText).toString();
        bindValue(this._el, 'value', 'focus', this.valueFocusWatcher, this._onFocusChange);
    }

    private _el: HTMLButtonElement;
    private valueFocusWatcher: typeof Observable;

    private _onFocusChange(input: any) {
        console.log("Focus changed: " + input);
    }
}