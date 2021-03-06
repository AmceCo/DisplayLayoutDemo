var username = 'admin';
var password = 'cinemassive';
var networkManagerUrl = 'http://localhost/CineNet/NetworkManager/';
var accessToken = null;
var refreshToken = null;
var currentDisplayId = null;
var workspaceId = null;
var canvasId = null;
var instances = null;

$(document).ready(function () {
	login()
		.then(loadInstances)
		.then(loadDisplays)
		.then(loadBehaviors);
});

function loadInstances() {
	getFromNetworkManager('Instance')
		.done(function (result) {

			console.log("Display JSON returned: " + JSON.stringify(result));

			/*
			Example of JSON returned from Get Instance call
			[
				{
					"ApiEndpoint":"http://localhost/CineNet/Activity",
					"InstanceId":"94771a29-7a92-448c-8e07-7ee0854429e2",
					"InstanceName":"Activity",
					"InstanceType":"Activity",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/AlphaControl",
					"InstanceId":"a1330a98-16a3-401f-98d4-9f0c7af4c8a7",
					"InstanceName":"AlphaControl",
					"InstanceType":"AlphaControl",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/Wall",
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
					"ApiEndpoint":"http://localhost/CineNet/Authorization",
					"InstanceId":"49feadfe-0692-4d4e-97ad-4bfdde4a4a1c",
					"InstanceName":"Authorization",
					"InstanceType":"Authorization",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/Chat",
					"InstanceId":"11d5706b-1e7f-4b62-99d3-b8434cde8053",
					"InstanceName":"Chat",
					"InstanceType":"Chat",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/CineAgent",
					"InstanceId":"ecbdb3b7-f124-4284-aba2-e1ab68e73fc6",
					"InstanceName":"localhost CineAgent",
					"InstanceType":"CineAgent",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/CineAgentPoolManager",
					"InstanceId":"9a097ba6-236e-46ab-856d-fb9b496114f7",
					"InstanceName":"CineAgentPoolManager",
					"InstanceType":"CineAgentPoolManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/DeviceControl",
					"InstanceId":"af3d5a4c-424c-45e7-b4f8-2b9d739c498f",
					"InstanceName":"Device Control",
					"InstanceType":"DeviceControl",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/FileTransporter",
					"InstanceId":"b84528e2-dc40-44c1-a878-78d8cff37480",
					"InstanceName":"FileTransporter",
					"InstanceType":"FileTransporter",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/IdentityProvider",
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
					"ApiEndpoint":"http://localhost/CineNet/RoomService",
					"InstanceId":"968a77d3-1350-4cb1-96ec-76eadb893a47",
					"InstanceName":"RoomService",
					"InstanceType":"RoomService",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/Streaming",
					"InstanceId":"c3c29909-3124-48f9-b7bc-93edfb9a8463",
					"InstanceName":"Streaming",
					"InstanceType":"Streaming",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/StreamingEngineCommunicator",
					"InstanceId":"cfe61c63-57dc-49e6-a1c6-916585267971",
					"InstanceName":"StreamingEngineCommunicator",
					"InstanceType":"StreamingEngineCommunicator",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/UserState",
					"InstanceId":"bb25341f-67e3-4b01-85e5-800ef27c16e2",
					"InstanceName":"UserState",
					"InstanceType":"UserState",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/VncConnector",
					"InstanceId":"11a129a8-2e9a-492b-8a48-c14af464a4ae",
					"InstanceName":"VncConnector",
					"InstanceType":"VncConnector",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/WebServerManager",
					"InstanceId":"e891a153-ce57-4603-a40d-70f7d0abf787",
					"InstanceName":"WebServerManager",
					"InstanceType":"WebServerManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/DeviceManager",
					"InstanceId":"fdecd34c-191a-43cf-8865-4e70afa61a9b",
					"InstanceName":"DeviceManager",
					"InstanceType":"DeviceManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/WallAsset",
					"InstanceId":"c3b7e874-b2d1-47e0-9787-700809d4b38e",
					"InstanceName":"WallAsset",
					"InstanceType":"WallAsset",
					"IsPassThrough":false
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/AssetManager",
					"InstanceId":"0b9dbe4e-6e06-4df8-83fe-2041c82be7f0",
					"InstanceName":"AssetManager",
					"InstanceType":"AssetManager",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/DesktopStreamsMonitor",
					"InstanceId":"059875cd-7b0a-433c-8cc4-8b0261ba05ef",
					"InstanceName":"DesktopStreamsMonitor",
					"InstanceType":"DesktopStreamsMonitor",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/Displays",
					"InstanceId":"b15fdba9-a252-486e-9f99-15c8437c8075",
					"InstanceName":"Displays",
					"InstanceType":"Displays",
					"IsPassThrough":true
				},
				{
					"ApiEndpoint":"http://localhost/CineNet/Behaviors",
					"InstanceId":"f4119012-5461-40b7-9175-b76474110d91",
					"InstanceName":"Behaviors",
					"InstanceType":"Behaviors",
					"IsPassThrough":true
				}
			]
			*/
			instances = result;
		});
}


