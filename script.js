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
let password_boxes = [];

const input_gen = () => {
    let n = 0
    let a = document.getElementById('inner-bottom-container')
    for (let i = 0; i < OUTS; i++) {
        let input_k = document.createElement('input');
        let wrapper_k = document.createElement('div');
        wrapper_k.className = 'box';
        input_k.id = "in-" + i;
        password_boxes.push(input_k.id);
        input_k.placeholder = PLACEHOLDERS[n]
        input_k.type = 'text';
        input_k.tabIndex = -1;
        input_k.className = "input";
        wrapper_k.appendChild(input_k);
        a.appendChild(wrapper_k);
        n = (n + i + 1) % PLACEHOLDERS.length;
    }
    delete n;
    delete a;
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

// From the MDN Documentation
function remove_notification() {
    return new Promise(() => {
        setTimeout(() => {
            document.querySelector('.notification').classList.remove('active');
        }, 2000);
    });
}

async function trigger_notification() {
    document.querySelector('.notification').classList.add('active')
    var x = await remove_notification();
    x
}

const gen = () => {
    let length = document.getElementById('password-length').value;
    password_boxes.forEach((i) => {
        document.getElementById(i).value = ap(length)
    })


}

const ap = (length) => {
    let combined = Object.keys(CHECKS).map((i) => {
        return CHECKS[i];
    })
    let m = ""
    let combined_length = combined.length
    for (var i = 0; i < length; i++) {
        // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
        let c = combined[combined_length * Math.random() | 0]
        m += c[c.length * Math.random() | 0]
    }
    return m;
}

const main = () => {
    Array.from(document.getElementsByClassName('checkmark')).forEach((i) => {
        console.log("Loaded")
        retrieve_checks(i)
        i.addEventListener('change', () => {
            retrieve_checks(i)
        })
    })

    document.getElementById("password-length").addEventListener("input", (event) => {
        let value = event.target.value;
        document.getElementById("current").innerText = value;
        document.getElementById("current").style.left = ` ${ 10+80*value/64  }%`
    });

    input_gen()
    Array.from(document.getElementsByClassName('box')).forEach((i) => {
        i.addEventListener('click', () => {
            navigator.clipboard.writeText(i.childNodes[0].value)
            if (i.childNodes[0].value) {
                trigger_notification()
            }
        })
    })
}