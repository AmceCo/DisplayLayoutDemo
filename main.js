var username = 'admin';
var password = 'cinemassive';
var networkManagerUrl = 'http://localhost:25002/CineNet/NetworkManager/';
var accessToken = null;
var refreshToken = null;
var currentDisplayId = null;
var workspaceId = null;
var canvasId = null;

$(document).ready(function () {
	login()
		.then(loadInstances)
		.then(loadDisplays);
});

function loadInstances() {
	getFromNetworkManager('Instance')
		.done(function (result) {

			console.log("Display JSON returned: " + JSON.stringify(result));

			/*
			Example of JSON returned for Get Instance call
			[
				{
					"ApiEndpoint":"http://localhost:25015/CineNet/Activity",
					"InstanceId":"94771a29-7a92-448c-8e07-7ee0854429e2",
					"InstanceName":"Activity",
					"InstanceType":"Activity",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25004/CineNet/AlphaControl",
					"InstanceId":"a1330a98-16a3-401f-98d4-9f0c7af4c8a7",
					"InstanceName":"AlphaControl",
					"InstanceType":"AlphaControl",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25011/CineNet/Wall",
					"InstanceId":"f455efa8-310b-4a07-939f-de8dc0498898",
					"InstanceName":"localhost Alpha",
					"InstanceType":"Wall",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"BackwardsCompatibilityOnly|f455efa8-310b-4a07-939f-de8dc0498898",
					"InstanceId":"008d2a6f-867a-4e66-a26c-8c77be8c97c1",
					"InstanceName":"localhost Alpha",
					"InstanceType":"VideoWall",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25009/CineNet/Authorization",
					"InstanceId":"49feadfe-0692-4d4e-97ad-4bfdde4a4a1c",
					"InstanceName":"Authorization",
					"InstanceType":"Authorization",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25017/CineNet/Chat",
					"InstanceId":"11d5706b-1e7f-4b62-99d3-b8434cde8053",
					"InstanceName":"Chat",
					"InstanceType":"Chat",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25591/CineNet/CineAgent",
					"InstanceId":"ecbdb3b7-f124-4284-aba2-e1ab68e73fc6",
					"InstanceName":"localhost CineAgent",
					"InstanceType":"CineAgent",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25342/CineNet/CineAgentPoolManager",
					"InstanceId":"9a097ba6-236e-46ab-856d-fb9b496114f7",
					"InstanceName":"CineAgentPoolManager",
					"InstanceType":"CineAgentPoolManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25051/CineNet/DeviceControl",
					"InstanceId":"af3d5a4c-424c-45e7-b4f8-2b9d739c498f",
					"InstanceName":"Device Control",
					"InstanceType":"DeviceControl",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25690/CineNet/FileTransporter",
					"InstanceId":"b84528e2-dc40-44c1-a878-78d8cff37480",
					"InstanceName":"FileTransporter",
					"InstanceType":"FileTransporter",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25008/CineNet/IdentityProvider",
					"InstanceId":"0243e22c-0712-493e-bdfc-926c8f6f9f3b",
					"InstanceName":"IdentityProvider",
					"InstanceType":"IdentityProvider",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25867/CineNet/Licensing",
					"InstanceId":"24c683e0-24c5-4881-9cc0-0bc2af744fd1",
					"InstanceName":"Licensing",
					"InstanceType":"Licensing",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25150/CineNet/RoomService",
					"InstanceId":"968a77d3-1350-4cb1-96ec-76eadb893a47",
					"InstanceName":"RoomService",
					"InstanceType":"RoomService",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25250/CineNet/Streaming",
					"InstanceId":"c3c29909-3124-48f9-b7bc-93edfb9a8463",
					"InstanceName":"Streaming",
					"InstanceType":"Streaming",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25018/CineNet/StreamingEngineCommunicator",
					"InstanceId":"cfe61c63-57dc-49e6-a1c6-916585267971",
					"InstanceName":"StreamingEngineCommunicator",
					"InstanceType":"StreamingEngineCommunicator",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25016/CineNet/UserState",
					"InstanceId":"bb25341f-67e3-4b01-85e5-800ef27c16e2",
					"InstanceName":"UserState",
					"InstanceType":"UserState",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25200/CineNet/VncConnector",
					"InstanceId":"11a129a8-2e9a-492b-8a48-c14af464a4ae",
					"InstanceName":"VncConnector",
					"InstanceType":"VncConnector",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25003/CineNet/WebServerManager",
					"InstanceId":"e891a153-ce57-4603-a40d-70f7d0abf787",
					"InstanceName":"WebServerManager",
					"InstanceType":"WebServerManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25014/CineNet/DeviceManager",
					"InstanceId":"fdecd34c-191a-43cf-8865-4e70afa61a9b",
					"InstanceName":"DeviceManager",
					"InstanceType":"DeviceManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25013/CineNet/WallAsset",
					"InstanceId":"c3b7e874-b2d1-47e0-9787-700809d4b38e",
					"InstanceName":"WallAsset",
					"InstanceType":"WallAsset",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost:25005/CineNet/AssetManager",
					"InstanceId":"0b9dbe4e-6e06-4df8-83fe-2041c82be7f0",
					"InstanceName":"AssetManager",
					"InstanceType":"AssetManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25010/CineNet/DesktopStreamsMonitor",
					"InstanceId":"059875cd-7b0a-433c-8cc4-8b0261ba05ef",
					"InstanceName":"DesktopStreamsMonitor",
					"InstanceType":"DesktopStreamsMonitor",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25006/CineNet/Displays",
					"InstanceId":"b15fdba9-a252-486e-9f99-15c8437c8075",
					"InstanceName":"Displays",
					"InstanceType":"Displays",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost:25800/CineNet/Behaviors",
					"InstanceId":"f4119012-5461-40b7-9175-b76474110d91",
					"InstanceName":"Behaviors",
					"InstanceType":"Behaviors",
					"IsPassThrough":true
				}
			]
			*/
			
		});
}


