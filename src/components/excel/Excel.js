import { $ } from "../../core/dom";

export class Excel {
    constructor(selector, options){
        this.$el = document.querySelector(selector);
        this.components = options.components || [];
    }
    getRoot(){
        const $root = $.create('div', 'excel')
        this.components = this.components.map(Component => {
            const $el = $.create('div',Component.className)
            const component = new Component($el)
            //debug//
            if(component.name){
                window['c' + component.name] = component
            }
            //debug//
            $el.html(component.toHtml()) 
            $root.append($el);
            return component          
        })
        return $root;
    }


    render(){
        this.$el.append(this.getRoot().$el)
        this.components.forEach(component => {component.init()})
    }
}

