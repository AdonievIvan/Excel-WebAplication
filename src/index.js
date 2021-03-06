import { Excel } from './components/excel/Excel'
import { Header } from './components/header/Header'
import { Toolbar } from './components/Toolbar/Toolbar'
import { Formula } from './components/formula/Formula'
import { Table } from './components/Table/Table'

import './scss/index.scss'

const excel = new Excel('#app',{
    
    components:[Header, Toolbar, Formula, Table]
})

excel.render()
