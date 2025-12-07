Config = {
    text = {
		format = '%s',
	},
	blip = {
		blipText = 'Makierung %s',
		sprite = 8,
		color = 3,
		distToDelete = 100.0, 
		deleteText = 'Strecke entfernt',
		drawRouteText = 'Strecke zu %s',
		notExistText = "Die PLZ gibt es nicht"
	}
}

Config.Framework = 'esxnew' -- Options: 'esxnew' / 'esx'
Config.devmode = true -- true / false
Config.devLangEN = false -- true / false (Funktioniert nur wenn devmode true ist) // (works only when devmode is true)
Config.HudsettingsCommand = 'hudsettings' -- Command für die Verschiebung des HUDs // Command for the position of the HUD
Config.Hudsettingsreset = 'resethudsettings' -- Command für den Reset der Position //  Command for the reset of the HUD position
Config.HudPostalCommand = "plz" -- Command für das PLZ Feature // Command for the Postal feature