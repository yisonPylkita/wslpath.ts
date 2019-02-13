export function uriWslToWindows(wslUri: string): string {
  let uriSegments = wslUri.split('/');
  if (uriSegments.length < 4 || uriSegments[0].length != 0 || uriSegments[1] != 'mnt') {
    return '';
  }

  let disc_letter = uriSegments[2];
  if (!/^[a-zA-Z]+$/.test(disc_letter)) {
    return '';
  }

  let uriWindows = disc_letter + ':';
  uriSegments.forEach(pathPart => {
    uriWindows += '\\' + pathPart;
  });
  return uriWindows;
}

export function uriWindowsToWsl(windowsUri: string): string {
  let uriSegments = windowsUri.split('\\');
  if (uriSegments.length < 2) {
    return '';
  }

  let disc_letter = uriSegments[0];
  if (!/^[a-zA-Z]+$/.test(disc_letter)) {
    return '';
  }

  let uriWsl = '/mnt/' + disc_letter;
  uriSegments.forEach(pathPart => {
    uriWsl += '/' + pathPart;
  });
  return uriWsl;
}
