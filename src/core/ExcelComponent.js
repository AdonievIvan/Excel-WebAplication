import { DomListener } from "./DomListener"

export class ExcelComponent extends DomListener {
    constructor($root, options = {}){
        super($root, options.listeners)
        this.name = options.name || ''
    }
    //return a layout of component
    toHtml(){

        return '';
    }

    init(){
        this.initDomListeners()
    }

    destroy(){
        this.removeDomListeners()
    }
}