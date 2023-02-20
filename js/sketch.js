let div, i, span = "";
let numOfH2s = document.querySelectorAll("h2").length

for(let j=0; j<numOfH2s; j++){
    spanThis(j)
}

function spanThis(i) {
    div = document.querySelectorAll("h2")[i];

    start = div.innerHTML.split("<a").shift().split("")
    mid = "<a " + div.innerHTML.split("<a ").pop().split("/a>").shift() + "/a>"
    end = div.innerHTML.split("/a>").pop().split("")

    span = spanner(start) + mid + spanner(end)
    div.innerHTML = span
}

function spanner(a) {
    let spanned = ""

    for (i = 0; i < a.length; i++) {
        if (a[i] !== " " && a[i] !== undefined) {
            spanned += "<span>";
            spanned += a[i];
            spanned += "</span>";
        }
    }

    return spanned
}