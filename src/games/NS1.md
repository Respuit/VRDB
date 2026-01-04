---
id: NS1
title: "DCS World Standalone"
windows: "true"
mac: "false"
linux: false
positive: 0
negative: 0
estimated_owners: "0 - 0"
peak_ccu: 0

image: https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/223750/header.jpg?t=1721725925
opinions:

    - steamVR: 0
      monado: 1
      alvr: 0
      wivrn: 0
      GPUVendor: AMD
      distro: Standalone Via Lutris
      device: Hp Reverb G2 V2
      text: |
          as far as VR goes it works as well as any other OpenXR application in VR, but getting it running is a different story 
          Here i have a guide on How to get DCS Standalone to Run on linux https://github.com/budderpard/DCS_Standalone_on_linux
      date: 2025-02-24
      user: budderpard

    - steamVR: 0
      monado: 0
      alvr: 0
      wivrn: 2
      GPUVendor: AMD
      distro: Arch Linux
      device: Quest 2
      text: |
          Once it's set up, VR works smoothly for me.
          However, getting it to work in the first place is some ordeal.
          I followed this guide: https://forum.dcs.world/topic/381137-howto-standalone-dcs-in-vr-under-linux-with-lutris/
          however, this guide is for monado and *does not* work with WiVRn. My process now deviates from the guide after Step 8.
          Follow the above guide until Step 8. Then, import the game executable (found in the wineprefix set up by Lutris) into Steam as a non-Steam VR game. Set the compatibility tool to Proton Experimental and launch the game once. (It will not work - but the protonprefix will be created.)
          Use protontricks to install `d3dcompiler_47` and `xact` components, as well as `corefonts` fonts, into the game's new proton prefix.
          Then set the Steam launch options to:
          `PRESSURE_VESSEL_IMPORT_OPENXR_1_RUNTIMES=1 WineDLLOVERRIDES="wbemprox=n" %command% --no-launcher --force_OpenXR --force_enable_VR`
          Now the game should launch from Steam as a VR title.
      date: 2025-12-30
      user: HappyTetrahedron
---
