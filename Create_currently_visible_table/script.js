document.addEventListener("DOMContentLoaded", function(){
    init();

    /* Create table */
    function init(){
        let output = '<table class="custom-table">'
                + '<tr>';

        for(let i = 1; i <= 20; i++){
            output += '<th class="colresize">Header ' + i + '</th>';
        }
        output += '</tr>';

        for(let i = 0; i < 3; i++){
            output += '<tr>';
                for(let j = 1; j <= 20; j++){
                    output += '<td>Column ' + j + '</td>';
                }
                output += '</tr>';
        }

        output += '</table>';

        document.querySelector('.table-container').innerHTML = output;
    }
    /* Create table */

    /* Header scroll script */
    let isResizing = false;
    let currentTh = null;
    let initialX = null;
    let originalWidth = null;

    const custom_table = document.querySelector('.custom-table');
    const headers = custom_table.querySelectorAll('.colresize');

    headers.forEach((th, index) => {
        th.style.position = 'relative';
    
        const resizer = document.createElement('div');
        resizer.className = 'resizer';
        resizer.style.position = 'absolute';
        resizer.style.width = '3px';
        resizer.style.height = '100%';
        resizer.style.top = '0';
        resizer.style.right = '0';
        resizer.style.cursor = 'col-resize';
    
        resizer.addEventListener('mousedown', (e) => {
            isResizing = true;
            currentTh = th;
            initialX = e.clientX;
            originalWidth = currentTh.clientWidth;
        });
    
        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
    
            const width = originalWidth + (e.clientX - initialX);
            const minWidth = 80; // 최소 열 너비
            if (width > minWidth) {
            currentTh.style.width = width + 'px';
            }
        });
    
        document.addEventListener('mouseup', () => {
            isResizing = false;
        });
    
        th.appendChild(resizer);
    });
    /* Header scroll script */

    /* Create currently visible table script */
    const tableContainer = document.querySelector('.table-container');
    const customTable = document.querySelector('.custom-table');
    const column_btn = document.querySelector('#column_btn');
    const reset_btn = document.querySelector('#reset_btn');
    const column_num = document.querySelector('#column_num');

    column_btn.addEventListener('click', () => {
        let scrollPosition = tableContainer.scrollLeft;

        const col = document.querySelectorAll('.colresize');
        let col_w_list = new Array;
        let save_col_w_list = new Array;
        for(let i = 0; i < col.length; i++){
            col_w_list[i] = col[i].clientWidth;
            save_col_w_list[i] = col[i].clientWidth;
        }
        
        console.log("scrollPosition = " + scrollPosition);
        while(scrollPosition > 0){
            for(let i = 0; i < col_w_list.length; i++){
                if(col_w_list[i] - scrollPosition > 0){
                    col_w_list[i] -= scrollPosition;
                    scrollPosition = 0;
                }else{
                    scrollPosition -= col_w_list[i];
                    col_w_list[i] = 0;
                }
            }
        }
        
        console.log("save_col_w_list = " + save_col_w_list);
        console.log("col_w_list = " + col_w_list);
        console.log("tableContainer.clientWidth = " + tableContainer.clientWidth);
        console.log("customTable.clientWidth = " + customTable.clientWidth);

        let table_width = tableContainer.clientWidth;
        let firstVisibleColumn = 0;
        let f_b = true;
        let lastVisibleColumn = 0;
        let l_b = true;

        for(let i = 0; i < col_w_list.length; i++){
            if(col_w_list[i] != 0 && f_b){
                firstVisibleColumn = i + 1;
                f_b = false;
            }
            table_width -= col_w_list[i];
            if(table_width < 0 && l_b){
                lastVisibleColumn = i + 1;
                l_b = false
                break;
            }
        }

        if(l_b) lastVisibleColumn = col_w_list.length;
        column_num.innerText = "Currently visible column: from " + firstVisibleColumn + " to " + lastVisibleColumn + "";

        create_visible_table(firstVisibleColumn, lastVisibleColumn, save_col_w_list);
    });
    
    function create_visible_table(f_c, l_c, w_list){
        console.log("create_visible_table w_list" + w_list);
        let output = '<table class="visible-table" style="display: table-row;">'
                    + '<tr>';

        for(let i = f_c; i <= l_c; i++){
            output += '<th width="' + w_list[i - 1] + 'px" style="width:' + w_list[i - 1] + 'px; ">Header ' + i + '</th>';
        }
        output += '</tr>';

        for(let i = 0; i < 3; i++){
            output += '<tr>';
                for(let j = f_c; j <= l_c; j++){
                    output += '<td style="width:'  + w_list[j - 1] + 'px; ">Column ' + j + '</td>';
                }
                output += '</tr>';
        }

        output += '</table>';

        document.querySelector('#create_table_div').innerHTML = output;
    }
    /* Create currently visible table script */

    /* Reset script */
    reset_btn.addEventListener('click', () => {
        const ths = document.querySelectorAll(".colresize");
        
        for(let i = 0; i < ths.length; i++){
            ths[i].style.width = 100 + 'px';
        }

        column_num.innerText = "Currently visible column: ";
        document.querySelector('#create_table_div').innerHTML = "";
    });
    /* Reset script */

});