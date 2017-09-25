import "./index.scss";
import { DButton } from "./lib/button.class";
import { Observable } from './lib/observable.function'
declare global {
    interface Window { dwl: any; }
}

window.dwl = window.dwl || {};
export class DWL {
    constructor() { window.alert('blah'); }
}
const dl = new DWL();
const dbutton1 = new DButton('b1');
window.dwl['dbutton1'] = dbutton1;

// export * from "./lib/observable.function";
// export * from "./lib/button.class";