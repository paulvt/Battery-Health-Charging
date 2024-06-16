---
layout: default
title: Fujitsu
parent: Device Compatibility
permalink: /device-compatibility/fujitsu
---
<style>
.outer-container {
   display: table;
   width: 100%;
}
.txt-horizantal-align {
   width: 50%;
   display: table-cell;
   text-align: center;
}
</style>

# Fujitsu

## Capability
* 3 presets: Full Capacity Mode, Balance Mode, and Maximum Life Span mode.
* Default threshold values of these 3 preset modes are set at 100%, 80%, and 60%.
* Each preset threshold value can be customized between 100-80 %, 85-65 %, and 85-50 % respectively.

## Dependencies
* No dependencies required.
* The charging threshold for Fujitsu laptops, introduced in kernel 6.9, is supported by mainline Linux kernels starting from version 6.9 and later.

## Testing charging threshold using command-line
For Fujitsu laptops the battery powersupply name could be `CMB0` or `CMB1`. Hence charging threshold path could be one of the following and can be check using `ls` command.<br>
`ls -l /sys/class/power_supply/CMB0/charge_control_end_threshold`<br>
`ls -l /sys/class/power_supply/CMB1/charge_control_end_threshold`<br>

Charging mode can be set by using  `echo` command in `terminal`.
<br>
<br>

**For example:**<br>If the battery power supply name is  `CMB0`, to apply threshold value of `60`, the command would be.

Require root privileges
{: .label .label-yellow .mt-0}
```bash
echo '60' | pkexec tee /sys/class/power_supply/CMB0/charge_control_end_threshold
```
<br>
> Note `sudo` also can be used in place of `pkexec` in the below commands as both `sudo` and `pkexec` can be use to run commands in root mode. To make use of polkit rules, the extension uses `pkexec`.

The current threshold value can also be read using `cat` command in `terminal`. For example, the laptops battery name in power supply sysfs is `BAT0`, command would be.
```bash
cat /sys/class/power_supply/CMB0/charge_control_end_threshold
```
<br>

{: .important-title }
> Condition for applying threshold
>
> * Accepted values for `charge_control_end_threshold` : 1 - 100

If charging threshold are applied successfully using above commands, the extension is compatible.

## Quick Settings
<br>
<img src="../assets/images/device-compatibility/fujitsu/quick-settings.png" width="100%">
<div class="outer-container">
    <span class="txt-horizantal-align"><b>Gnome 43 and above</b></span>
    <span class="txt-horizantal-align"><b>Gnome 42</b></span>
</div>

## Extension Preferences
<br>
<img src="../assets/images/device-compatibility/fujitsu/settings.png" width="100%">



