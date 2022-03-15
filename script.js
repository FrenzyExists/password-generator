const OUTS = 4;
const PLACEHOLDERS = ['❀❀❀❀❀', '❂❂❂❂❂']; // does not work for length % 2 != 0
const LETTERS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    uppercase_special: "ÁÉÍÓÚÑÄÅÏÖËÜ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    lowercase_special: "áéíóúñäåöïëü",
    symbols: `~!@#$%^&*()_+-=[]\{}|;:'",/<>?`,
    numbers: "0123456789"

}
let CHECKS = {};

const input_gen = () => {
    let n = 0
    let a = document.getElementById('inner-bottom-container')
    for (let i = 0; i < OUTS; i++) {
        let input_k = document.createElement('input');
        let wrapper_k = document.createElement('div');
        wrapper_k.className = 'box';
        input_k.id = "in-" + i;
        input_k.placeholder = PLACEHOLDERS[n]
        input_k.type = 'text';
        input_k.tabIndex = -1;
        input_k.className = "input";
        wrapper_k.appendChild(input_k);
        a.appendChild(wrapper_k);
        n = (n + i + 1) % PLACEHOLDERS.length;
    }
}

const copy_password = (box) => {
    let copy_text = box.value;
    navigator.clipboard.writeText(copy_text).then(() => {
        alert("copied to clipboard");
    });
}

const retrieve_checks = (check) => {
    let id = check.id;
    if (id in LETTERS) {
        if (check.checked) {
            console.log(id + " is checked");
            CHECKS[id] = (LETTERS[id]);
        } else {
            delete CHECKS[id]
        }
    }
}

const main = () => {
    Array.from(document.getElementsByClassName('checkmark')).forEach((i) => {
        console.log("Loaded")
        retrieve_checks(i)
        i.addEventListener('change', () => {
            retrieve_checks(i)
        })
    })
    input_gen()
}