function loadDisplays() {
	getFromNetworkManager('Display')
		.done(function (result) {

			console.log("Display JSON returned: " + JSON.stringify(result));

			/*
			Example of JSON returned for Get Display call
			[
				{
					"CanvasId":"94042a78-3b44-43da-bfe8-765c99558d0c",
					"DisplayType":"Render",
					"GpuInformation":{
						"Height":1080,
						"Index":0,
						"Width":1920,
						"X":0,
						"Y":0
					},
					"WorkspaceId":"94042a78-3b44-43da-bfe8-765c99558d0c",
					"Columns":1,
					"DisplayId":"94042a78-3b44-43da-bfe8-765c99558d0c",
					"Height":1080,
					"Left":0,
					"Name":"1",
					"Panels":[
						{
							"Height":1080,
							"Width":1920,
							"X":0,
							"Y":0
						}
					],
					"Rows":1,
					"Top":0,
					"WallInstanceId":"008d2a6f-867a-4e66-a26c-8c77be8c97c1",
					"Width":1920,
					"BackgroundAssetId":"00000000-0000-0000-0000-000000000000"
				}
			]
			*/

			var displayList = $('.display-selection');

			if (displayList) {

				var first = true;

				result.forEach(function (display) {
					var listItem = $('<li>');

					var linkItem = $('<div>');

					linkItem.on('click', function () {
						displayClick(linkItem);
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
			if (result.status !== 200) {
				alert('ERROR: ' + result.statusText + ' | ' + result.responseText);
			}
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

	loadWallInfo();

}

function login() {
	return getSaml()
		.then(getToken)
		.then(function (response) {
			accessToken = response.access_token;
			refreshToken = response.refresh_token;
		})
		.catch(function (result) {
			if (result.status !== 200) {
				alert('ERROR: ' + result.statusText + ' | ' + result.responseText);
			}
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
			if (result.status !== 200) {
				alert('ERROR: ' + result.statusText + ' | ' + result.responseText);
			}
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
		if (result.status !== 200) {
			alert('ERROR: ' + result.statusText + ' | ' + result.responseText);
		}
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
	}).catch(function (result) {
		if (result.status !== 200) {
			alert('ERROR: ' + result.statusText + ' | ' + result.responseText);
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
	addButtonColumnToRow(row, 'Clear Wall', null, function () {
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

function loadWallInfo() {
	getFromNetworkManager('Instance')
		.done(function (instances) {

			console.log("Instances JSON returned: " + JSON.stringify(instances));

			var wallInstance = instances.filter(i => i.InstanceType === "VideoWall")[0];

			getFromNetworkManager('Instance/' + wallInstance.InstanceId + '/Wall')
				.done(function (wallInfo) {
					console.log("Wall info JSON returned: " + JSON.stringify(wallInfo));

					var wallInfoElement = document.getElementsByClassName("wallInfo")[0];

					wallInfoElement.innerHTML = "Dimensions (H x V): " + wallInfo.HorizontalResolution + " x " + wallInfo.VerticalResolution
						+ "<br />" + "Horizontal Panels: " + wallInfo.HorizontalPanels
						+ "<br />" + "Vertical Panels: " + wallInfo.VerticalPanels;
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
		});

	addGetWindowInfoButton(row);

	addCloseWindowButton(row);

	addUpdateWindowButton(row);
}

function addUpdateWindowButton(row) {
	let originalWindowDimensions = {};
	addButtonColumnToRow(row, 'Update Window', null, function () {
		updateToken()
			.done(function () {
				getFromNetworkManager('Display/' + currentDisplayId + '/Window')
					.done(function (windowInfo) {
						console.log("Window info JSON returned: " + JSON.stringify(windowInfo));

						originalWindowDimensions = {
							Height: windowInfo[0].Height,
							Width: windowInfo[0].Width,
							X: windowInfo[0].X,
							Y: windowInfo[0].Y
						};

						var request = {
							ContentWindows: [windowInfo[0]]
						};

						postToNetworkManager('Display/' + currentDisplayId + '/Window/Close', request);

						getFromNetworkManager('AssetManager/Asset')
							.done(function (assets) {

								var request = {
									AssetData: {IpAddress: assets[0].IpAddress},
									AssetId: assets[0].AssetId,
									AssetType: assets[0].AssetType,
									CanvasId: canvasId,
									WorkspaceId: workspaceId,
									Height: originalWindowDimensions.Height,
									Width: originalWindowDimensions.Width,
									X: originalWindowDimensions.X,
									Y: originalWindowDimensions.Y
								};

								postToNetworkManager('Display/' + currentDisplayId + '/Window', request);
							})
					});
			});
	});
}

function addCloseWindowButton(row) {
	addButtonColumnToRow(row, 'Close Window', null, function () {
		updateToken()
			.done(function () {
				getFromNetworkManager('Display/' + currentDisplayId + '/Window')
					.done(function (windowInfo) {
						console.log("Window info JSON returned: " + JSON.stringify(windowInfo));

						var request = {
							ContentWindows: [windowInfo[0]]
						};

						postToNetworkManager('Display/' + currentDisplayId + '/Window/Close', request);
					});
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

function addGetWindowInfoButton(row) {
	addButtonColumnToRow(row, 'Get Info for Windows', null, function () {
		updateToken()
			.done(function () {
				getFromNetworkManager('Display/' + currentDisplayId + '/Window')
					.done(function (windowInfo) {
						console.log("Window info JSON returned: " + JSON.stringify(windowInfo));

						var windowInfoElement = document.getElementsByClassName("windowInfo")[0];

						windowInfoElement.innerHTML = "";

						for (var i = 0; i < windowInfo.length; i++) {

							windowInfoElement.innerHTML += "AssetName: " + windowInfo[i].AssetName + "<br />" +
								"Height: " + windowInfo[i].Height + "<br />" +
								"Width: " + windowInfo[i].Width + "<br />" +
								"X: " + windowInfo[i].X + "<br />" +
								"Y: " + windowInfo[i].Y + "<br />" +
								"WindowType: " + windowInfo[i].WindowType + "<br />" + "<hr>";
						}
					});
			});
	});
}

function getRandomNumber(max) {
	return Math.floor((Math.random() * max) + 1);
}

function loadAssets() {
	getFromNetworkManager('AssetManager/Asset')
		.done(function (assets) {

			console.log("Assets JSON returned from Asset Manager: " + JSON.stringify(assets));

			var row = createContainerStructure('.assets');

			var loops = Math.ceil(allAssets.length / 3);
			var currentIndex = 0;

			for (var i = 0; i < loops; i++) {

				if (currentIndex > assets.length) {
					break;
				}

				addAssetColumnToRow(row, assets[currentIndex++]);
				addAssetColumnToRow(row, assets[currentIndex++]);
				addAssetColumnToRow(row, assets[currentIndex++]);
			}
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

	addButtonColumnToRow(row, "Overwrite " + layout.Name, layout.LayoutId, function (layoutButton) {
		var layoutId = $(layoutButton).attr('data-cineNet-id');

		updateToken()
			.done(function () {
				postToNetworkManager('Display/' + currentDisplayId + '/Layout/' + layoutId + '/Overwrite');
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
			createCompositeAssetWindow(asset);
		}
		else if (asset.AssetType === "NativeApplication") {
			createClockWindow(asset);
		}
		else if (asset.AssetType === "IpStream") {
			createIpStreamWindow(asset);
		}
		else if (asset.AssetType === "Input") {
			createInputWindow(asset);
		}
		else alert(assetName + ' is a/an ' + asset.AssetType + ' asset!');
	});
}

function createInputWindow(asset) {
	updateToken()
		.done(function () {
			var request = {
				AssetId: asset.AssetId,
				AssetType: asset.AssetType,
				CanvasId: canvasId,
				WorkspaceId: workspaceId,
				Height: 500,
				Width: 500,
				X: 0,
				Y: 0
			};

			postToNetworkManager('Display/' + currentDisplayId + '/Window', request);
		});
}

function createIpStreamWindow(asset) {
	updateToken()
		.done(function () {
			var request = {
				AssetData: {IpAddress: asset.IpAddress},
				AssetId: asset.AssetId,
				AssetType: asset.AssetType,
				CanvasId: canvasId,
				WorkspaceId: workspaceId,
				Height: 500,
				Width: 500,
				X: 50,
				Y: 50
			};

			postToNetworkManager('Display/' + currentDisplayId + '/Window', request);
		});
}

function createClockWindow(asset) {
	updateToken()
		.done(function () {
			var request = {
				AssetId: asset.AssetId,
				AssetType: asset.AssetType,
				CanvasId: canvasId,
				WorkspaceId: workspaceId,
				Height: 500,
				Width: 500,
				X: 100,
				Y: 100
			};

			postToNetworkManager('Display/' + currentDisplayId + '/Window', request);
		});
}

function createCompositeAssetWindow(asset) {
	updateToken()
		.done(function () {
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