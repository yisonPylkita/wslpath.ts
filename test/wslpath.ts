import { expect } from 'chai';
import { uriWslToWindows, uriWindowsToWsl } from '../src';
import * as child_process from 'child_process';

// TOOD: check if Windows with WSL and WSLPATH_NATIVE_APP can be executed

const WSLPATH_NATIVE_APP = "wslpath";

function pathWslToWindowsNative(pathWsl: string): string {
    return child_process.execFileSync(WSLPATH_NATIVE_APP, ['-w', pathWsl]).toString().trim();
}

function pathWindowsToWslNative(pathWsl: string): string {
    return child_process.execFileSync(WSLPATH_NATIVE_APP, ['-u', pathWsl]).toString().trim();
}

describe('Translate URIs from WSL to Windows', () => {
    it('Should give a valid path', () => {
        // expect(runUnitTestWslToWindows("")).equal(true);
        expect(uriWslToWindows("/mnt/c")).equal(pathWslToWindowsNative("/mnt/c"));
        expect(uriWslToWindows("/mnt/d")).equal(pathWslToWindowsNative("/mnt/d"));
        expect(uriWslToWindows("/mnt/c/Users/arlen/pj/kudu")).equal(pathWslToWindowsNative("/mnt/c/Users/arlen/pj/kudu"));
    });
});

describe('Translate URIs from Windows to WSL', () => {
    it('Should give a valid path', () => {
        // expect(uriWindowsToWsl("C:\\")).equal(pathWindowsToWslNative("/mnt/c"));
    });
});
