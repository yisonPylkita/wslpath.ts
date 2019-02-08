import { expect } from 'chai';
import { uriWslToWindows, uriWindowsToWsl } from '../src';
import * as child_process from 'child_process';

// TOOD: check if Windows with WSL and WSLPATH_NATIVE_APP can be executed

const WSLPATH_NATIVE_APP = "wslpath";

function pathWslToWindowsNative(pathWsl: string): string {
    child_process.execFileSync(WSLPATH_NATIVE_APP, ['-w', pathWsl]);
    return '';    
}

function pathWindowsToWslNative(pathWsl: string): string {
    child_process.execFileSync(WSLPATH_NATIVE_APP, ['-u', pathWsl]);
    return '';
}

function runUnitTestWslToWindows(path: string): Boolean {
    return uriWslToWindows(path) === pathWslToWindowsNative(path);
}

function runUnitTestWindowsToWsl(path: string): Boolean {
    return uriWindowsToWsl(path) === pathWindowsToWslNative(path);
}

describe('Translate URIs from WSL to Windows', () => {
    it('Should give a valid path', () => {
        expect(runUnitTestWslToWindows("")).equal(true);
    });
});

describe('Translate URIs from Windows to WSL', () => {
    it('Should give a valid path', () => {
        expect(runUnitTestWindowsToWsl("")).equal(true);
    });
});
