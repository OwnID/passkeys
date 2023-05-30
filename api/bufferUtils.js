function uintToString(a) {
    const base64string = btoa(String.fromCharCode(...a));
    return base64string.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64ToUint8Array(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
    return new Uint8Array(Array.prototype.map.call(atob(str), (c) => c.charCodeAt(0)));
}

function getSavedAuthenticatorData(user) {
    return {
        credentialID: base64ToUint8Array(user.credentialID),
        credentialPublicKey: base64ToUint8Array(user.credentialPublicKey),
        counter: user.counter,
    }
}

function getRegistrationInfo(registrationInfo) {
    const {credentialPublicKey, counter, credentialID} = registrationInfo;
    return {
        credentialID: uintToString(credentialID),
        credentialPublicKey: uintToString(credentialPublicKey),
        counter,
    }
}

module.exports = {getSavedAuthenticatorData,getRegistrationInfo}