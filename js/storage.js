angular.module('storage', []).factory('Storage', function()
{
    if (typeof(Storage) !== "undefined")
    {
        return localStorage;
    }
    else
    {
        console.info('localStorage not available');
        return {};
    }
});