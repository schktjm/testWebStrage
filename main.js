class StrageService {
    constructor(){}
    check() {
        return ('localStorage' in window) && (window.localStorage !== null); 
    }

    addText(key, text) {
        localStorage.setItem(key, text);
    }

    clearAll() {
        localStorage.clear();
    }

    deleteOne(key) {
        localStorage.removeItem(key);
    }
}

class OperateDOM {
    constructor() {
        // this.lists = document.getElementById('lists');
        // ほかのとこでthis.listsで操作しようとするとできない、なんで
    }

    init() {
        for( let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            this.addToEnd(key, localStorage.getItem(key));
        }
    }

    addToEnd(key, text) {
        // console.log(text);
        const lists = document.getElementById('lists');
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(text));

        const btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'x');
        btn.setAttribute('id', key);
        btn.setAttribute('onclick', 'deleteone(this)');

        li.appendChild(btn);
        lists.appendChild(li);
    }

    clearAll() {
        const lists = document.getElementById('lists');
        while (lists.firstChild) {
            lists.removeChild(lists.firstChild);
        }
    }

    deleteOne(key) {
        const lists = document.getElementById('lists');
        const delBtn = document.getElementById(key);
        const child = delBtn.parentElement;
        const gab = lists.removeChild(child);
    }

}

const strageService = new StrageService();
const operateDOM = new OperateDOM();

window.onload = init => {
    console.log(strageService.check()?'success!':'no success');
    const text = document.getElementById('text');
    const putBtn = document.getElementById('put');
    const clrBtn = document.getElementById('clear');
    operateDOM.init();

    text.addEventListener('keydown', (e) => {
        if( e.keyCode === 13 ) {
            if(isSentence(text.value)) {
                const key = 'key' + makeKey(text.value);
                strageService.addText(key, text.value);
                operateDOM.addToEnd(key, text.value);
                console.log(localStorage);
            }
            text.value = "";
        }
    })

    putBtn.addEventListener('click', () => {
        if (isSentence(text.value)) {
            const key = 'key' + makeKey(text.value);
            strageService.addText(key, text.value);
            operateDOM.addToEnd(key, text.value);
            console.log(localStorage);
        } 
        text.value = "";
    });

    clrBtn.addEventListener('click', () => {
        strageService.clearAll();
        operateDOM.clearAll();
        console.log(localStorage);
    });

    document.getElementById('debug').addEventListener('click', () => {
        console.log(localStorage);
    });
}

const deleteone = (ele) => {
    console.log(ele.id);
    strageService.deleteOne(ele.id);
    operateDOM.deleteOne(ele.id);
}

const makeKey = (text) => {
    const now = Date.now() % 10000;
    // return now.toString().padStart(4,'0');
    return ('00000' + now.toString()).slice(-4);
}

const isSentence = (text) => {
    const exceptionText = /^\s*$/;
    return !(!text || exceptionText.test(text));
}