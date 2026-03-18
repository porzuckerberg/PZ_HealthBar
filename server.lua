local hunger = {}
local thirst = {}
local air = {}

RegisterServerEvent('hud:getStatus')
AddEventHandler('hud:getStatus', function()
    local playerId = source
    TriggerClientEvent('hud:updateStatus', playerId, hunger[playerId] or 0, thirst[playerId] or 0, air[playerId] or 100)
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(60000)
        
        for _, playerId in ipairs(GetPlayers()) do
            hunger[playerId] = math.random(0, 100)
            thirst[playerId] = math.random(0, 100)
            air[playerId] = math.random(0, 100)
        end
    end
end)

RegisterCommand("testui", function(source)
    TriggerClientEvent("PZ_Health:showUI", source, {
        isUpdate = true,
        health = 90,
        armour = 50,
        hunger = 0.8,
        thirst = 0.7,
        stamina = 80,
        air = 7,
        playerId = source
    })
end)

RegisterCommand("testslide", function(source, args, rawCommand)
    TriggerClientEvent("PZ_Health:updateSlide", source, true)
end)

