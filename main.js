var username = 'admin';
var password = 'cinemassive';
var networkManagerUrl = 'http://voyager:25002/CineNet/NetworkManager/';
var accessToken = null;
var refreshToken = null;
var currentDisplayId = null;
var workspaceId = null;
var canvasId = null;

$(document).ready(function () {
    login()
        .then(loadDisplays);
});

function loadDisplays() {
    getFromNetworkManager('Display')
        .done(function (result) {

            console.log("Display JSON returned: " + JSON.stringify(result));

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

function displayClick(linkElement) {
    currentDisplayId = $(linkElement).attr('data-display-id');
    workspaceId = $(linkElement).attr('data-workspace-id');
    canvasId = $(linkElement).attr('data-canvas-id');

    $(".display-dropdown-text").text($(linkElement).text());

    loadLayouts();

    loadAssets();

    loadActions();
}

function login() {
    return getSaml()
        .then(getToken)
        .then(function (response) {
            accessToken = response.access_token;
            refreshToken = response.refresh_token;
        })
        .catch(function (result) {
            alert('ERROR: ' + result.responseText);
        })
}

function getSaml() {
    var body = {
        Username: username,
        Password: password
    };

    return $.ajax({
        type: "POST",
        url: networkManagerUrl + 'IdentityProvider/Login',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(body)
    });
}


function getToken(samlResponse) {
    var body = {
        grant_type: "saml20",
        assertion: btoa(samlResponse)
    };

    return $.ajax({
        type: "POST",
        url: networkManagerUrl + 'Authorization/Token',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: body
    });
}

function updateToken() {
    var body = {
        grant_type: "refresh_token",
        refresh_token: refreshToken
    };

    return $.ajax({
        type: "POST",
        url: networkManagerUrl + 'Authorization/Token',
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: body
    })
        .catch(function (result) {
            alert('ERROR: ' + result.responseText);
        })
        .then(function (result) {
            accessToken = result.access_token;
            refreshToken = result.refresh_token;
        });
}

function getFromNetworkManager(endingUrl) {
    console.log("GET: " + networkManagerUrl + endingUrl);

    return $.ajax({
        type: "GET",
        url: networkManagerUrl + endingUrl,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).catch(function (result) {
        alert('ERROR: ' + result.responseText);
    });
}

function postToNetworkManager(endingUrl, postData) {
    console.log("POST: " + networkManagerUrl + endingUrl);

    var jsonSent = null;

    if (postData) {
        jsonSent = JSON.stringify(postData);

        console.log("JSON postdata sent: " + jsonSent);
    }

    return $.ajax({
        type: "POST",
        url: networkManagerUrl + endingUrl,
        dataType: 'json',
        contentType: 'application/json; charset=UTF-8',
        data: jsonSent,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    });
}

function loadLayouts() {
    getFromNetworkManager('Display/' + currentDisplayId + '/Layout')
        .done(function (layouts) {

            console.log("Layouts JSON returned: " + JSON.stringify(layouts));

            var row = createContainerStructure('.displays');

            var loops = Math.ceil(layouts.length / 3);
            var currentIndex = 0;

            for (var i = 0; i < loops; i++) {

                if (currentIndex > layouts.length) {
                    break;
                }

                addLayoutColumnToRow(row, layouts[currentIndex++]);
                addLayoutColumnToRow(row, layouts[currentIndex++]);
                addLayoutColumnToRow(row, layouts[currentIndex++]);
            }

            addClearLayoutButton(row);
        });
}

function addClearLayoutButton(row) {
    addButtonColumnToRow(row, 'Clear Layout', null, function () {
        updateToken()
            .done(function () {
                var request = {
                    WorkspaceId: workspaceId,
                    CanvasId: canvasId
                };

                postToNetworkManager('Display/' + currentDisplayId + '/Window/Clear', request);
            });
    });
}

function addCreateIpStreamWindowButto(row, chosenIpStreamAsset) {
    addButtonColumnToRow(row, 'Create IP Stream Asset Window', null, function () {
        updateToken()
            .done(function () {
                var request = {
                    AssetData: {IpAddress: chosenIpStreamAsset.IpAddress},
                    AssetId: chosenIpStreamAsset.AssetId,
                    AssetType: "IpStream",
                    CanvasId: canvasId,
                    WorkspaceId: workspaceId,
                    Height: 500,
                    Width: 500,
                    X: 0,
                    Y: 0
                };

                postToNetworkManager('Display/' + currentDisplayId + '/Window', request);
            });
    });
}

function loadActions() {
    var row = createContainerStructure('.actions');

    addCreateIpStreamButton(row);

    getFromNetworkManager('Instance')
        .done(function (instances) {

            console.log("Instances JSON returned: " + JSON.stringify(instances));

            var wallInstance = instances.filter(i => i.InstanceType === "VideoWall")[0];

            getFromNetworkManager('Instance/' + wallInstance.InstanceId + '/NativeApplication/Clock/AllTimeZones')
                .done(function (timezones) {

                    console.log("Timezones JSON returned: " + JSON.stringify(timezones));

                    var selectedTimezone = timezones[getRandomNumber(10)];

                    addCreateClockButton(row, selectedTimezone, wallInstance);
                });

            getFromNetworkManager('AssetManager/Asset')
                .done(function (newAssets) {

                    console.log("Assets JSON returned from Asset Manager: " + JSON.stringify(newAssets));

                    let ipStreamAssets = newAssets.filter(i => i.AssetType === "IpStream");

                    var numberOfIpStreamAssets = ipStreamAssets.count;

                    if (numberOfIpStreamAssets >= 0) {

                        var chosenIpStreamAsset = ipStreamAssets[getRandomNumber(numberOfIpStreamAssets)];

                        addCreateIpStreamWindowButto(row, chosenIpStreamAsset);
                    }
                });

            getFromNetworkManager('Instance/' + wallInstance.InstanceId + '/Assets')
                .done(function (oldAssets) {
                    console.log("Assets JSON returned from Wall: " + JSON.stringify(oldAssets));

                    let clockAssets = oldAssets.filter(i => i.AssetType === "NativeApplication" && i.AssetData.NativeApplicationType === 6);

                    var numberOfClockAssets = clockAssets.count;

                    var chosenClockAsset = clockAssets[getRandomNumber(numberOfClockAssets)];

                    console.log("Chosen clock: " + JSON.stringify(chosenClockAsset));
                });
        });
}

function addCreateIpStreamButton(row) {
    addButtonColumnToRow(row, 'Create IP Stream Asset', null, function () {
        updateToken()
            .done(function () {
                var request = {
                    Name: 'Test IP Stream Asset ' + getRandomNumber(10),
                    IpAddress: "https://youtu.be/BCs-llw8EU4"
                };

                postToNetworkManager('AssetManager/IpStream', request);
            });
    });
}

function addCreateClockButton(row, selectedTimezone, wallInstance) {
    addButtonColumnToRow(row, 'Create Clock Asset', null, function () {
        updateToken()
            .done(function () {
                var request = {
                    Name: 'Test Clock Asset ' + getRandomNumber(10),
                    BackgroundColor: "Red",
                    DateFontColor: "Black",
                    IsTimer: false,
                    LocationFontColor: "DarkBlue",
                    Show24HourTime: true,
                    ShowDate: true,
                    ShowLocation: true,
                    ShowSeconds: true,
                    TimeFontColor: "Yellow",
                    TimerDuration: "0",
                    TimeZoneId: selectedTimezone.Id
                };

                postToNetworkManager('Instance/' + wallInstance.InstanceId + '/NativeApplication/Clock', request);
            });
    });
}

function getRandomNumber(max) {
    return Math.floor((Math.random() * max) + 1);
}

function loadAssets() {
    getFromNetworkManager('AssetManager/Asset')
        .done(function (newAssets) {

            console.log("Assets JSON returned from Asset Manager: " + JSON.stringify(newAssets));

            getFromNetworkManager('Instance')
                .done(function (instances) {

                    console.log("Instances JSON returned: " + JSON.stringify(instances));

                    var wallInstance = instances.filter(i => i.InstanceType === "VideoWall")[0];

                    getFromNetworkManager('Instance/' + wallInstance.InstanceId + '/Assets')
                        .done(function (oldAssets) {
                            console.log("Assets JSON returned from Wall: " + JSON.stringify(oldAssets));

                            var allAssets = newAssets.concat(oldAssets);

                            var row = createContainerStructure('.assets');

                            var loops = Math.ceil(allAssets.length / 3);
                            var currentIndex = 0;

                            for (var i = 0; i < loops; i++) {

                                if (currentIndex > allAssets.length) {
                                    break;
                                }

                                addAssetColumnToRow(row, allAssets[currentIndex++]);
                                addAssetColumnToRow(row, allAssets[currentIndex++]);
                                addAssetColumnToRow(row, allAssets[currentIndex++]);
                            }
                        });
                });
        });
}

function createContainerStructure(containerName) {
    var container = $(containerName);

    container.empty();

    var row = $('<div>');

    row.attr('class', 'row');

    container.append(row);
    return row;
}

function addLayoutColumnToRow(row, layout) {
    if (!layout) {
        return;
    }

    addButtonColumnToRow(row, layout.Name, layout.LayoutId, function (layoutButton) {
        var layoutId = $(layoutButton).attr('data-cineNet-id');

        updateToken()
            .done(function () {
                postToNetworkManager('Display/' + currentDisplayId + '/Layout/' + layoutId + '/Apply');
            });
    });
}

function addAssetColumnToRow(row, asset) {
    if (!asset) {
        return;
    }

    var assetName = asset.AssetData ? asset.AssetData.Name : asset.Name;

    addButtonColumnToRow(row, assetName, asset.AssetId, function () {
        if (asset.AssetType === "CompositeAsset") {
            var request = {
                X: 0,
                Y: 0,
                Width: 500,
                Height: 500,
                AssetType: "CompositeAsset",
                AssetId: asset.AssetId,
                AssetData: {
                    BackColor: asset.BackColor,
                    DesignWidth: asset.DesignWidth,
                    DesignHeight: asset.DesignHeight,
                    Name: asset.Name,
                    ImageElements: asset.ImageElements,
                    InputCaptureElements: asset.InputCaptureElements,
                    TextElements: asset.TextElements,
                    IpxElements: asset.IpxCaptureElements,
                    VideoElements: asset.VideoCaptureElements,
                    OpeningEffect: asset.OpeningEffect,
                    ClosingEffect: asset.ClosingEffect
                }
            };
            postToNetworkManager('Display/' + currentDisplayId + '/Window', request);
        }
        else alert(asset.Name + ' is a/an ' + asset.AssetType + ' asset!');
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