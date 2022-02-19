function load() {

    let div = document.getElementById('choccy-div');

    let footerDiv = document.createElement('div');
    footerDiv.className = 'cs-footer';
    let watermark = document.createElement('p');
    watermark.className = 'cs-watermark';
    let watermarkLink = document.createElement('a');
    watermarkLink.textContent = 'Powered by ChoccyStatus';
    watermarkLink.href = 'https://github.com/dilanx/ChoccyStatus';
    watermark.appendChild(watermarkLink);
    footerDiv.appendChild(watermark);

    let data = null;
    try {
        data = JSON.parse(read(div.getAttribute('data')));
    } catch (e) {
        div.appendChild(error('JSON parse error', e));
        div.appendChild(footerDiv);
        return;
    }

    var colorMap = data.settings.default_color_map;
    var noticeColors = data.settings.notice_colors;

    let headerDiv = document.createElement('div');
    headerDiv.className = 'cs-header';
    let title = document.createElement('p');
    title.className = 'cs-title';
    title.textContent = data.title;
    headerDiv.appendChild(title);
    div.appendChild(headerDiv);

    let notices = data.notices;

    for (let i = 0; i < notices.length; i++) {

        let notice = notices[i];

        let noticeDiv = document.createElement('div');
        noticeDiv.className = 'cs-notice';

        let noticeTitleDiv = document.createElement('div');
        noticeTitleDiv.className = 'cs-notice-title';
        let noticeTitle = document.createElement('p');
        noticeTitle.textContent = notice.title;
        noticeTitleDiv.appendChild(noticeTitle);
        noticeDiv.appendChild(noticeTitleDiv);

        let contentsDiv = document.createElement('div');
        contentsDiv.className = 'cs-notice-contents';

        let contents = notice.contents;

        for (let j = 0; j < contents.length; j++) {

            let noticeContentsP = document.createElement('p');
            noticeContentsP.innerHTML = contents[j];
            contentsDiv.appendChild(noticeContentsP);

        }

        noticeDiv.appendChild(contentsDiv);

        if (notice.color in noticeColors) {
            let color = noticeColors[notice.color];
            noticeDiv.style.borderColor = color;
            noticeDiv.style.setProperty('--link-color', color);
            noticeTitleDiv.style.backgroundColor = color;
        }

        div.appendChild(noticeDiv);

    }

    let sections = data.sections;

    for (let i = 0; i < sections.length; i++) {

        let section = sections[i];

        let sectionDiv = document.createElement('div');
        sectionDiv.className = 'cs-section';

        let sectionNameDiv = document.createElement('div');
        sectionNameDiv.className = 'cs-section-name';
        let sectionName = document.createElement('p');
        sectionName.textContent = section.name;
        sectionNameDiv.appendChild(sectionName);
        sectionDiv.appendChild(sectionNameDiv);

        let contentsList = document.createElement('ul');
        contentsList.className = 'cs-contents';

        let contents = section.contents;

        for (let j = 0; j < contents.length; j++) {

            let service = contents[j];

            let status = null;

            let serviceItem = document.createElement('li');
            serviceItem.className = 'cs-service';

            let statusDiv = document.createElement('div');
            statusDiv.className = 'cs-status';
            let statusName = document.createElement('p');
            statusName.className = 'cs-status-name';
            statusName.textContent = service.name;
            statusDiv.appendChild(statusName);

            let statusStatus = document.createElement('p');
            statusStatus.className = 'cs-status-status';
            statusDiv.appendChild(statusStatus);

            serviceItem.appendChild(statusDiv);

            if (service.request) {
                let loaded = read(service.request.url);
                status = (loaded ? service.request.success : service.request.failure);
            }

            if (service.minecraft) {

                let mcData = JSON.parse(read('https://api.mcsrvstat.us/2/' + service.minecraft.ip));

                status = mcData.online ? 'Online' : 'Offline';

                let mcn = service.minecraft.name;
                let mcd = service.minecraft.description;
                let mcpc = service.minecraft.show_player_count;
                let mcpn = service.minecraft.show_player_names;

                if (mcn || mcd || mcpc) {

                    let minecraftDiv = document.createElement('div');
                    minecraftDiv.className = 'cs-mc';

                    if (mcn || mcd) {
                        let minecraftDescription = document.createElement('p');
                        minecraftDescription.className = 'cs-mc-description';
                        if (mcn) {
                            let minecraftName = document.createElement('span');
                            minecraftName.className = 'cs-mc-name';
                            minecraftName.textContent = mcn;
                            minecraftDescription.appendChild(minecraftName);
                        }
                        if (mcd) {
                            minecraftDescription.appendChild(document.createTextNode((mcn ? ' ' : '') + mcd));
                        }
                        minecraftDiv.appendChild(minecraftDescription);
                    }
                    if (mcpc && mcData.online) {
                        let minecraftPlayers = document.createElement('p');
                        minecraftPlayers.className = 'cs-mc-players';
                        let mcCount = mcData.players.online;
                        if (mcCount === 0) {
                            minecraftPlayers.textContent = 'No players online';
                        } else {
                            let mcCountStr = `${mcCount} player${mcCount > 1 ? 's' : ''} online`;
                            if (mcpn) {
                                let mcList = mcData.players.list;
                                let mcListStr = mcList[0];
                                for (let i = 1; i < mcList.length; i++) mcListStr += ', ' + mcList[i];
                                let minecraftCount = document.createElement('span');
                                minecraftCount.className = 'cs-mc-count';
                                minecraftCount.textContent = mcCountStr;
                                minecraftPlayers.appendChild(minecraftCount);
                                minecraftPlayers.appendChild(document.createTextNode(' - ' + mcListStr));
                            } else {
                                minecraftPlayers.textContent = mcCountStr;
                            }
                        }
                        minecraftDiv.appendChild(minecraftPlayers);
                    }

                    serviceItem.appendChild(minecraftDiv);

                }

            }

            if (!status) status = service.status;

            if (status in colorMap) {
                statusStatus.style.color = colorMap[status];
            }
            statusStatus.textContent = status;

            if (service.description) {
                let description = document.createElement('p');
                description.className = 'cs-description';
                description.textContent = service.description;
                serviceItem.appendChild(description);
            }

            contentsList.appendChild(serviceItem);

        }

        sectionDiv.appendChild(contentsList);

        div.appendChild(sectionDiv);

    }

    div.appendChild(footerDiv);

}

function error(title, text) {

    let noticeDiv = document.createElement('div');
    noticeDiv.className = 'cs-notice';

    let noticeTitleDiv = document.createElement('div');
    noticeTitleDiv.className = 'cs-notice-title';
    let noticeTitle = document.createElement('p');
    noticeTitle.textContent = title;
    noticeTitleDiv.appendChild(noticeTitle);
    noticeDiv.appendChild(noticeTitleDiv);

    let contentsDiv = document.createElement('div');
    contentsDiv.className = 'cs-notice-contents';

    let noticeContentsP = document.createElement('p');
    noticeContentsP.textContent = text;
    contentsDiv.appendChild(noticeContentsP);

    noticeDiv.appendChild(contentsDiv);

    return noticeDiv;

}

function read(file) {
    var result = null;
    try {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', file, false);
        xmlhttp.send();
        code = xmlhttp.status;
        if (code === 200) {
            result = xmlhttp.responseText;
        }
    } catch (e) {

    }
    return result;
}