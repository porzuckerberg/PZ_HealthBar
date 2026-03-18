# PZ HealthBar UI for FiveM

This is a custom UI designed for FiveM using **HTML**, **CSS**, and **JavaScript**.  

## 🌟 Features

- Grid-based system
- Scroll support when list exceeds height
- Stylish vertical bar (8 slots)
- Fully customizable via CSS
- Responsive layout with smooth hover transitions

## 📦 Installation (FiveM Resource)

1. Put the `pz_healthbar` folder in your `resources/` directory.
2. Add the following to your `server.cfg`:  
   `ensure pz_healthbar`
3. Modify client script to trigger `NUI` open/close if needed.  
   (You can bind it to a key using `RegisterCommand` or `RegisterKeyMapping`.)

## 🛠️ TODO (Optional Enhancements)

- Add drag & drop support between containers
- Hook into ESX/QBCore data
- Show dynamic status icons
- Add metadata (e.g., health percentage, durability)

## 🔗 Credits

- UI: Designed by **PorZuckerberg [PZ]**

## 📄 License

MIT – free to use, modify, and share.
