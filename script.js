let dizi = [];
let buton = document.getElementsByTagName("input")[0];
buton.style.cursor = "pointer";

function file() {
    let file = buton.files[0];
    const reeder = new FileReader();
    
    reeder.onload = function (e) {
        try {
            let url = e.target.result;
            let create = document.createElement("video");
            create.src = url;
            create.controls = true;
            buton.value = "";
            create.style.borderRadius = "5px";
            create.style.padding = "10px 10px";
            create.ondblclick = function () {
                let secenek = confirm("Bu öğeyi silmek istediğinden emin misin?");
                if (secenek) {
                    create.remove();
                    dizi.splice(dizi.indexOf(create.src), 1);
                    console.log(dizi);
                    let stringfy = JSON.stringify(dizi);
                    localStorage.setItem('video_url', stringfy);
                    let parse = JSON.parse(localStorage.getItem('video_url') || []);
                }
            };
            document.getElementsByTagName("div")[0].append(create);
            dizi.push(url);
            localStorage.setItem("video_url", JSON.stringify(dizi) || []);
        } catch (error) {
            alert("Dosyanın boyutu yüksek olduğu için kaydedilemedi!");
        }
    };
    
    reeder.readAsDataURL(file);
}

window.addEventListener("load", function () {
    let parse = JSON.parse(localStorage.getItem('video_url') || []);
    for (let i = 0; i < parse.length; i++) {
        let create = document.createElement("video");
        create.src = parse[i];
        create.controls = true;
        create.style.borderRadius = "10px";
        create.style.padding = "10px 10px";
        create.ondblclick = function () {
            let secenek = confirm("Bu öğeyi silmek istediğinden emin misin?");
            if (secenek) {
                create.remove();
                dizi.splice(dizi.indexOf(create.src), 1);
                console.log(dizi);
                let stringfy = JSON.stringify(dizi);
                localStorage.setItem('video_url', stringfy);
                let parse = JSON.parse(localStorage.getItem('video_url') || []);
            }
        };
        document.getElementsByTagName("div")[0].append(create);
    }
    let imgs = document.querySelectorAll("video").forEach(function (event) {
        dizi.push(event.src);
    });
});
