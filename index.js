class Excel{
    constructor(content){
        this.content = content
    }
    header(){
        return this.content[0]
    }
    rows(){
        return new RowCollection(this.content.slice(1,this.content.length))
    }
}

class RowCollection{
    constructor(rows){
        this.rows = rows
    }

    first(){
        return new Row(this.rows[0])
          
    }
    
    get(index){
        return new Row(this.rows[index])
    }

    count(){
        return this.rows.length

    }

}

class Row{
    constructor(row){
        this.row = row
    }
    numero(){
        return this.row[0]

    }
    
    linea(){
        return this.row[1]

    }
}

class ExcelPrinter{
    static print(tableId,excel){
        const table = document.getElementById(tableId)
        excel.header().forEach(title=>{
           table.querySelector("thead>tr").innerHTML += `<td>${title}</td>`
        } )

        for (let index = 0; index < excel.rows().count(); index++) {
            const row = excel.rows().get(index);

            table.querySelector("tbody").innerHTML += `
              <tr>
                <td>${row.numero()}</td>
                <td>${row.linea()}</td>
              </tr>
            `
            
        }

    }
}
const excelImput = document.getElementById("excel-input")

excelImput.addEventListener('change', async function(){
    const content = await readXlsxFile(excelImput.files[0])
    
    const excel= new Excel(content)

    console.log(ExcelPrinter.print('excel-table', excel))

    
    
})