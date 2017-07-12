var username = 'admin';
var password = 'cinemassive';
var networkManagerUrl = 'http://CineSouth:25002/CineNet/NetworkManager/';
var accessToken = null;
var currentDisplayId = null;
var workspaceId = null;
var canvasId = null;

$(document).ready(function () {

    getToken().done(function (result) {
        accessToken = result.access_token;
        loadDisplays();
    }).fail(function (result) {
        alert('ERROR: ' + result.responseText);
    });
});

function loadDisplays() {
    getFromNetworkManager('Display')
        .done(function (result) {

            var displayList = $('.display-selection');

            if (displayList) {

                var first = true;

                result.forEach(function (display) {
                    var listItem = $('<li>');

                    var linkItem = $('<div>');

                    linkItem.on('click', function () {
                        displayClick(this);
                    });

                    linkItem.attr('data-display-id', display.DisplayId);
                    linkItem.attr('data-workspace-id', display.WorkspaceId);
                    linkItem.attr('data-canvas-id', display.CanvasId);

                    linkItem.attr('class', 'display-selection-item');

                    linkItem.text(display.Name);

                    listItem.append(linkItem);

                    displayList.append((listItem));

                    if (first) {
                        displayClick(linkItem);
                        first = false;
                    }
                });
            }
        })
        .fail(function (result) {
            alert('ERROR: ' + result.responseText);
        });
}

function getToken() {

    var body = {
        grant_type: 'password',
        username: username,
        password: password
    };

    return $.ajax({
        type: "POST",
        url: networkManagerUrl + 'AuthenticationService/Token',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: body
    });
}

function getFromNetworkManager(endingUrl) {
    console.log(networkManagerUrl + endingUrl);

    return $.ajax({
        type: "GET",
        url: networkManagerUrl + endingUrl,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
}

function postToNetworkManager(endingUrl, postData) {
    console.log(networkManagerUrl + endingUrl);

    var json = null;

    if (postData) {
        json = JSON.stringify(postData);
    }

    return $.ajax({
        type: "POST",
        url: networkManagerUrl + endingUrl,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: json,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
}

function displayClick(linkElement) {

    currentDisplayId = $(linkElement).attr('data-display-id');
    workspaceId = $(linkElement).attr('data-workspace-id');
    canvasId = $(linkElement).attr('data-canvas-id');

    $(".display-dropdown-text").text($(linkElement).text());

    loadLayouts();
}

function loadLayouts() {
    getFromNetworkManager('Display/' + currentDisplayId + '/Layout')
        .done(function (layouts) {

            var container = $('.display-actions');

            container.empty();

            var loops = Math.ceil(layouts.length / 3);
            var currentIndex = 0;

            var row = $('<div>');

            row.attr('class', 'row');

            container.append(row);

            for (var i = 0; i < loops; i++) {

                if (currentIndex > layouts.length) {
                    break;
                }

                addLayoutColumnToRow(row, layouts[currentIndex++]);
                addLayoutColumnToRow(row, layouts[currentIndex++]);
                addLayoutColumnToRow(row, layouts[currentIndex++]);
            }

            addButtonColumnToRow(row, 'Clear', null, function (clearButton) {
                getToken()
                    .done(function (result) {
                        accessToken = result.access_token;

                        var request = {
                            WorkspaceId: workspaceId,
                            CanvasId: canvasId
                        };

                        postToNetworkManager('Display/' + currentDisplayId + '/Window/Clear', request);
                    });
            });
        });
}

function addLayoutColumnToRow(row, layout) {
    if (!layout) {
        return;
    }

    addButtonColumnToRow(row, layout.Name, layout.LayoutId, function (layoutButton) {
        var layoutId = $(layoutButton).attr('data-cineNet-id');

        getToken()
            .done(function (result) {
                accessToken = result.access_token;

                postToNetworkManager('Display/' + currentDisplayId + '/Layout/' + layoutId + '/Apply');
            });
    });
}

function addButtonColumnToRow(row, text, dataId, clickFunction) {
    var column = $('<div>');
    column.attr('class', 'col-sm-4');

    var button = $('<button>');

    button.attr('class', 'btn-primary layout-action-button btn-block');
    button.attr('data-cineNet-id', dataId);

    button.on('click', function () {
        clickFunction(this);
    });

    button.text(text);

    column.append(button);

    row.append(column);
}