'use strict';
import Adw from 'gi://Adw';
import Gio from 'gi://Gio';
import GLib from 'gi://GLib';
import GObject from 'gi://GObject';
import {gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

import * as Helper from '../lib/helper.js';
const {execCheck} = Helper;

export const Power = GObject.registerClass({
    GTypeName: 'BHC_Power',
    Template: GLib.Uri.resolve_relative(import.meta.url, '../ui/power.ui', GLib.UriFlags.NONE),
    InternalChildren: [
        'amend_power_indicator',
        'scale_battery_level',    ],
}, class Power extends Adw.PreferencesPage {
    constructor(settings, device) {
        super({});
        settings.bind(
            'amend-power-indicator',
            this._amend_power_indicator,
            'active',
            Gio.SettingsBindFlags.DEFAULT
        );
        if(device.deviceHaveVariableThreshold) {
            settings.bind(
                'scale-battery-level',
                this._scale_battery_level,
                'active',
                Gio.SettingsBindFlags.DEFAULT
            );
        } else {
            this._scale_battery_level.visible = false;
            settings.set_boolean('scale-battery-level', false);
        }
    }        
});
