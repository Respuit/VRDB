---
id: NS2
title: "Minecraft (Vivecraft MOD)"
windows: "true"
mac: "false"
linux: true
positive: 0
negative: 0
estimated_owners: "0 - 0"
peak_ccu: 0

image: https://i0.wp.com/www.vivecraft.org/wp-content/uploads/2016/07/wesYwME.png?w=650&ssl=1
opinions:

    - steamVR: 0
      monado: 0
      alvr: 0
      wivrn: 2
      GPUVendor: AMD
      distro: Fedora 41
      device: Meta Quest 2
      text: |
          Works fine IF you use the following OpenComposite git branch : https://gitlab.com/OrionMoonclaw/OpenOVR/-/tree/priorities t ofix input getting stuck (use Envision to easily switch branch)
          Menus are not scrollable but inventory works
          Xrizer currently has issues with hands
      date: 2025-02-24
      user: Deytron

    - steamVR: 2
      monado: 3
      alvr: 0
      wivrn: 0
      GPUVendor: AMD
      distro: NixOS
      device: Valve Index
      text: |
          SteamVR:
          Works perfectly, but make sure to add `steam-run` as the wrapped command under custom commands if you use Prismlauncher,
          if you use any other launcher, try to find that option in settings if it exists.
          Monado:
          1. Make sure to put whatever layout you want in: .minecraft/openvr/input/
          2. Make every file accept the action_manifest read-only (else vivecraft will overwrite it)
          Then, there are currently some issues with touch vs actually pushing buttons, so try to avoid mapping anything to touch.
          Also, I couldn't ever get the radial menu to work under Monado, so make sure to map anything important in there to a button.
          If building Monado from source, make sure these build parameters are active:
          `XRT_FEATURE_SERVICE = true`
          `XRT_OPENXR_INSTALL_ABSOLUTE_RUNTIME_PATH = true`
          `XRT_HAVE_STEAM = true`
          `CMAKE_EXPORT_COMPILE_COMMANDS = true`
          `XRT_HAVE_SYSTEM_CJSON = true`
      date: 2025-02-24
      user: sbot50

    - steamVR: 0
      monado: 0
      alvr: 1
      wivrn: 2
      GPUVendor: AMD
      distro: CachyOS
      device: Quest 3
      text: |
          works great with the Vivecraft branch on OpenComposite, otherwise there are some input-related issues
      date: 2025-02-24
      user: Kiy0shime
---
