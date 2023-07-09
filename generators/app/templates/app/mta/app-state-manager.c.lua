

local dispatch = function (browserInstance, path, value)
    executeBrowserJavascript(browserInstance,
        "window.dispatch({type:'CHANGE_STATE', path:'" .. path .. "',value:" .. value .. "})")
end 

AppStateManager = {
    dispatch = dispatch
}