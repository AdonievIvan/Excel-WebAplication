import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from "../../core/dom";
//reread

export class Table extends ExcelComponent{
    static className = 'excel__table'
    constructor($root){
        super($root, {
            listeners: ['mousedown']
        })
    }
    toHtml(){
        return createTable(20)
    }

    onMousedown(event){
        if(event.target.dataset.resize){
            const $resizer = $(event.target)
            //-----------------------------------------
            //const $parent = $resizer.$el.parentNode
            //const $parent = $resizer.$el.closest('.column')
            //-----------------------------------------
            const $parent = $resizer.closest('[data-type="resizable"]')
            const cords = $parent.getCords()
            const type = $resizer.data.resize

            console.log($parent.data)
            const cells = this.$root.findAll(`[data-col = "${$parent.data.col}"]`)

            document.onmousemove = e =>{
                if(type == 'col'){
                    const delta = e.pageX - cords.right
                    const value = cords.width + delta
                    $parent.css({width:value + 'px'})
                    cells.forEach(el => el.style.width = value + 'px')
                }
                else{
                    const delta = e.pageY - cords.bottom
                    const value = cords.height + delta

                    $parent.css({height: value + 'px'})
                }
             } 

            document.onmouseup = () =>{
                document.onmousemove = null
            }

        }
    }
}