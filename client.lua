RegisterNetEvent("PZ_Health:showUI", function(data)
    SendNuiMessage(json.encode({
        type = "updateStatus",
        isUpdate = data.isUpdate,
        health = data.health,
        armour = data.armour,
        stamina = data.stamina,
        air = data.air,
        playerId = data.playerId,
    }))
end)

RegisterNetEvent("PZ_Health:updateSlide", function(isSlide)
    SendNuiMessage(json.encode({
        type = "updateSlide",
        isSlide = isSlide
    }))
end)


CreateThread(function()
    SetNuiFocus(false, false)
    local msec = 100
    local isTalking = false

    while true do
        local ped = PlayerPedId()

        local playerId = GetPlayerServerId(PlayerId())
        local health = GetEntityHealth(ped) - 100
        local armour = GetPedArmour(ped)
        local stamina = GetPlayerSprintStaminaRemaining(PlayerId())
        local air = GetPlayerUnderwaterTimeRemaining(PlayerId())

        local newisTalking = NetworkIsPlayerTalking(PlayerId())
        if newisTalking ~= isTalking then
            isTalking = newisTalking
            SendNuiMessage(json.encode({
                type = "updateN",
                N = isTalking
            }))
        elseif IsPauseMenuActive() then 
            SendNUIMessage({
                type = "hideUI"
            })
        else 
            SendNUIMessage({
                type = "showUI"
            })
        end
        local dataToSend = {
            type = "updateStatus",
            isUpdate = true,

            playerId = playerId,
            health = math.max(0, math.min(health, 100)),
            armour = math.max(0, math.min(armour, 100)),
            air = air,
            stamina = stamina   
        }
        
        local encoded = json.encode(dataToSend)

        SendNuiMessage(encoded)
        Wait(msec)
    end
end)

