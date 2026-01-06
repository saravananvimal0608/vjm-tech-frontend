import parseJwt from './getAdmin';

const isTokenExpired = (token) => {
    if (!token) return true;

    const decoded = parseJwt(token);
    if (!decoded?.exp) return true;

    const currentTime = Date.now();        
    const expiryTime = decoded.exp * 1000; 

    return currentTime > expiryTime;
};

export default isTokenExpired;
