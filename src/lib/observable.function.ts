export function Observable(value?: any) {
    var listeners: any[] = [];
  
    function notify(newValue: any) {
      listeners.forEach(function(listener: any){ listener(newValue); });
    }
  
    function accessor(newValue: any) {
      if (arguments.length && newValue !== value) {
        value = newValue;
        notify(newValue);
      }
      return value;
    }
  
    (accessor as any).subscribe = function(listener: any) { listeners.push(listener); };
  
    return accessor as any;
  }

export function bindValue(input: Element, property: string, event: string, observable: any, callback: (i?: any) => void) {
    const initial: any = observable();
    input[property] = initial;
    observable.subscribe(function () { input[property] = observable(); });

    var converter = (v: any) => { return v; };
    if (typeof initial == 'number') {
        converter = (n: any) => { return isNaN(n = parseFloat(n)) ? 0 : n; };
    }

    input.addEventListener(event, function () {
        callback(observable(converter(input[property])))
    });
}
export function computed(calculation: any, dependencies: any) {
    // start with the initial value
    const value = Observable(calculation());

    // register a listener for each dependency, that updates the value
    function listener() { value(calculation()); }
    dependencies.forEach(function (dependency: any) {
        dependency.subscribe(listener);
    });

    // now, wrap the value so that users of computed() can't manually update the value
    function getter() { return (value as any)(); }
    (getter as any).subscribe = (value as any).subscribe;

    return getter;
}