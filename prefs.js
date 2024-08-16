'use strict';
import Gtk from 'gi://Gtk';
import {ExtensionPreferences} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import * as DeviceList from './lib/deviceList.js';
import {General} from './preferences/general.js';
import {Apple} from './preferences/apple.js';
import {Dell} from './preferences/dell.js';
import {Framework} from './preferences/framework.js';
import {Thinkpad} from './preferences/thinkpad.js';
import {ThresholdPrimary} from './preferences/thresholdPrimary.js';
import {ThresholdSecondary} from './preferences/thresholdSecondary.js';
import {About} from './preferences/about.js';

export default class BatteryHealthChargingPrefs extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        let currentDevice = null;
        const settings = this.getSettings();
        const type = settings.get_int('device-type');
        if (type !== 0) {
            const device = new DeviceList.deviceArray[type - 1](settings);
            if (device.type === type)
                currentDevice = device;
        }

        const iconTheme = Gtk.IconTheme.get_for_display(window.get_display());
        const iconsDirectory = this.dir.get_child('icons').get_path();
        iconTheme.add_search_path(iconsDirectory);

        window.set_default_size(650, 700);
        window.add(new General(settings, currentDevice, this.dir));
        if (currentDevice) {
            if (currentDevice.deviceHaveVariableThreshold) // Laptop has customizable threshold
                window.add(new ThresholdPrimary(settings, currentDevice));
            if (currentDevice.deviceHaveDualBattery) // Laptop has dual battery
                window.add(new ThresholdSecondary(settings, currentDevice));
            if (currentDevice.type === 16) // device.type 16 is AppleIntel
                window.add(new Apple(settings));
            if ((currentDevice.type === 22) && settings.get_boolean('detected-cctk')) // device.type 22 is Dell
                window.add(new Dell(settings));
            if (currentDevice.type === 31 && settings.get_boolean('detected-framework-sysfs') && settings.get_boolean('detected-framework-tool')) // device.type 31 is Framework
                window.add(new Framework(settings));
            if (currentDevice.type === 20 || currentDevice.type === 21) // device.type 20|21 is Thinkpad
                window.add(new Thinkpad(settings));
        }
        window.add(new About(this));
    }
}
