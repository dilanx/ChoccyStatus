function refresh() {

    let div = document.getElementById("choccydiv");
    console.log(read(div.getAttribute("choccylink")));
    let j = JSON.parse(read(div.getAttribute("choccylink")));

    let settings = j.settings;

    var color_map = settings.default_color_map;
    var notice_colors = settings.notice_colors;

    let title = document.createElement("p");
    title.setAttribute("class", "choccytitle");
    title.textContent = j.title;
    div.appendChild(title);

    let notices = j.notices;

    for (let i = 0; i < notices.length; i++) {

        let color = notice_colors[notices[i].color];
        let ele = document.createElement("div");
        ele.setAttribute("class", "choccynoticetitle");
        ele.style.backgroundColor = color;
        ele.textContent = notices[i].title;

        div.appendChild(ele);

        let ele2 = document.createElement("div");
        ele2.setAttribute("class", "choccynotice");
        ele2.style.border = "1px solid " + color;
        let p = document.createElement("p");
        p.setAttribute("class", "choccynoticetext");
        p.textContent = notices[i].text;
        ele2.appendChild(p);

        div.appendChild(ele2);



    }



    let blocks = j.blocks;

    for (let i = 0; i < blocks.length; i++) {

        let thisBlock = blocks[i];

        let p = document.createElement("p");
        p.setAttribute("class", "choccyblocktitle");
        p.textContent = thisBlock.section_name;
        div.appendChild(p);

        let ele = document.createElement("div");
        ele.setAttribute("class", "choccyblock");

        let content = thisBlock.content;

        for (let j = 0; j < content.length; j++) {

            let ele2 = document.createElement("div");
            ele2.setAttribute("class", "choccyservice");

            let name = document.createElement("p");
            name.setAttribute("class", "choccyservicename");
            name.textContent = content[j].name;
            ele2.appendChild(name);

            let status = document.createElement("p");
            status.setAttribute("class", "choccyservicestatus");
            let s = content[j].status;
            status.textContent = s;
            if (s in color_map) status.style.color = color_map[s];
            ele2.appendChild(status);

            if ("description" in content[j]) {

                let desc = document.createElement("p");
                desc.setAttribute("class", "choccyservicedesc");
                desc.textContent = content[j].description;
                ele2.appendChild(desc);
            }
            ele.appendChild(ele2);

        }

        div.appendChild(ele);

    }

    let credits = document.createElement("a");
    credits.setAttribute("class", "choccybranding");
    credits.setAttribute("href", "/");
    credits.textContent = "Powered by ChoccyStatus.";
    div.appendChild(credits);


}

function read(file) {

  var result = null;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.open("GET", file, false);
  xmlhttp.send();

  if (xmlhttp.status == 200) {
    result = xmlhttp.responseText;
  }

  return result;
}