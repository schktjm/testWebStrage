window.onload = load => {
    init();
}

const puttext = () => {
    let count = localStorage.length;
    const text = document.getElementById('text').value;
    if (('localStorage' in window) && (window.localStorage !== null)) {
        const key = "number" + count.toString();
        localStorage.setItem(key, text);
        console.log("success")
    } else {
        console.log("not success");
    }
    const li = document.createElement('li');
    const lists = document.getElementById('lists');
    li.appendChild(document.createTextNode(text));
    lists.appendChild(li);
    document.getElementById('text').value = "";
}

const clearlog  = () => {
    localStorage.clear();
    // init();
    location.reload();
}

const deleteone = () => {
    localStorage.removeItem(localStorage.key(localStorage.length - 1));
    const lists = document.getElementById('lists');
    lists.removeChild(lists.lastElementChild);
}

const init = () => {
    const lists = document.getElementById('lists');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const li = document.createElement("li");
        const text = document.createTextNode(localStorage.getItem(key));

        li.appendChild(text);
        lists.appendChild(li);
    }
}

