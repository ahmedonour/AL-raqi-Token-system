package com.ruh.app;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Base64;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import woyou.aidlservice.jiuiv5.IWoyouService;

@CapacitorPlugin(name = "SunmiPrinter")
public class SunmiPrinterPlugin extends Plugin {
    private static final String TAG = "SunmiPrinter";
    private IWoyouService woyouService;
    private boolean isServiceBound = false;

    private ServiceConnection connService = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            woyouService = IWoyouService.Stub.asInterface(service);
            isServiceBound = true;
            Log.d(TAG, "Printer service connected");
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            woyouService = null;
            isServiceBound = false;
            Log.d(TAG, "Printer service disconnected");
        }
    };

    @Override
    public void load() {
        super.load();
        bindPrinterService();
    }

    private void bindPrinterService() {
        Intent intent = new Intent();
        intent.setPackage("woyou.aidlservice.jiuiv5");
        intent.setAction("woyou.aidlservice.jiuiv5.IWoyouService");
        getContext().bindService(intent, connService, Context.BIND_AUTO_CREATE);
    }

    @PluginMethod
    public void printerInit(PluginCall call) {
        if (!checkService(call)) return;
        
        try {
            woyouService.printerInit(null);
            call.resolve();
        } catch (RemoteException e) {
            call.reject("Printer init failed", e);
        }
    }

    @PluginMethod
    public void setAlignment(PluginCall call) {
        if (!checkService(call)) return;
        
        int alignment = call.getInt("alignment", 0);
        try {
            woyouService.setAlignment(alignment, null);
            call.resolve();
        } catch (RemoteException e) {
            call.reject("Set alignment failed", e);
        }
    }

    @PluginMethod
    public void printText(PluginCall call) {
        if (!checkService(call)) return;
        
        String text = call.getString("text", "");
        try {
            woyouService.printText(text, null);
            call.resolve();
        } catch (RemoteException e) {
            call.reject("Print text failed", e);
        }
    }

    @PluginMethod
    public void printTextWithFont(PluginCall call) {
        if (!checkService(call)) return;
        
        String text = call.getString("text", "");
        String typeface = call.getString("typeface", "");
        int fontSize = call.getInt("fontSize", 24);
        
        try {
            woyouService.printTextWithFont(text, typeface, fontSize, null);
            call.resolve();
        } catch (RemoteException e) {
            call.reject("Print text with font failed", e);
        }
    }

    @PluginMethod
    public void lineWrap(PluginCall call) {
        if (!checkService(call)) return;
        
        int lines = call.getInt("lines", 1);
        try {
            woyouService.lineWrap(lines, null);
            call.resolve();
        } catch (RemoteException e) {
            call.reject("Line wrap failed", e);
        }
    }

    @PluginMethod
    public void cutPaper(PluginCall call) {
        if (!checkService(call)) return;
        
        try {
            woyouService.cutPaper(null);
            call.resolve();
        } catch (RemoteException e) {
            call.reject("Cut paper failed", e);
        }
    }

    @PluginMethod
    public void sendRaw(PluginCall call) {
        if (!checkService(call)) return;
        
        String base64Data = call.getString("data", "");
        try {
            byte[] data = Base64.decode(base64Data, Base64.DEFAULT);
            woyouService.sendRAWData(data, null);
            call.resolve();
        } catch (Exception e) {
            call.reject("Send raw data failed", e);
        }
    }

    @PluginMethod
    public void getPrinterStatus(PluginCall call) {
        if (!checkService(call)) return;
        
        try {
            int status = woyouService.updatePrinterState();
            JSObject ret = new JSObject();
            ret.put("status", status);
            call.resolve(ret);
        } catch (RemoteException e) {
            call.reject("Get printer status failed", e);
        }
    }

    @PluginMethod
    public void isAvailable(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("available", isServiceBound && woyouService != null);
        call.resolve(ret);
    }

    private boolean checkService(PluginCall call) {
        if (!isServiceBound || woyouService == null) {
            call.reject("Printer service not bound");
            return false;
        }
        return true;
    }

    @Override
    protected void handleOnDestroy() {
        super.handleOnDestroy();
        if (isServiceBound) {
            getContext().unbindService(connService);
        }
    }
}