function loadDisplays() {
	getFromNetworkManager('Displays/Display')
		.done(function (result) {

			console.log("Display JSON returned: " + JSON.stringify(result));

			/*
			Example of JSON returned from Get Display call
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

function loadBehaviors() {
	getFromNetworkManager('Behaviors/Behavior')
		.done(function (behaviors) {

			console.log("Behavior JSON returned: " + JSON.stringify(behaviors));

			/*
			Example of JSON returned from Get Behaviors call
			[
				{
					"Actions":[
						{
							"DisplayId":"f3138063-41d9-4e9c-a1cf-3d48ee02c849",
							"ActionId":"6926dfe2-4628-457c-ab6b-b52c20ae4152",
							"ActionType":"Clear",
							"BehaviorId":"39de990a-0769-480a-b8c6-523bc5052b82",
							"ExecutionOrder":1,
							"InstanceId":"4a46dab1-9f2f-48f3-851f-3e8f067481f0",
							"IsValid":true,
							"Name":""
						}
					],
					"BehaviorId":"39de990a-0769-480a-b8c6-523bc5052b82",
					"Description":null,
					"ExecutingStatus":"Stopped",
					"IconUrl":"http://localhost/CineNet/NetworkManager/Icon/Airport_Operations",
					"IsValid":true,
					"Loop":false,
					"LoopDelay":"00:00:30",
					"Name":"CLEAR DISPLAY 1",
					"NumberOfLoops":1
				},
				{
					"Actions":[
						{
							"DisplayId":"f3138063-41d9-4e9c-a1cf-3d48ee02c849",
							"LayoutId":"455c0eeb-46f5-4889-8d13-9cf7a3f40d91",
							"ActionId":"3d8d17b7-4827-4f7d-b317-c537aba30c42",
							"ActionType":"Layout",
							"BehaviorId":"e50bd11d-8989-46f9-a792-efd6ddc2df1a",
							"ExecutionOrder":1,
							"InstanceId":"4a46dab1-9f2f-48f3-851f-3e8f067481f0",
							"IsValid":true,
							"Name":""
						}
					],
					"BehaviorId":"e50bd11d-8989-46f9-a792-efd6ddc2df1a",
					"Description":null,
					"ExecutingStatus":"Stopped",
					"IconUrl":"http://localhost/CineNet/NetworkManager/Icon/Airport_Operations",
					"IsValid":true,
					"Loop":false,
					"LoopDelay":"00:00:30",
					"Name":"APPLY LAYOUT 1",
					"NumberOfLoops":1
				}
			]
			*/

			var row = createContainerStructure('.behaviors');

			var loops = Math.ceil(behaviors.length / 3);
			var currentIndex = 0;

			for (var i = 0; i < loops; i++) {

				if (currentIndex > behaviors.length) {
					break;
				}

				addBehaviorColumnToRow(row, behaviors[currentIndex++]);
				addBehaviorColumnToRow(row, behaviors[currentIndex++]);
				addBehaviorColumnToRow(row, behaviors[currentIndex++]);
			}
		});
}

