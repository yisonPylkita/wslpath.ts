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
        expect(uriWslToWindows("/home/arlen/.cargo/registry/src/github.com-1ecc6299db9ec823/rand-0.6.5/src/lib.rs")).equal(pathWslToWindowsNative("/home/arlen/.cargo/registry/src/github.com-1ecc6299db9ec823/rand-0.6.5/src/lib.rs"));
    });
});

describe('Translate URIs from Windows to WSL', () => {
    it('Should give a valid path', () => {
        expect(uriWindowsToWsl("C:\\")).equal(pathWindowsToWslNative("C:\\"));
        expect(uriWindowsToWsl("D:\\")).equal(pathWindowsToWslNative("D:\\"));
        expect(uriWindowsToWsl("C:\\file.txt")).equal(pathWindowsToWslNative("C:\\file.txt"));
        expect(uriWindowsToWsl("C:\\directory")).equal(pathWindowsToWslNative("C:\\directory"));
        expect(uriWindowsToWsl("C:\\directory\\")).equal(pathWindowsToWslNative("C:\\directory\\"));
        expect(uriWindowsToWsl("C:\\Users\\arlen\\pj\\kudu")).equal(pathWindowsToWslNative("C:\\Users\\arlen\\pj\\kudu"));
        expect(uriWindowsToWsl("C:\\Right & Left\\stuff")).equal(pathWindowsToWslNative("C:\\Right & Left\\stuff"));
    });
});
