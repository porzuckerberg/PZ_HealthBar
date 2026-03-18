fx_version 'cerulean'
game 'gta5'

author 'PZ'
description 'Health Bar UI'
version '0.0.5'

ui_page 'ui/PZ-Health-Bar.html'

files {
    'ui/PZ-Health-Bar.html',
    'ui/PZ_HB_styles.css',
    'ui/PZ_HB_script.js',
    'ui/PrintAble4U.ttf',
    'ui/img/*.png'
}

client_script {'client.lua','cxl_voice.lua'}

server_script 'server.lua'