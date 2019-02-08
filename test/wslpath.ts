import { expect } from 'chai';
import { uriWslToWindows, uriWindowsToWsl } from '../src';

describe('Translate URIs from WSL to Windows', () => {
    it('Should give a valid path', () => {
        expect(uriWslToWindows("")).to.equal("");
    });
});

describe('Translate URIs from Windows to WSL', () => {
    it('Should give a valid path', () => {
        expect(uriWindowsToWsl("")).to.equal("");
    });
});
