ESX = exports['es_extended']:getSharedObject()

ESX.RegisterServerCallback("fg_hudv3:getCash", function(source, cb) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local playerCash = xPlayer.getMoney()
    cb(playerCash)
end) 

ESX.RegisterServerCallback("fg_hudv3:getBank", function(source, cb) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local playerBank = xPlayer.getAccount('bank').money
    cb(playerBank)
end) 

ESX.RegisterServerCallback("fg_hudv3:getjoblabel", function(source, cb) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local joblabel = xPlayer.job.label
    cb(joblabel)
end) 

ESX.RegisterServerCallback("fg_hudv3:getjobname", function(source, cb) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local jobname = xPlayer["job"]["name"]
    cb(jobname)
end) 

ESX.RegisterServerCallback("fg_hudv3:getjobgradelabel", function(source, cb) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local jobgradelabel = xPlayer.job.grade_label
    cb(jobgradelabel)
end) 