function addBehaviorColumnToRow(row, behavior) {
	if (!behavior) {
		return;
	}

	addButtonColumnToRow(row, behavior.Name, behavior.BehaviorId, function (behaviorButton) {
		var behaviorId = $(behaviorButton).attr('data-cineNet-id');

		updateToken()
			.done(function () {
				postToNetworkManager('Behaviors/Behavior/' + behaviorId + '/Execute');
			});
	});
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

	/*
		Example of XML returned from Login call

		<?xml version="1.0" encoding="UTF-8"?>
	<Response xmlns="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Destination="CineNet" IssueInstant="2019-08-05T10:36:40.1864638Z" Version="2.0">
			<saml:Issuer>CineNet</saml:Issuer>
		<Status>
		<StatusCode Value="urn:oasis:names:tc:SAML:2.0:status:Success" />
			</Status>
			<saml:Assertion ID="_608a45b8-9553-4952-a17d-743d93498485" IssueInstant="2019-08-05T10:36:40.1864638Z" Version="2.0">
			<saml:Conditions NotBefore="2019-08-05T10:36:40.1864638Z" NotOnOrAfter="2019-08-05T10:51:40.1864638Z">
			<saml:AudienceRestriction>
		<saml:Audience>CineNet</saml:Audience>
		</saml:AudienceRestriction>
		</saml:Conditions>
		<saml:Issuer>CineNet</saml:Issuer>
		<saml:AuthnStatement AuthnInstant="2019-08-05T10:36:40.1864638Z" SessionIndex="_608a45b8-9553-4952-a17d-743d93498485">
			<saml:AuthnContext>
		<saml:AuthnContextClassRef>urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified</saml:AuthnContextClassRef>
		</saml:AuthnContext>
		</saml:AuthnStatement>
		<saml:AttributeStatement />
		<saml:Subject>
		<saml:NameID Format="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified">admin</saml:NameID>
			<saml:SubjectConfirmation Method="urn:oasis:names:tc:SAML:2.0:cm:bearer">
			<saml:SubjectConfirmationData NotOnOrAfter="2019-08-05T10:51:40.1864638Z" Recipient="CineNet" />
			</saml:SubjectConfirmation>
			</saml:Subject>
			</saml:Assertion>
			<Signature xmlns="http://www.w3.org/2000/09/xmldsig#">
			<SignedInfo>
			<CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
			<SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1" />
			<Reference URI="#_608a45b8-9553-4952-a17d-743d93498485">
			<Transforms>
			<Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />
			<Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#" />
			</Transforms>
			<DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />
		<DigestValue>qitIJkaPta7NanT4dE5mR8tK84/fycb3eAp83tYe44k=</DigestValue>
		</Reference>
		</SignedInfo>
		<SignatureValue>Ol3N9eU4ZLmT426jnPgrzkprBfuOWzvZXuOYVxsjvW0zzqmclUGeKP5ioCnoSV2WPitSz6XC5bP1BN+xeVuwN8aRSNmPCNi85G/M/hlFn7LTM+P5dujUF47RfnZQ6tBlBGEKEV1QKQfqD18gKr8tx/7jfW8JYFeikoTmafZicd3d4d31O9ynrafYfka6y0I3sdrCx8M1zrsqLDGSuSH49eZPvjsdzSFQU2BuN/TEQJ9RFIojhBRP5DZ3O7D6PNx5XYKYpD53G9nDnHLiRanrL9EqWvr3y6xFZwPNPX9JHv8nlhtcUgG0Yig5hvcj0sy5jP9l6NEui7aEPPUt92N0pw==</SignatureValue>
		</Signature>
		</Response>
	*/
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

/*
	Example of JSON returned from Get Token call

	{
		"access_token":"NPTyS1Jged1VaGyuDnNdJMzEkGb1k1364HVzTYCCcRug-xgiWM1LyB4AO0_8te54Bbg0ue0nJ7jwoyF2X6unvofFs_w7uOXWU_jztvRhlQGbZps5l8Y3seQGiRdVoh510EB0cUX_63ts7x6SaIQRpUgnUKd4wTLh13SiPnu0NHbJbfZNc_21SE0KT37gaCimPEhjaq-OccX0U91OmX6gxKYNu8dX0ak2JWt6AAtAjcQf5y3AbRlAiMT3PKT3CXDcJVA6qJqelLqzSMPFW1Hx3xcBDN9YCRxVsFZfyIHmFa8MhgMgudIYtHdJsYUA39-sXAV95qUTioY7z-98_zS7lFnkMQgOC4W4-OYogZkBks4PKytAykC9pjBQuyZJ4RB9",
		"token_type":"bearer",
		"expires_in":599,
		"refresh_token":"bf89bf8c-ccc0-43c6-8408-37c32e2e9582",
		"userName":"admin",
		".issued":"Mon, 05 Aug 2019 10:36:40 GMT",
		".expires":"Mon, 05 Aug 2019 10:46:40 GMT"
	}
*/

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

/*
	Example of JSON returned from Update Token call

	{
		"access_token":"B3_zSuMpw-AW4jnLKHohgFda3NbNDdvFwwhKlaenGeWVVov7j7mQwhGjtBMiSzEiwKyiZvSN-HLY_0M3iFHmkZUJDWFLMasdlj9F704V04S7CWbr8CzEj_L1f3kBbuF6izjOo9g5olgJxnTmFoXAVssvOYaMPquBDT3MZVnnStDOqxKd1SZcd66JVhn4Jgyy6z5bvwf_ipfve5ArKFc6eUhq3zzWapEYX-AqFIhgDMO3Ywv-33J0C8jHT4h5vBDSMdJnW3wDWUAbpet2yNu2Fwu9nxMW0dHIsq7hLLxCmBo69z0FRktDxxEUrvOmXzrjPDoaO90Kl_KLvYonI-NQiADfMy_LyD911qZAENYS_cWMgBuDC3i9hdDKaVbON5b8",
		"token_type":"bearer",
		"expires_in":599,
		"refresh_token":"b1aa4e9c-dbaf-471a-885e-8bd7de544e35",
		"userName":"admin",
		".issued":"Mon, 05 Aug 2019 10:43:55 GMT",
		".expires":"Mon, 05 Aug 2019 10:53:55 GMT"
	}
*/

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

function deleteToNetworkManager(endingUrl) {
	console.log("DELETE: " + networkManagerUrl + endingUrl);

	return $.ajax({
		type: "DELETE",
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
	getFromNetworkManager('Displays/Display/' + currentDisplayId + '/Layout')
		.done(function (layouts) {

			console.log("Layouts JSON returned: " + JSON.stringify(layouts));

/*
			Example of JSON returned from Get Layouts call

			[
				{
					"DisplayId":"f3138063-41d9-4e9c-a1cf-3d48ee02c849",
					"LayoutId":"455c0eeb-46f5-4889-8d13-9cf7a3f40d91",
					"LayoutItems":[
						{
							"Asset":{
								"BackgroundColor":"black",
								"DateFontColor":"red",
								"IsTimer":false,
								"LocationFontColor":"red",
								"Show24HourTime":false,
								"ShowDate":false,
								"ShowLocation":true,
								"ShowSeconds":false,
								"TimeFontColor":"red",
								"TimerDuration":"0",
								"TimeZoneId":"Dateline Standard Time",
								"AssetId":"32a89324-c388-4a67-b8f8-a1ba9296c0ec",
								"AssetType":"Clock",
								"Name":"CLOCK1"
							},
							"Cropping":null,
							"Dimension":{
								"Height":1080,
								"Width":1920,
								"X":0,
								"Y":0
							},
							"Opacity":100,
							"Rotation":0,
							"ZOrder":1
						}
					],
					"Name":"Layout 1"
				}
			]
*/

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
				deleteToNetworkManager('Displays/Display/' + currentDisplayId + '/Window/CloseAll');
			});
	});
}

function loadWallInfo() {

	var wallInstance = instances.filter(i => i.InstanceType === "VideoWall")[0];

	getFromNetworkManager('Instance/' + wallInstance.InstanceId + '/Wall')
		.done(function (wallInfo) {

			console.log("Wall info JSON returned: " + JSON.stringify(wallInfo));

/*
			Example of JSON returned from Get Wall call

			{
				"HorizontalPanels":1,
				"HorizontalResolution":1920,
				"InputSystemType":2,
				"MachineId":"d15bc245-2322-4abd-bdaf-760318ba71c7",
				"OutputSystemType":3,
				"VerticalPanels":1,
				"VerticalResolution":1080,
				"VideoWallId":1
			}
*/

			var wallInfoElement = document.getElementsByClassName("wallInfo")[0];

			wallInfoElement.innerHTML = "Dimensions (H x V): " + wallInfo.HorizontalResolution + " x " + wallInfo.VerticalResolution
				+ "<br />" + "Horizontal Panels: " + wallInfo.HorizontalPanels
				+ "<br />" + "Vertical Panels: " + wallInfo.VerticalPanels;
		});
}

function loadActions() {
	var row = createContainerStructure('.actions');

	addCreateIpStreamButton(row);

	var wallInstance = instances.filter(i => i.InstanceType === "VideoWall")[0];

	getFromNetworkManager('AssetManager/Clock/TimeZone')
		.done(function (timezones) {

			console.log("Timezones JSON returned: " + JSON.stringify(timezones));

/*
			Example of JSON returned from Get Timezones call

				[
					{
						"Id":"Dateline Standard Time",
						"DisplayName":"(UTC-12:00) International Date Line West",
						"StandardName":"Dateline Standard Time",
						"DaylightName":"Dateline Daylight Time",
						"BaseUtcOffset":"-12:00:00",
						"AdjustmentRules":null,
						"SupportsDaylightSavingTime":false
					},
					{
						"Id":"UTC-11",
						"DisplayName":"(UTC-11:00) Coordinated Universal Time-11",
						"StandardName":"UTC-11",
						"DaylightName":"UTC-11",
						"BaseUtcOffset":"-11:00:00",
						"AdjustmentRules":null,
						"SupportsDaylightSavingTime":false
					}
				]
*/

			var selectedTimezone = timezones[getRandomNumber(10)];

			addCreateClockButton(row, selectedTimezone, wallInstance);
		});

	addGetWindowInfoButton(row);

	addCloseWindowButton(row);

	addUpdateWindowButton(row);

	addUpdateAvailableAssetsButton(row);
}

function addUpdateAvailableAssetsButton(row) {
	addButtonColumnToRow(row, 'Update Available Assets', null, function () {
		updateToken()
			.done(function () {
				loadAssets();
			});
	});
}

function addUpdateWindowButton(row) {
	let originalWindowDimensions = {};
	addButtonColumnToRow(row, 'Update Window', null, function () {
		updateToken()
			.done(function () {
				getFromNetworkManager('Displays/Display/' + currentDisplayId + '/Window')
					.done(function (windowInfo) {

						console.log("Window info JSON returned: " + JSON.stringify(windowInfo));

/*
						Example of JSON returned from Get Window call

						{
							 "DisplayId":"f3138063-41d9-4e9c-a1cf-3d48ee02c849",
							 "Windows":[
									{
										 "Asset":{
												"BackgroundColor":"black",
												"DateFontColor":"red",
												"IsTimer":false,
												"LocationFontColor":"red",
												"Show24HourTime":false,
												"ShowDate":false,
												"ShowLocation":true,
												"ShowSeconds":false,
												"TimeFontColor":"red",
												"TimerDuration":"0",
												"TimeZoneId":"Dateline Standard Time",
												"AssetId":"32a89324-c388-4a67-b8f8-a1ba9296c0ec",
												"AssetType":"Clock",
												"Name":"CLOCK1"
										 },
										 "ContentWindow":{
												"BackgroundColor":"black",
												"ClockName":"CLOCK1",
												"DateColor":"red",
												"Show24HourTime":false,
												"ShowDate":false,
												"ShowSeconds":false,
												"TextColor":"red",
												"TimeColor":"red",
												"TimeZone":"Dateline Standard Time",
												"WindowType":"Clock",
												"CanvasDimension":{
													 "Height":1080,
													 "Width":1920,
													 "X":0,
													 "Y":0
												},
												"ClosingTransition":"FadeOut",
												"Dimensions":{
													 "Height":1080,
													 "Width":1920,
													 "X":0,
													 "Y":0
												},
												"Handle":10014,
												"Hidden":false,
												"Opacity":100,
												"OpeningTransition":"FadeIn",
												"Rotation":0,
												"WindowId":"0688977c-3457-4581-9b98-3255d047943d",
												"ZOrder":1
										 },
										 "DisplayId":"f3138063-41d9-4e9c-a1cf-3d48ee02c849",
										 "WindowType":"Clock"
									}
							 ]
						}
*/

						originalWindowDimensions = windowInfo.Windows[0].ContentWindow.Dimensions;

						deleteToNetworkManager('Displays/Display/' + currentDisplayId + '/Window/' + windowInfo.Windows[0].ContentWindow.WindowId);

						getFromNetworkManager('AssetManager/Asset')
							.done(function (assets) {

								var request = {
									AssetId: assets[0].AssetId,
									Dimension: originalWindowDimensions,
									Rotation: 0,
									Opacity: 100
								};

								postToNetworkManager('Displays/Display/' + currentDisplayId + '/Window', request);
							})
					});
			});
	});
}

function addCloseWindowButton(row) {
	addButtonColumnToRow(row, 'Close Window', null, function () {
		updateToken()
			.done(function () {
				getFromNetworkManager('Displays/Display/' + currentDisplayId + '/Window')
					.done(function (windowInfo) {
						console.log("Window info JSON returned: " + JSON.stringify(windowInfo));

						deleteToNetworkManager('Displays/Display/' + currentDisplayId + '/Window/' + windowInfo.Windows[0].ContentWindow.WindowId);
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

				postToNetworkManager('AssetManager/Clock', request);
			});
	});
}

function addGetWindowInfoButton(row) {
	addButtonColumnToRow(row, 'Get Info for Windows', null, function () {
		updateToken()
			.done(function () {
				getFromNetworkManager('Displays/Display/' + currentDisplayId + '/Window')
					.done(function (windowInfo) {
						console.log("Window info JSON returned: " + JSON.stringify(windowInfo));

						var windowInfoElement = document.getElementsByClassName("windowInfo")[0];

						windowInfoElement.innerHTML = "";

						for (var i = 0; i < windowInfo.Windows.length; i++) {

							windowInfoElement.innerHTML += "AssetName: " + windowInfo.Windows[i].Asset.Name + "<br />" +
								"Height: " + windowInfo.Windows[i].ContentWindow.Dimensions.Height + "<br />" +
								"Width: " + windowInfo.Windows[i].ContentWindow.Dimensions.Width + "<br />" +
								"X: " + windowInfo.Windows[i].ContentWindow.Dimensions.X + "<br />" +
								"Y: " + windowInfo.Windows[i].ContentWindow.Dimensions.Y + "<br />" +
								"WindowType: " + windowInfo.Windows[i].WindowType + "<br />" + "<hr>";
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

/*
			Example of JSON return from Get Assets call

			[
				{
					"EncoderType":"HD",
					"InstanceId":"813c4a5e-1af4-49b8-9b16-e19b6eeb6ed7",
					"IpAddress":"rtsp://10.111.9.888:8554/",
					"UnitId":"CB99774",
					"AssetId":"6284c7f2-0d6e-440f-8916-5b50b7a6bbd5",
					"AssetType":"CineLinkStream",
					"Name":"CB99774"
				},
				{
					"EncoderType":"UHD",
					"InstanceId":"813c4a5e-1af4-49b8-9b16-e19b6eeb6ed7",
					"IpAddress":"rtsp://10.111.9.999:3049/S4",
					"UnitId":"A550022",
					"AssetId":"008a216e-7891-4d29-a902-0bf523166021",
					"AssetType":"CineLinkStream",
					"Name":"RTSP, on port 15018"
				},
				{
					"BackgroundColor":"Red",
					"DateFontColor":"Black",
					"IsTimer":false,
					"LocationFontColor":"DarkBlue",
					"Show24HourTime":true,
					"ShowDate":true,
					"ShowLocation":true,
					"ShowSeconds":true,
					"TimeFontColor":"Yellow",
					"TimerDuration":"0",
					"TimeZoneId":"UTC-11",
					"AssetId":"90c11917-87b3-463e-a2a2-51830e8699c1",
					"AssetType":"Clock",
					"Name":"Test Clock Asset 5"
				},
				{
					"IpAddress":"rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
					"AssetId":"c0894ab9-0254-4c9d-9972-a2ca705db65a",
					"AssetType":"IpStream",
					"Name":"Buck Bunny"
				}
			]
*/

			var row = createContainerStructure('.assets');

			var loops = Math.ceil(assets.length / 3);
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
		createWindow(asset);
	});
}

function createWindow(asset) {
	updateToken()
		.done(function () {

			var dimensionsForWindow = {
				Height: 500,
				Width: 500,
				X: 0,
				Y: 0
			}

			var request = {
				AssetId: asset.AssetId,
				Dimension: dimensionsForWindow,
				Rotation: 0,
				Opacity: 100
			};

			postToNetworkManager('Displays/Display/' + currentDisplayId + '/Window', request);

/*
			Example of JSON returned from Create Window call

			{
				"Asset":{
				"IpAddress":"rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
					"AssetId":"c0894ab9-0254-4c9d-9972-a2ca705db65a",
					"AssetType":"IpStream",
					"Name":"Buck Bunny"
			},
				"ContentWindow":{
				"StreamAddress":"rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
					"WindowType":"IpStream",
					"CanvasDimension":{
					"Height":1080,
						"Width":1920,
						"X":0,
						"Y":0
				},
				"ClosingTransition":"FadeOut",
					"Dimensions":{
					"Height":500,
						"Width":500,
						"X":0,
						"Y":0
				},
				"Handle":10029,
					"Hidden":false,
					"Opacity":100,
					"OpeningTransition":"FadeIn",
					"Rotation":0.0,
					"WindowId":"2929b47f-833e-41ee-a761-fad5772f7a41",
					"ZOrder":0
			},
				"DisplayId":"4c5a57ab-9c55-438e-b25b-3180fbb7f245",
				"WindowType":"IpStream"
			}
*/

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