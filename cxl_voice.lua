local voiceRange = 1
local ranges = {
    [1] = 2.0,
    [2] = 8.0,
    [3] = 15.0
}

local currentRange = ranges[voiceRange]

local pulseThread = nil
local pulseRunning = false
local pulseStop = false

local function GetColorByRange(range)
    if range <= 2.0 then
        return 0, 255, 0, 150 -- เขียว
    elseif range <= 8.0 then
        return 0, 0, 255, 150 -- เหลือง
    else
        return 255, 0, 0, 150 -- แดง
    end
end

-- ฟังก์ชันเล่น pulse แบบขยายวงกลม
function PlayPulse(maxRadius)
    pulseRunning = true
    pulseStop = false

    local playerPed = PlayerPedId()
    local radius = 0.0
    local speed =  0.05

    while radius < maxRadius do
        Wait(0)
        if pulseStop then break end

        local coords = GetEntityCoords(playerPed)
        radius = radius + speed
        local r,g,b,a = GetColorByRange(maxRadius)
        
        DrawMarker(1, coords.x, coords.y, coords.z - 0, 0, 0, 0, 0, 0, 0,
                   radius * 2.0, radius * 2.0, 0.2,
                   r, g, b, a, false, false, 2, nil, nil, false)
    end

    pulseRunning = false
    pulseStop = false
end

-- คำสั่งเปลี่ยน voice range
RegisterCommand('changevoice', function()
    voiceRange = voiceRange + 1
    if voiceRange > #ranges then voiceRange = 1 end

    local newRange = ranges[voiceRange]
    MumbleSetTalkerProximity(newRange)

    local data_voiceMessage = { 
        type = 'updateMic',
        Vs = voiceRange
    }
    SendNuiMessage(json.encode(data_voiceMessage))

    -- ถ้า pulse กำลังวิ่ง ให้สั่งหยุดก่อน
    if pulseRunning then
        pulseStop = true
        -- รอให้ pulse thread หยุดจริง
        while pulseRunning do
            Wait(10)
        end
    end

    -- เริ่ม pulse ใหม่ทันทีใน thread ใหม่
    pulseThread = CreateThread(function()
        PlayPulse(newRange)
    end)
end, false)

RegisterKeyMapping("changevoice", "Change Voice Range", "keyboard", "Z")

CreateThread(function()
    Wait(1000)
    MumbleSetTalkerProximity(currentRange)
end)
