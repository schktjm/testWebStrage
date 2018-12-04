class DoTextList {
    constructor(){
        this.lists = localStorage.getItem('key').split(',');
        this.rewrite();
    }

    check() {
        return ('localStorage' in window) && (window.localStorage !== null); 
    }

    addText(text) {
        this.lists.push(text);
        if( this.check )localStorage.setItem('key',this.lists);
        this._clearDOMLists();
        this.rewrite();
    }

    deleteX() {
        
    }


    clearLists() {
        this.lists = [];
        this._clearDOMLists();
        this._clearWebStrageLists();
        this.rewrite();
    }

    _clearDOMLists() {
        const lists = document.getElementById('lists');
        while (lists.firstChild) {
            lists.removeChild(lists.firstChild);
        }
    }
    
    _clearWebStrageLists() {
        localStorage.clear(); 
    }

    rewrite() {
        const list = document.getElementById('lists');
        for(let text of this.lists){
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(text));

            const btn = document.createElement('input');
            btn.setAttribute('type', 'button');
            btn.setAttribute('value', 'x');
            btn.setAttribute('on-click','deltext()');

            li.appendChild(btn);
            list.appendChild(li);
        }
    }
}
const doTestList = new DoTextList();

window.onload = init => {
    console.log(doTestList.check()?'success!':'no success');

    const text = document.getElementById('text');
    const putBtn = document.getElementById('put');
    const clrBtn = document.getElementById('clear');

    putBtn.addEventListener('click', () => {
        doTestList.addText(text.value);
        text.value = "";
    });

    clrBtn.addEventListener('click', () => {
        doTestList.clearLists();
    });
}

const deltext = () => {
    doTestList.deleteX();
}
